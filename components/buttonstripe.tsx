"use client"

import { createCheckout } from "@/app/(AgendaPro)/actios/create-checkout"


export function SubscribeButton() {
  async function handleSubscribe() {
    const url = await createCheckout()
    window.location.href = url!
  }

  return (
    <button
      onClick={handleSubscribe}
       className="mt-8 block w-full rounded-xl py-3 text-center font-medium transition bg-indigo-600 hover:bg-indigo-500"
                  
              
    >
      Assinar plano PRO
    </button>
  )
}
