import { z } from "zod"

export const createAgendamentoSchema = z.object({
  clientName: z.string().min(1, "O nome do cliente é obrigatório"),
  clientPhone: z.string().min(10, "Telefone inválido"),
  date: z.string().min(1, "Data é obrigatória"), // yyyy-mm-dd
  hour: z.string().min(1, "Hora é obrigatória"), // HH:mm
  serviceId: z.string().min(1, "Serviço é obrigatório"),
})

export type CreateAgendamentoSchema = z.infer<typeof createAgendamentoSchema>;