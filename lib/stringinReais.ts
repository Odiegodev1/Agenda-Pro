export function StringInReais(value: number) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}