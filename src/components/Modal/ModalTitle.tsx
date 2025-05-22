import React, { type ElementType, type ReactNode } from "react";

interface ModalTitleProps {
  Icon?: ElementType;
  children: ReactNode;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ children, Icon }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-4 flex items-center gap-2">
      {Icon && (
        <span className="bg-white text-blue-500 p-2 rounded-full">
          <Icon size={20} />
        </span>
      )}
      <h2 className="font-medium text-white">{children}</h2>
    </div>
  );
};

export default ModalTitle;
