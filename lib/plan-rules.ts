import { prisma } from "@/lib/prisma"

const FREE_DAYS = 4
const MAX_SERVICES_FREE = 2
const MAX_APPOINTMENTS_PER_DAY_FREE = 3

export async function checkPlanLimits(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      planActive: true,
      createdAt: true,
    },
  })

  if (!user) throw new Error("Usuário não encontrado")

  // 🔓 PRO: tudo liberado
  if (user.planActive) {
    return
  }

  // ⏳ 4 dias de free
  const now = new Date()
  const diffInDays =
  (Date.now() - user.createdAt.getTime()
) /
  (1000 * 60 * 60 * 24)

  if (diffInDays > FREE_DAYS) {
    throw new Error("Período grátis encerrado")
  }
}
