export function generateHours(start = 7, end = 23) {
  const hours: string[] = []

  for (let h = start; h <= end; h++) {
    hours.push(`${String(h).padStart(2, "0")}:00`)
  }

  return hours
}
