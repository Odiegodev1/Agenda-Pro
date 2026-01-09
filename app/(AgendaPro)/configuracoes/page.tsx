import { AvatarUploader } from "@/components/AvatarUploader";
import { FormConfig } from "@/components/FormConfig";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { AvatarImage } from "@radix-ui/react-avatar";
import { redirect } from "next/navigation";

export default async function ConfiguracoesPage(){
    const session = await auth();
       
        if(!session){
            return redirect("/")
        }
    const userData = {
        name: session?.user?.name,
        image: session?.user?.image,
        location: session?.user?.location || "",
        openTime: session?.user?.openTime || "",
        closeTime: session?.user?.closeTime || ""
      
        
        

    }
    console.log(session?.user);
    return(
         <section className="flex flex-1">
        <div className="border flex-1 p-4 rounded-2xl">
         <h1 className="text-xl font-bold">Meu Perfil</h1>
         <div className="mt-8 flex items-center justify-center">
            <AvatarUploader
  image={userData.image}
  name={userData.name}
/>
         </div>
         <main>
            <FormConfig 
            location={userData.location || ""}
            openTime={userData.openTime || ""}
            closeTime={userData.closeTime || ""}
            name={userData.name || ""}  />
         </main>
        </div>
         </section>
    )
}