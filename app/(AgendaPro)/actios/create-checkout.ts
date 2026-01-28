"use server"

import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});
export async function createCheckout() {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Não autenticado")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) throw new Error("Usuário não encontrado")

  // cria customer se não existir
  let customerId = user.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email || undefined,
    })

    customerId = customer.id

    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    })
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "payment", // 🔥 pagamento único
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1StDuXADgavo6aol99Z2EVJS", // price one-time
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
  })

  return checkout.url
}
