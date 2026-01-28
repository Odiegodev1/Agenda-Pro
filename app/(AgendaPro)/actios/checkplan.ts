"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const MAX_FREE_DAYS = 1

export async function checkPlanLimits() {
  const session = await auth()

  if (!session?.user?.id) {
    return { allowed: false }
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      planActive: true,
      createdAt: true,
    },
  })

  if (!user) {
    return { allowed: false }
  }

  // ✅ Se for PRO, libera
  if (user.planActive) {
    return { allowed: true }
  }

  // 🔥 Trial
  const diffInDays =
    (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)

  if (diffInDays <= MAX_FREE_DAYS) {
    return { allowed: true }
  }

  return { allowed: false }
}
