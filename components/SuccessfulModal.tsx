import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import success from "../public/succes.svg";
import Image from "next/image";

interface SuccessfulModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessfulModal: React.FC<SuccessfulModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <Image src={success} alt="" />
        </ModalHeader>
        <ModalBody>
          <p>We cant hear you, did you pick the correct microphone settings?</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessfulModal;
