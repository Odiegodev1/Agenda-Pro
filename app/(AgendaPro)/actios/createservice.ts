"use server"

import { prisma } from "@/lib/prisma";
import { CreateServiceSchema } from "../schema/createservices";
import { auth } from "@/lib/auth";


export async function createService(data: CreateServiceSchema){
const session = await auth()
const userId = session?.user?.id;


    try {

        const createService = await prisma.service.create({
            data: {
                userId: userId,
                name: data.name,
                duration: parseInt(data.duration),
                price: parseFloat(data.price),
            }
        })

        return{
            data: createService,
            error: null
        }

    }catch(error){
        return{
            data: null,
            error: "Erro ao criar serviço"
        }
    }
}

export async function updateService(serviceId: string, data: CreateServiceSchema) {


  try{
    const updateService = await prisma.service.update({
        where: {
            id: serviceId
        },
        data: {
            name: data.name,
            duration: parseInt(data.duration),
            price: parseFloat(data.price),
        }
    })

    return{
        data: updateService,
        error: null
    }

  }catch(error){
    return{
        data: null,
        error: "Erro ao atualizar serviço"
    }
  }
  
}

export async function getServicesByUserId(userId: string){

    try{
        const services = await prisma.service.findMany({
            where: {
                userId: userId
            },
            include: {
                user: true,
            }
        })
        return({
            data: services,
            error: null
        })

    }catch(error){
        return{
            data: null,
            error: "Erro ao buscar serviços"
        }
    }
}


export async function deleteService(serviceId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: "Não autorizado" }
  }

  try {

    const agendadelete = await prisma.appointment.deleteMany({
      where:{
        serviceId,
        status: {
          in: ["AGENDADO", "FALTOU", "CANCELADO"]
        }
      }
    })
    // 1️⃣ Busca o serviço com os agendamentos
    const service = await prisma.service.findFirst({
      where: {
        id: serviceId,
        userId: session.user.id,
      },
      include: {
        appointments: {
          select: {
            status: true,
          },
        },
      },
    })

    if (!service) {
      return { error: "Serviço não encontrado" }
    }

    // 2️⃣ Verifica se existe algum AGENDADO
    const hasActiveAppointments = service.appointments.some(
      (appt) => appt.status === "AGENDADO"
    )

    if (hasActiveAppointments) {
      return {
        error:
          "Não é possível excluir o serviço enquanto houver agendamentos pendentes",
      }
    }

    // 3️⃣ Pode excluir (todos já finalizados ou cancelados)
    await prisma.service.delete({
      where: { id: serviceId },
    })

    return { success: true }
  } catch (error) {
    console.error("DELETE SERVICE ERROR:", error)
    return { error: "Erro ao excluir serviço" }
  }
}