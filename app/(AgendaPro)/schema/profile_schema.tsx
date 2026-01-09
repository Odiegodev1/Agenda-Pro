import {z} from "zod";

export const profileSchema = z.object({
    name: z.string().min(2, {message: "O nome deve ter no mínimo 2 caracteres"}),
    location: z.string().min(5, {message: "Insira um endereço válido"}),
    openTime: z.string().min(1, {message: "O horário de abertura é obrigatório"}),
    closeTime: z.string().min(1, {message: "O horário de fechamento é obrigatório"}),

})

export type ProfileSchema = z.infer<typeof profileSchema>;