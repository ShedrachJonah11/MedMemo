import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Switch,
  Card,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import Loader from "./Loader";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState<any>();
  const [isLoading, setLoader] = useState(false);

  return (
    <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent style={{ maxWidth: "800px" }}>
        <ModalBody></ModalBody>
      </ModalContent>
      {isLoading && <Loader type={"FULL"} />}
    </Modal>
  );
};

export default AccountModal;
