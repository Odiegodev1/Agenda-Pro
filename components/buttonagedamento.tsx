import Link from "next/link"
import { Plus } from "lucide-react"

export function ButtonAgendamento({ userId }: { userId: string }) {
  return (
    <Link
      href={`/agenda/${userId}`}
      className="
        group relative inline-flex items-center gap-2
        rounded-xl px-5 py-2.5 text-sm font-semibold
        text-zinc-100
        bg-gradient-to-r from-zinc-800 to-zinc-700
        border border-zinc-700
        shadow-lg shadow-black/40
        transition-all duration-300
        hover:from-zinc-700 hover:to-zinc-600
        hover:border-zinc-600
        hover:shadow-xl hover:shadow-black/60
        active:scale-95
      "
    >
      {/* glow interno sutil */}
      <span className="absolute inset-0 rounded-xl bg-zinc-400/10 opacity-0 blur-md transition group-hover:opacity-100" />

      <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
      Novo agendamento
    </Link>
  )
}
