import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover", // Correct version with ".clover" suffix
})

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) {
    return new Response("No signature", { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook error:", err)
    return new Response("Webhook Error", { status: 400 })
  }

  // ✅ PAGAMENTO CONCLUÍDO
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    await prisma.user.updateMany({
      where: {
        stripeCustomerId: session.customer as string,
      },
      data: {
        plan: "PRO",
        planActive: true,
        planPaidAt: new Date(),
      },
    })
  }

  return new Response("ok", { status: 200 })
}
