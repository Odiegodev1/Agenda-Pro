export function statusAgenda(status: string) {
    if (status === "pendente") return "Pendente"
    if (status === "cancelado") return "Cancelado"
    if (status === "finalizado") return "Finalizado"
}