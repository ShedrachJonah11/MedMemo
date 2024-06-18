import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import mail from "../public/mail.svg";
import Image from "next/image";

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SaveModal: React.FC<SaveModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent className="flex flex-col justify-center items-center">
        <Image src={mail} alt="" className="mt-6" />
        <ModalHeader className="flex flex-col gap-1">Save session</ModalHeader>
        <ModalBody>
          <p className="text-center">
            If you&apos;re done recording, save the file to have easy access.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            className="border w-full px-12"
            variant="light"
            onPress={onClose}
          >
            Keep Recording
          </Button>
          <Button className="bg-[#008080] px-12 w-full" onPress={onClose}>
            <p className="text-white">Save</p>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaveModal;
