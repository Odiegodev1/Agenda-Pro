"use client"

import { useEffect, useState } from "react"
import { Eye, X } from "lucide-react"
import { CalendarAgendamento } from "./calendarAgendamento"
import { getAgendaByDate } from "@/app/(AgendaPro)/actios/get-agendamento"
import { SelectStatus } from "./DialogStatus"
import { Button } from "./ui/button"
import { AppointmentStatusBadge } from "./agendamentostatus"
import { AppointmentStatus } from "@/lib/generated/prisma"
import {  DeleteButton } from "./DeleteAgendamento"

type Appointment = {
  id: string
  date: Date
  clientName: string
  clientPhone: string
  status: AppointmentStatus
  service: {
    name: string
  }
}

export function Agendamento({ userId }: { userId: string }) {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)

  function removeAppointmentLocal(appointmentId: string) {
  setAppointments((prev) =>
    prev.filter((appt) => appt.id !== appointmentId)
  )
}

  function updateStatusLocal(
  appointmentId: string,
  status: AppointmentStatus
) {
  setAppointments((prev) =>
    prev.map((appt) =>
      appt.id === appointmentId
        ? { ...appt, status }
        : appt
    )
  )
}


  async function loadAgenda(date: string) {
    setLoading(true)

    const res = await getAgendaByDate({
      userId,
      date,
    })

    if (!res.error) {
      setAppointments(res.data)
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="">
          <h1 className="md:text-2xl text-sm font-bold">Sua Agenda</h1>
          <p className="md:text-sm text-xs md:flex hidden text-zinc-600">
            Aqui você pode visualizar seus agendamentos
          </p>
        </div>

        <CalendarAgendamento
          onSelectDate={(date) => {
            setSelectedDate(date)
            loadAgenda(date)
          }}
        />
      </div>

      {/* Lista */}
      <main className="w-full flex flex-col gap-4 mt-6">
        
        {loading && <p>Carregando agenda...</p>}

        {!loading && appointments.length === 0 && selectedDate && (
          <p className="text-sm text-zinc-500">
            Nenhum agendamento para essa data
          </p>
        )}

        {appointments.map((appt) => (
          <article
            key={appt.id}
            className="flex md:flex-row  w-full items-start md:items-center  border p-4 rounded-lg"
          >
                  <div className="flex items-center justify-center relative top-5 xl:relative xl:top-0">
                <h1 className="border-r pr-4 font-semibold">
                {new Date(appt.date).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h1>
              </div>

            <div className="flex items-center gap-3 md:flex-row flex-col w-full ml-5 justify-center ">
        

              <div className="flex items-center md:justify-start justify-center w-full  space-x-2">
                <p className="md:font-medium text-xs">{appt.clientName}</p>
                <p className="md:text-sm text-xs text-zinc-600">
                  {appt.service.name}
                </p>
                <div>
                  
              <AppointmentStatusBadge status={appt.status as any}  />   
                          
                </div>
              </div>

              
               <div className="md:flex gap-2  max-auto flex  md:mt-0 mt-2 justify-start md:items-center md:justify-end">
              <SelectStatus  
              agendamentoId={appt.id}
              currentStatus={appt.status}
                onStatusChange={(newStatus) =>
    updateStatusLocal(appt.id, newStatus)
  }
              
            
              />
             <DeleteButton onDeleted={() => removeAppointmentLocal(appt.id)} AgendamentoId={appt.id} />
            </div>
            </div>

           
            
          </article>
        ))}
      </main>
    </div>
  )
}
