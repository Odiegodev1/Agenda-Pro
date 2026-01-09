"use client"


import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteService } from "@/app/(AgendaPro)/actios/createservice"
import { toast } from "sonner"

export function DeleteServiceButton({ serviceId }: { serviceId: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

function handleDelete() {
  startTransition(async () => {
    const res = await deleteService(serviceId)

    if(res.error){
      toast.error(res.error)
      return
    }
    toast.success("Serviço excluido com sucesso!")
    router.refresh()
  })
}

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      <X className="w-4 h-4" />
      {isPending ? "Excluindo..." : "Excluir"}
    </Button>
  )
}
