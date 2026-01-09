import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { FormServices } from "./FormServices";
import { UpFormServices } from "./updateFormService";
type FormServicesProps = {
    services: {
        serviceId: string,
        name: string,
        duration: string,
        price: string
    }

}
export function EditServices({services}: FormServicesProps){
    return(
       <Dialog>
            <DialogTrigger asChild>
                <Button><Edit /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Atualizar Serviço</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                    <UpFormServices services={services} />
                </div>
            </DialogContent>
        </Dialog>
    )

}