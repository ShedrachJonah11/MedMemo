import { ArrowDown2 } from "iconsax-react";
import drop from "../assets/arrow.svg";
import { useState } from "react";

type Props = {
  question: string;
  answer: string;
};

const Faq = ({ question, answer }: Props) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <div onClick={handleShow} className="w-full ">
        <div className="flex justify-between items-center lg:gap-5 gap-3 text-[14px] lg:text-[16px] font-[300] w-full">
          <p className="cursor-pointer pb-2 text-[18px] text-[#343A40] font-[700]">
            {question}
          </p>{" "}
          <div className="w-3 lg:w-5 cursor-pointer">
            <ArrowDown2 size="32" color="#71839B" />{" "}
          </div>
        </div>
        {show && (
          <p className="text-[18px] pl-[48px] text-[#343A40] mt-2 lg:mt-3">{answer}</p>
        )}
        <div className="bg-[#343A40] h-[2px] w-full my-2"></div>
      </div>
    </>
  );
};

export default Faq;
