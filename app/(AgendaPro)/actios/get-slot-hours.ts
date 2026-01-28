"use server"

import { generateTimeSlots } from "@/lib/generateslot"
import { prisma } from "@/lib/prisma"

type GetAvailableHoursProps = {
  userId: string
  date: string // yyyy-mm-dd
  serviceDuration: number
}

export async function getAvailableHours({
  userId,
  date,
  serviceDuration,
}: GetAvailableHoursProps) {
  // 1️⃣ Horário de funcionamento
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      openTime: true,
      closeTime: true,
    },
  })

  if (!user?.openTime || !user?.closeTime) {
    return { hours: [], error: "Horário não configurado" }
  }

  // 2️⃣ Gera todos os horários possíveis
  const allSlots = generateTimeSlots(
    user.openTime,
    user.closeTime,
    serviceDuration
  )

  // 3️⃣ Início e fim do dia
  const startOfDay = new Date(`${date}T00:00:00`)
  const endOfDay = new Date(`${date}T23:59:59`)

  // 4️⃣ Busca agendamentos ATIVOS + duração
  const appointments = await prisma.appointment.findMany({
    where: {
      userId,
      status: "AGENDADO",
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      service: {
        select: { duration: true },
      },
    },
  })

  // 5️⃣ Monta intervalos ocupados
  const busySlots = appointments.map((appt) => {
    const start = new Date(appt.date)
    const end = new Date(
      start.getTime() + appt.service.duration * 60000
    )

    return { start, end }
  })

  // 6️⃣ Filtra slots válidos (SEM SOBREPOSIÇÃO)
  const availableHours = allSlots.filter((slot) => {
    const [h, m] = slot.split(":").map(Number)

    const slotStart = new Date(
      startOfDay.getFullYear(),
      startOfDay.getMonth(),
      startOfDay.getDate(),
      h,
      m
    )

    const slotEnd = new Date(
      slotStart.getTime() + serviceDuration * 60000
    )

    return !busySlots.some(
      (busy) =>
        slotStart < busy.end && slotEnd > busy.start
    )
  })

  return {
    hours: availableHours,
    error: null,
  }
}
