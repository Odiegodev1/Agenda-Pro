import { AppointmentStatus } from "@/lib/generated/prisma"

export function AppointmentStatusBadge({
  status,
}: {
  status: AppointmentStatus
}) {
  const map = {
    AGENDADO: "bg-blue-100 text-blue-700",
    CONCLUIDO: "bg-green-100 text-green-700",
    FALTOU: "bg-yellow-100 text-yellow-700",
    CANCELADO: "bg-red-100 text-red-700",
  }

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${map[status]}`}
    >
      {status}
    </span>
  )
}
