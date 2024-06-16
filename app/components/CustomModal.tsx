interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50  flex justify-center items-center z-[999]"
      onClick={handleOverlayClick}
    >
      <div className="bg-white w-[90%] lg:w-[24%] p-4 lg:p-[32px] rounded-[10px] relative flex justify-center items-center flex-col gap-[14px]">
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
