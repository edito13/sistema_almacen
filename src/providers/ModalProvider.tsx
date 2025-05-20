import React, { useCallback, useMemo } from "react";
import ModalContext from "@/contexts/ModalContext";

interface ModalProvoderProps {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: ModalProvoderProps) => {
  const [openModals, setOpenModals] = React.useState<Record<string, boolean>>(
    {}
  );

  const openModal = useCallback((key: string) => {
    setOpenModals((prev) => ({ ...prev, [key]: true }));
  }, []);

  const closeModal = useCallback((key: string) => {
    setOpenModals((prev) => ({ ...prev, [key]: false }));
  }, []);

  const value = useMemo(
    () => ({
      openModals,
      openModal,
      closeModal,
    }),
    [openModals, openModal, closeModal]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
