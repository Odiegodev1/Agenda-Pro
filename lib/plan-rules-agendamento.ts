import { prisma } from "./prisma";

const max_days = 2

export async function CheckPalnDays2(userId: string){ 
    const user = await prisma.user.findFirst({
        where: {id: userId},
         select: {planActive: true, createdAt: true},
        })

    if(!user) throw new Error("Usuário nao encontrado")

    if(user.planActive){
        return
    }    

    const MAxDatys = max_days

    const now = new Date()
    const diffInDays = (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    
    if(diffInDays > MAxDatys){
        throw new Error("Período encerrado")
    }

    
}