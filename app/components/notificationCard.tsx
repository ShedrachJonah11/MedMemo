import { Image } from "@nextui-org/react";
interface src{
    status:string
}
export function NotificationCard({status}:src) {
     function imgsrc() {
       switch (status) {
         case "completed":
           return "/blue-tick.png";
         case "unsuccessful":
           return "/red-close.png";
         case "ongoing":
           return "/brown-loading.png";
         default:
           return "blue-tick.png";
       }
     }
  return (
    <div className="flex p-3 rounded-md gap-3 justify-normal items-center bg-white">
      <div>
        <Image src={imgsrc()} className="w-[50px] h-50px"></Image>
      </div>
      <p className="text-[#808080] text-sm font-normal">
        Your session has been completed, click here to view it.
      </p>
    </div>
  );
}
