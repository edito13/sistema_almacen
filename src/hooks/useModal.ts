import { useContext, useMemo } from "react";
import ModalContext from "@/contexts/ModalContext";

const useModal = (key: Modals) => {
  const { openModals, openModal, closeModal } = useContext(ModalContext);

  return useMemo(
    () => ({
      isOpen: !!openModals[key],
      handleOpen: () => openModal(key),
      handleClose: () => closeModal(key),
    }),
    [key, openModals, openModal, closeModal]
  );
};

export default useModal;
