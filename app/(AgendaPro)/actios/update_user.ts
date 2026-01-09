"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ProfileSchema } from "../schema/profile_schema"
import { generateSlug } from "@/lib/createslug"


export async function updateUser(data: ProfileSchema) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return {
      data: null,
      error: "Usuário não autenticado",
    }
  }

  try {
    // 1️⃣ gera slug base
    const baseSlug = generateSlug(data.name)
    let slug = baseSlug
    let count = 1

    // 2️⃣ evita slug duplicado
    while (
      await prisma.user.findUnique({
        where: { slug },
      })
    ) {
      slug = `${baseSlug}-${count}`
      count++
    }

    // 3️⃣ atualiza usuário
    const userUpdated = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        location: data.location,
        openTime: data.openTime,
        closeTime: data.closeTime,
        slug,
      },
    })
 console.log("USER UPDATED:", slug)
    return {
      data: userUpdated,
      error: null,
    }
  } catch (error) {
    console.error(error)
    return {
      data: null,
      error: "Erro ao atualizar o usuário",
    }
  }
}
