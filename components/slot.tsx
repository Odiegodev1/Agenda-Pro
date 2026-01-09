"use client"

import { getAvailableHours } from "@/app/(AgendaPro)/actios/get-slot-hours"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type AvailableHoursProps = {
  userId: string
  date: string // yyyy-mm-dd
  serviceDuration: number
  value?: string
  onChange?: (hour: string) => void
}

function parseLocalDate(date: string) {
  const [y, m, d] = date.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export function AvailableHours({
  userId,
  date,
  serviceDuration,
  value,
  onChange,
}: AvailableHoursProps) {
  const [hours, setHours] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  function isFutureHour(date: string, hour: string) {
    const [h, m] = hour.split(":").map(Number)

    const now = new Date()
    const selectedDate = parseLocalDate(date)

    const slotDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      h,
      m
    )

    return slotDate > now
  }

  useEffect(() => {
    if (!date || !serviceDuration) return

    async function load() {
      setLoading(true)

      const selectedDate = parseLocalDate(date)
      const today = new Date()

      // ❌ não permite datas passadas
      if (selectedDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        setHours([])
        setLoading(false)
        return
      }

      const res = await getAvailableHours({
        userId,
        date,
        serviceDuration,
      })

      if (!res?.error) {
        const isToday =
          selectedDate.toDateString() ===
          new Date(today.getFullYear(), today.getMonth(), today.getDate()).toDateString()

        const filteredHours = isToday
          ? res.hours.filter((hour) => isFutureHour(date, hour))
          : res.hours

        setHours(filteredHours)
      } else {
        setHours([])
      }

      setLoading(false)
    }

    load()
  }, [userId, date, serviceDuration])

  return (
    <div className="space-y-3">
      <h1 className="font-semibold">Horários disponíveis</h1>

      {loading && <p className="text-sm text-zinc-500">Carregando...</p>}

      <div className="grid md:grid-cols-6 grid-cols-4 gap-2">
        {hours.map((hour) => (
          <button
            key={hour}
            type="button"
            onClick={() => onChange?.(hour)}
            className={cn(
              "border rounded-md py-2 text-sm transition",
              value === hour
                ? "bg-black text-white border-black"
                : "hover:bg-zinc-800"
            )}
          >
            {hour}
          </button>
        ))}
      </div>

      {!loading && hours.length === 0 && (
        <p className="text-sm text-zinc-500">
          Nenhum horário disponível
        </p>
      )}
    </div>
  )
}
