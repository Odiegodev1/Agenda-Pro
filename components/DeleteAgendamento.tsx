"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useTransition } from "react"
import { deleteAgendamento } from "@/app/(AgendaPro)/actios/create-agendamento"
import { toast } from "sonner"

export function DeleteButton({
  AgendamentoId,
  onDeleted,
}: {
  AgendamentoId: string
  onDeleted?: () => void
}) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      const res = await deleteAgendamento(AgendamentoId)

      if (res?.error) {
        toast.error(res.error)
        return
      }

      toast.success("Agendamento excluído")
      onDeleted?.() // 🔥 atualiza a UI
    })
  }

  return (
    <Button
      variant="outline"
      onClick={handleDelete}
      disabled={isPending}
    >
      <X className="text-red-500" />
    </Button>
  )
}
