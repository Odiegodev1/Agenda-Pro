"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pointer } from "lucide-react"
import { AppointmentStatus } from "@/lib/generated/prisma"
import { updateAppointmentStatus } from "@/app/(AgendaPro)/actios/create-agendamento"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type Props = {
  agendamentoId: string
  currentStatus: AppointmentStatus
  onStatusChange: (status: AppointmentStatus) => void
}

export function SelectStatus({
  agendamentoId,
  currentStatus,
  onStatusChange,
}: Props) {

    async function handleChange(value: string) {
    const newStatus = value as AppointmentStatus

    // 🔄 atualiza UI imediatamente
    onStatusChange(newStatus)

    // 💾 atualiza no banco
    const res = await updateAppointmentStatus(agendamentoId, newStatus)

    if (res.error) {
      toast.error(res.error)
      return
    }  

    toast.success("Status atualizado com sucesso!")

}



  return (
    <Select
      defaultValue={currentStatus}
      onValueChange={handleChange}
    >
      <SelectTrigger className="md:w-[140px] flex items-center gap-2">
        <SelectValue className="text-xs" />
        <Pointer className="w-4 h-4 text-zinc-500" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>

          <SelectItem className="text-xs" value="AGENDADO">Agendado</SelectItem>
          <SelectItem value="CONCLUIDO">Concluído</SelectItem>
          <SelectItem value="FALTOU">Faltou</SelectItem>
          <SelectItem value="CANCELADO">Cancelado</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
