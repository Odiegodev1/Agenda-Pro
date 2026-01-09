import { Button } from "@/components/ui/button"
import { openWhatsAppMessage } from "@/lib/zap"
import { MessageCircle } from "lucide-react"

interface MensagemZapProps {
  appointment: {
    clientPhone: string
    clientName: string
    service: { name: string }
    date: string
    hour: string
  }
}

export default function MensagemZap({ appointment }: MensagemZapProps) {
  return (
<Button
  onClick={() =>
    openWhatsAppMessage({
      phone: appointment.clientPhone,
      clientName: appointment.clientName,
      service: appointment.service.name,
      date: appointment.date,
      hour: appointment.hour,
    })
  }
  className="flex items-center gap-2"
>
  <MessageCircle className="w-4 h-4" />
  Enviar WhatsApp
</Button>
  )
}
