import React, { type ReactNode } from "react";

interface ModalContentProps {
  children: ReactNode;
}

const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export default ModalContent;
