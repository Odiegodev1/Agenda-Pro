"use server"

import { prisma } from "@/lib/prisma"

export async function getAgendaByDate({
  userId,
  date,
}: {
  userId: string
  date: string // yyyy-mm-dd
}) {
  const start = new Date(`${date}T00:00:00`)
  const end = new Date(`${date}T23:59:59`)

  if (isNaN(start.getTime())) {
    return { data: [], error: "Data inválida" }
  }

  const appointments = await prisma.appointment.findMany({

    where: {
      userId,
      

      date: {
        gte: start,
        lte: end,
      },
    },
    include: {
      service: true,
    },
    orderBy: {
      date: "asc",
    },
  })
  console.log(appointments)

  return {
    data: appointments,
    error: null,
  }
}


export async function getAgenda({
  userId,

}: {
  userId: string

}) {




  const appointments = await prisma.appointment.findMany({

    where: {
      userId,
      
      

 
    },
    include: {
      service: true,

    },
    orderBy: {
      date: "asc",
    },
  })
  console.log(appointments)

  return {
    data: appointments,
    error: null,
  }
}


