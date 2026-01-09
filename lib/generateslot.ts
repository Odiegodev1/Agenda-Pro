export function generateTimeSlots(
  openTime: string,
  closeTime: string,
  duration: number
) {
  const slots: string[] = []

  const [openHour, openMinute] = openTime.split(":").map(Number)
  const [closeHour, closeMinute] = closeTime.split(":").map(Number)

  let current = new Date()
  current.setHours(openHour, openMinute, 0, 0)

  const end = new Date()
  end.setHours(closeHour, closeMinute, 0, 0)

  while (current < end) {
    slots.push(
      current.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    )

    current = new Date(current.getTime() + duration * 60000)
  }

  return slots
}
