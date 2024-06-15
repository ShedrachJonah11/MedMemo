import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 overflow-hidden z-50 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute right-0 bg-white h-full shadow-xl px-[32px] py-[56px] rounded-bl-[16px] rounded-tl-[16px]">
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
