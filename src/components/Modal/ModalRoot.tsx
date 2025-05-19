import React, { type ReactNode } from "react";

import { Container } from "./styles";
import useModal from "@/hooks/useModal";

interface ModalRootProps {
  children: ReactNode;
  name: Modals;
}

const ModalRoot: React.FC<ModalRootProps> = ({ children, name }) => {
  const { handleClose, isOpen } = useModal(name);

  return (
    <Container open={isOpen ?? false} onClose={() => handleClose()}>
      {children}
    </Container>
  );
};

export default ModalRoot;
