"use client";
import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bg-black/50 backdrop-blur-sm inset-0 flex items-center justify-center z-50"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            ease: "backInOut",
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: "100vh",
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              y: "100vh",
            }}
            className="bg-black shadow-white rounded-lg p-6 relative w-96"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <FaWindowClose color="red" size={20} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
