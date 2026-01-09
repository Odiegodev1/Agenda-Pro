export function openWhatsAppMessage({
  phone,
  clientName,
  service,
  date,
  hour,
}: {
  phone: string
  clientName: string
  service: string
  date: string
  hour: string
}) {
  const message = `
Olá ${clientName}! 👋

Seu agendamento foi confirmado ✅

📅 Data: ${date}
⏰ Hora: ${hour}
💈 Serviço: ${service}

Qualquer dúvida é só me chamar 🙂
  `.trim()

  const url = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`

  window.open(url, "_blank")
}
