import { createUploadthing } from "uploadthing/next"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const f = createUploadthing()

export const uploadRouter = {
  avatar: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await auth()

      if (!session?.user?.id) {
        throw new Error("Não autorizado")
      }

      return {
        userId: session.user.id,
      }
    })
    .onUploadComplete(async ({ file, metadata }) => {
      await prisma.user.update({
        where: { id: metadata.userId },
        data: {
          image: file.url,
        },
      })
    }),
}

export type UploadRouter = typeof uploadRouter
