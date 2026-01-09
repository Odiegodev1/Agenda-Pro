"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { generateHours } from "./generatehours"
import { DialogDescription } from "@radix-ui/react-dialog"


type WorkingHoursDialogProps = {
  openTime?: string
  closeTime?: string
  onConfirm: (open: string, close: string) => void
}

export function WorkingHoursDialog({
  openTime,
  closeTime,
  onConfirm,
}: WorkingHoursDialogProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"open" | "close">("open")
  const [openHour, setOpenHour] = useState(openTime)
  const [closeHour, setCloseHour] = useState(closeTime)

  const hours = generateHours(7, 23)

  function handleSelect(hour: string) {
    if (step === "open") {
      setOpenHour(hour)
      setStep("close")
    } else {
      setCloseHour(hour)
    }
  }

  function handleConfirm() {
    if (!openHour || !closeHour) return

    onConfirm(openHour, closeHour)
    setOpen(false)
    setStep("open")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {openTime && closeTime
            ? `${openTime} às ${closeTime}`
            : "Selecionar horário de funcionamento"}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {step === "open"
              ? "Selecione o horário de abertura"
              : "Selecione o horário de fechamento"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

       
          <div className="grid grid-cols-3 gap-2 mt-4">
            {hours.map((hour) => {
              const disabled =
                step === "close" && openHour
                  ? hour <= openHour
                  : false

              return (
                <Button
                  key={hour}
                  disabled={disabled}
                  variant={
                    hour === openHour || hour === closeHour
                      ? "default"
                      : "outline"
                  }
                  onClick={() => handleSelect(hour)}
                >
                  {hour}
                </Button>
              )
            })}
          </div>
  
        {step === "close" && closeHour && (
          <Button className="w-full mt-4" onClick={handleConfirm}>
            Confirmar horário
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
