"use server";

import { prisma } from "@/lib/prisma";

export async function checkDataAccess({ userId }: { userId: string }) {


try{
    if(!userId){
        return {
            data: null,
            error: "Usuário não autenticado",
          }
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            services: true,

        }
        
      });

      if(!user){
        return {
            data: null,
            error: "Usuário não encontrado",
          }
      }
      return {
        data: user,
        error: null,
      }
}catch(error){
    return {
        data: null,
        error: "Erro ao verificar acesso aos dados",
      }
}

}