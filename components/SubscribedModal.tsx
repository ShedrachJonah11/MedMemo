import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import check from "../public/check.png";
import Image from "next/image";

interface SaveModalProps {
  isOpen: boolean;
  onClose: any;
}

const SubscibedModal: React.FC<SaveModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={()=>{ onClose(false) }}>
      <ModalContent className="flex flex-col justify-center items-center">
        <Image src={check} alt="" className="mt-6" style={{width:"60px"}} />
        <ModalHeader className="flex flex-col gap-1">Your   Plus plan has been activated</ModalHeader>
        <ModalBody>
          <p className="text-center">
            Thank you for upgrading your plan, you now have full access to all of VetMemo features.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button className="bg-[#008080] px-12 w-full" onPress={()=>{
            onClose(false)
          }}>
            <p className="text-white">Close</p>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubscibedModal;
