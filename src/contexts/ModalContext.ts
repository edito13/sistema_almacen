import { createContext } from "react";

interface ModalContextType {
  openModals: Record<string, boolean>;
  openModal: (key: string) => void;
  closeModal: (key: string) => void;
}

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

export default ModalContext;
