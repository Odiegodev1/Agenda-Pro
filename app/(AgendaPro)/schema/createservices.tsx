import {z} from "zod";
export const createServiceSchema = z.object({
    name: z.string().min(1, "O nome do serviço é obrigatório"),
    duration: z.string().min(1, "A duração do serviço é obrigatória"),
    price: z.string().min(1, "O preço do serviço é obrigatório"),
})

export type CreateServiceSchema = z.infer<typeof createServiceSchema>;