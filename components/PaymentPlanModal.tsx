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
import check from "../public/check .svg";
import checkx from "../public/checkX.svg";
import {
  getJSONdata,
  getPlan,
  isPlusUser,
} from "@/application/utils/functions";
import {
  startUserSubcription,
  updateUserSubcription,
} from "@/application/api/apis";
import Loader from "./Loader";
import { toast } from "react-toastify";

interface PaymentPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentPlanModal: React.FC<PaymentPlanModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isYearlyBilling, setIsYearlyBilling] = useState(true);
  const [userData, setUserData] = useState<any>();
  const [isLoading, setLoader] = useState(false);

  const toggleBillingCycle = () => {
    setIsYearlyBilling((prev) => !prev);
  };
  useEffect(() => {
    if (window) {
      setUserData(getJSONdata("profile"));
    }
  }, []);

  const subscribeUser = async () => {
    if (isPlusUser(!isYearlyBilling) == false) {
      try {
        if (isPlusUser(false) && isPlusUser(true) == false) {
          setLoader(true);
          const sub = await updateUserSubcription("SUBSCRIPTION_UPDATE");
          setLoader(false);
          window.location.href = sub.url;

          return;
        }

        setLoader(true);
        const sub = await startUserSubcription(
          "PLUS",
          !isYearlyBilling ? "YEARLY" : "MONTHLY"
        );
        setLoader(false);
        window.location.href = sub.url;
        //console.log(sub);
      } catch (e) {
        setLoader(false);
        toast.error("an error has occured");
        console.log(e);
      }
    }
  };
  return (
    <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onClose}  >
      <ModalContent style={{ maxWidth: "1000px",maxHeight:"80vh",overflowY:"auto"  }}>
        <ModalBody >
          <section id="Pricing" className="h-auto md:h-full">
            <div className=" relative bg-white  flex flex-col justify-center items-center py-10 px-4 sm:px-0">
              <h1 className="text-black mb-10 text-4xl text-center font-semibold">
                Upgrade your plan
              </h1>
              <div className="flex mb-10">
                <h1
                  className={`mr-4 ${
                    isYearlyBilling ? "text-[#E67E22]" : "text-[#ccc]"
                  }`}
                >
                  Billed Monthly
                </h1>
                <Switch
                  className="mr-4"
                  checked={isYearlyBilling}
                  onChange={toggleBillingCycle}
                  color="warning"
                />
                <h1
                  className={`mr-4 ${
                    isYearlyBilling ? "text-[#ccc]" : "text-[#E67E22]"
                  }`}
                >
                  Billed Yearly
                </h1>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                <motion.div
                  layout
                  variants={{
                    hidden: { y: 30, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ ease: "linear", delay: 0.3 }}
                  viewport={{ once: false }}
                >
                  <Card className="w-full md:w-[440px] h-full p-8 bg-transparent border border-[#008080] mb-4">
                    <h3 className="mb-4 font-semibold text-2xl">Free</h3>
                    <h1 className="text-black text-4xl mb-10 font-regular">
                    $0
                    </h1>

                    <p className="text-sm mb-4 text-gray-400">
                      Perfect for individuals or Companies looking to try things
                      out.
                    </p>

                    <Button
                      variant="bordered"
                      className="border-[#008080] py-6 border-1 mb-6"
                    >
                      <p className="text-[#008080] text-lg font-light">
                        {getPlan(userData?.roles || []) === "Free"
                          ? "Active"
                          : "Get Started"}
                      </p>
                    </Button>

                    <Divider className="mb-4" />

                    <h3 className="font-semibold mb-4">Features:</h3>

                    <div className="flex mb-4">
                      <Image src={check} alt="x" className="mr-4" />
                      <p className="text-black">5 sessions</p>
                    </div>
                    <div className="flex mb-4">
                      <Image src={check} alt="x" className="mr-4" />
                      <p className="text-black">1 account</p>
                    </div>
                    <div className="flex mb-4">
                      <Image src={checkx} alt="x" className="mr-4" />
                      <p className="text-black">Custom templates</p>
                    </div>
                    <div className="flex mb-4">
                      <Image src={checkx} alt="x" className="mr-4" />
                      <p className="text-black">Email support</p>
                    </div>
                  </Card>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { y: 30, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ ease: "linear", delay: 0.3 }}
                  viewport={{ once: false }}
                >
                  <Card className="w-full h-full md:w-[440px] bg-transparent p-8 border border-[#008080] mb-4">
                    <h3 className="mb-4 font-semibold text-2xl">Plus</h3>
                    <h1 className="text-black text-4xl mb-2 font-regular">
                      {isYearlyBilling ? "$99.99" : "$999.99"}
                    </h1>
                    <p className="mb-4 text-sm text-gray-400">
                      {" "}
                      {isYearlyBilling ? "Per month" : "Per year"}
                    </p>

                    <p className="text-sm mb-4 text-gray-400">
                      Perfect for individuals or Companies looking to try things
                      out.
                    </p>

                    <Button
                      variant="bordered"
                      className="border-[#008080] py-6 border-1 mb-6"
                      onClick={() => {
                        subscribeUser();
                      }}
                    >
                      <p className="text-[#008080] text-lg font-light">
                        {getPlan(userData?.roles || []) === "Plus"
                          ? "Active"
                          : "Get Started"}
                      </p>
                    </Button>

                    <Divider className="mb-4" />

                    <h3 className="font-semibold mb-4">Features:</h3>

                    <div className="flex mb-4">
                      <Image src={check} alt="x" className="mr-4" />
                      <p className="text-black">
                      Unlimited sessions
                      </p>
                    </div>
                    <div className="flex mb-4">
                      <Image src={check} alt="x" className="mr-4" />
                      <p className="text-black">
                        Unlimited accounts
                      </p>
                    </div>
                    <div className="flex mb-4">
                      <Image src={check} alt="x" className="mr-4" />
                      <p className="text-black">
                        Unlimited templates
                      </p>
                    </div>
                    <div className="flex mb-4">
                      <Image src={check} alt="x" className="mr-4" />
                      <p className="text-black">Dedicated support</p>
                    </div>
                  </Card>
                </motion.div>
              </div>
              <br/>
          <div className="flex flex-col md:flex-row gap-4 md:gap-10">
            <motion.div
              variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ ease: "linear", delay: 0.3 }}
              viewport={{ once: false }}
            >
              <Card className="w-full h-full md:w-[440px] bg-transparent p-8 border border-[#008080] mb-4">
                <h3 className="mb-4 font-semibold text-2xl">Enterprise</h3>
                <h1 className="text-black text-4xl mb-2 font-regular">
                  {isYearlyBilling ? "Custom" : "Custom"}
                </h1>
                <p className="mb-4 text-sm text-gray-400">
                  {" "}
                  {isYearlyBilling ? "Per month" : "Per year"}
                </p>

                <p className="text-sm mb-4 text-gray-400">
                Perfect for clinics or groups with multiple providers.
                </p>

                <Button
                  variant="bordered"
                  className="border-[#008080] py-6 border-1 mb-6"
                  onClick={() => {
                    //subscribeUser();
                    window.location.href="mailto:info@vetmemos.com"
                  }}
                >
                  <p className="text-[#008080] text-lg font-light">
                    {getPlan(userData?.roles || []) === "Enterprise"
                      ? "Active"
                      : "Contact Us"}
                  </p>
                </Button>

                <Divider className="mb-4" />

                <h3 className="font-semibold mb-4">Features:</h3>

                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">
                    All Plus Plan Features
                  </p>
                </div>
                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">
                    Unlimited Consultations
                  </p>
                </div>
                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">
                    Custom  Integrations & Automations
                  </p>
                </div>
                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">
                    Tailord Machine Learning Models
                  </p>
                </div>
                <div className="flex mb-4">
                  <Image src={check} alt="x" className="mr-4" />
                  <p className="text-black">
                   Dedicated Customer Support
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
            </div>
          </section>
        </ModalBody>
      </ModalContent>
      {isLoading && <Loader type={"FULL"} />}
    </Modal>
  );
};

export default PaymentPlanModal;
