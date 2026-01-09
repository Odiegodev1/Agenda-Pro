"use server"

import { generateTimeSlots } from "@/lib/generateslot"
import { prisma } from "@/lib/prisma"

type GetAvailableHoursProps = {
  userId: string
  date: string // yyyy-mm-dd
  serviceDuration: number // minutos (ex: 30)
}

export async function getAvailableHours({
  userId,
  date,
  serviceDuration,
}: GetAvailableHoursProps) {
  // 1️⃣ Buscar horários de funcionamento do prestador
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      openTime: true,
      closeTime: true,
    },
  })

  if (!user || !user.openTime || !user.closeTime) {
    return {
      hours: [],
      error: "Horário de funcionamento não configurado",
    }
  }

  // 2️⃣ Gerar todos os horários possíveis
  const allSlots = generateTimeSlots(
    user.openTime,
    user.closeTime,
    serviceDuration
  )

  // 3️⃣ Início e fim do dia
  const start = new Date(`${date}T00:00:00`)
  const end = new Date(`${date}T23:59:59`)

  // 4️⃣ Buscar horários já ocupados
  const appointments = await prisma.appointment.findMany({
    where: {
      userId,
      date: {
        gte: start,
        lte: end,
      },
    },
    select: { date: true },
  })

  const busyTimes = appointments.map((a) =>
    a.date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  )

  // 5️⃣ Filtrar horários disponíveis
  const availableHours = allSlots.filter(
    (slot) => !busyTimes.includes(slot)
  )

  return {
    hours: availableHours,
    error: null,
  }
}
