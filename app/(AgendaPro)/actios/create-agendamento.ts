"use server";

import { prisma } from "@/lib/prisma";
import { CreateAgendamentoSchema } from "../schema/createagendamento";
import { auth } from "@/lib/auth";
import { ca } from "date-fns/locale";
import { AppointmentStatus } from "@/lib/generated/prisma";
import { revalidatePath } from "next/cache";


export async function CreateAgendamentoData(data: CreateAgendamentoSchema){
const session = await auth()
const userId = session?.user?.id


    try{
        const newAgendamento = await prisma.appointment.create({
            data: {
                userId: userId,
                clientName: data.clientName,
                clientPhone: data.clientPhone,
                serviceId: data.serviceId,
                date: new Date(`${data.date}T${data.hour}:00`),
            },
            
        })

        const notify = await prisma.notification.create({
            data: {
                
                title: "Novo agendamento",
                userId,
                message: `Novo agendamento de ${data.clientName} agendou ${newAgendamento.date.toLocaleString(
                    "pt-BR",
                    { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }
                )}`,
                
            }
        })

        

        return{
            data: {newAgendamento, notify},
            error: null,
        }

    }catch(error){
        return{
            data: null,
            error: "Erro ao criar agendamento",
        }
    }
}


export async function getNotifications() {
  const session = await auth()

  if (!session?.user?.id) return []

  return prisma.notification.findMany({
    where: {
      userId: session.user.id,
     
    },
    orderBy: {
      createdAt: "desc",
    },
  
  })
}

export async function markNotificationAsRead(notificationId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Não autorizado" }
  }

  await prisma.notification.update({
    where: {
      id: notificationId,
      userId: session.user.id,
    },
    data: {
      read: true,
    },
  })

  return { success: true }
}


export async function updateAppointmentStatus(
  appointmentId: string,
  status: AppointmentStatus
) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Não autorizado" }
  }

  try {
    // 1️⃣ Atualiza o status do agendamento
    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
    })

    // 2️⃣ Se saiu de AGENDADO → remove SOMENTE a notificação desse agendamento
    if (status !== "AGENDADO") {
      await prisma.notification.deleteMany({
        where: {
          userId: session.user.id,
          title: "Novo agendamento",
          message: {
            contains: `#${appointmentId}`,
          },
        },
      })
    }

    return{
      data: appointment,
      error: null
    }
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error)
    return { error: "Erro ao atualizar status" }
  }
}


export async function deleteAgendamento(agendamentoId: string) {


    try{

        const agendamento = await prisma.appointment.deleteMany({
            where: {
                id: agendamentoId
            }
        })
        return{
            data: agendamento,
            error: null
        }

    }catch(error){
        return{
            data: null,
            error: "Erro ao deletar agendamento",
        }
    }
    
}
