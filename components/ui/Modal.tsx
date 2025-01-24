import React from "react";
import { FaWindowClose } from "react-icons/fa";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-cardbackground flex items-center justify-center z-50">
      <div className="bg-black shadow-white rounded-lg p-6 relative w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <FaWindowClose color="red" size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
