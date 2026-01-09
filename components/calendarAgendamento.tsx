"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  value?: string
  onChange?: (date: string) => void
  onSelectDate?: (date: string) => void
}

function formatDate(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

export function CalendarAgendamento({
  value,
  onChange,
  onSelectDate,
}: Props) {
  const [open, setOpen] = React.useState(false)

  const [date, setDate] = React.useState<Date>(() => {
    return value ? new Date(value + "T12:00:00") : new Date()
  })

  React.useEffect(() => {
    const formatted = formatDate(date)
    onChange?.(formatted)
    onSelectDate?.(formatted)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSelect(d?: Date) {
    if (!d) return

    setDate(d)

    const formatted = formatDate(d)
    onChange?.(formatted)
    onSelectDate?.(formatted)

    setOpen(false)
  }

  const today = new Date()
  const minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  return (
    <div className="flex gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-40 justify-between font-normal"
          >
            {date.toLocaleDateString()}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(d) => d < minDate} // 🚫 bloqueia dias passados
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
