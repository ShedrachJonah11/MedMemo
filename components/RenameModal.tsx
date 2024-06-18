import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import check from "../public/check.png";
import Image from "next/image";
import { getEncouterDB, updateEncounterDB } from "@/application/database/database";
import { toast } from "react-toastify";

interface SaveModalProps {
  isOpen: boolean;
  onClose: any;
  refresher:any;
  id:any;
}

const RenameModal: React.FC<SaveModalProps> = ({ isOpen, onClose,id,refresher }) => {
    const [name,setName]=useState("");
    const getInitName= async()=>{
        const data = await getEncouterDB(id);
        console.log(data)
        setName(data.title);
    }
    useEffect(()=>{
        getInitName();
    },[])
    const saveAndRefresh= async ()=>{
        if(name.length<1){
            toast.error("Input title")
            return;
        }
    await updateEncounterDB(id,"title",name);
    const obj = document.getElementById("history-"+id);
    if(obj!=null){
        obj.innerText=name;
    }
    refresher();
    onClose(false);
    }
  return (
    <Modal isOpen={isOpen} onOpenChange={()=>{ onClose(false) }}>
      <ModalContent className="flex flex-col justify-center items-center">
        <ModalHeader className="flex flex-col gap-1">Rename Encounter</ModalHeader>
        <ModalBody>
          <Input 
          value={name}
          onChange={(e)=>{
            setName(e.target.value)
          }}
          />
        </ModalBody>
        <ModalFooter>
          <Button className="bg-[#008080] px-12 w-full" onPress={()=>{
            saveAndRefresh()
          }}>
            <p className="text-white">Save</p>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RenameModal;
