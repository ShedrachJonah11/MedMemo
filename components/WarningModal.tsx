import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import warning from "../public/warning.svg"
import Image from "next/image";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
            <Image src={warning} alt=""/>
        </ModalHeader>
        <ModalBody>
          <p>We cant hear you, did you pick the correct microphone settings?</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WarningModal;
