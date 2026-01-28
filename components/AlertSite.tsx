"use client"

import { useEffect, useState } from "react"
import { getAgenda } from "@/app/(AgendaPro)/actios/get-agendamento"

type Props = {
  userId: string
}

export function AlertSite({ userId }: Props) {
  const [total, setTotal] = useState<number | null>(null)

  async function loadAgenda() {
    const res = await getAgenda({ userId })

    if (!res?.error) {
      const ativos = res.data.filter((appt) => 
      appt.status !== "CONCLUIDO" && appt.status !== "CANCELADO" && appt.status !== "FALTOU"
      )

      setTotal(ativos.length)
    }
  }

  useEffect(() => {
    loadAgenda()

    // ⏱️ atualiza a cada 10s (leve e seguro)
    const interval = setInterval(loadAgenda, 10000)

    return () => clearInterval(interval)
  }, [userId])

  if (total === null) return null

  return (
    <div className="flex items-center justify-center w-full">
      {total > 0 ? (
        <p className="text-sm font-semibold text-zinc-200">
          Você possui <strong>{total}</strong> agendamento{total > 1 && "s"}
        </p>
      ) : (
        <p className="text-sm font-semibold text-zinc-500">
          Você não possui agendamentos
        </p>
      )}
    </div>
  )
}
