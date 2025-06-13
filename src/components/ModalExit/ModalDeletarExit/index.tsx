import React from "react";
import { Save, Trash2, XCircle } from "lucide-react";

import Modal from "@/components/Modal";
import useModal from "@/hooks/useModal";
import { Divider } from "@mui/material";

interface ModalDeleteExitProps {
  onSave: () => void;
}

// Este componente foi revisado para corrigir problemas de sobreposição e estilo
const ModalDeleteExit: React.FC<ModalDeleteExitProps> = ({ onSave }) => {
  const { handleClose } = useModal("deleteExit");

  return (
    <Modal.Root name="deleteExit">
      <Modal.Title Icon={Trash2}>Deletar Saída</Modal.Title>
      <Modal.Content>
        <div>
          <p className="text-lg mb-4">
            Tem mesmo a certeza absoluta que deseja deletar essa saída?
          </p>
          <p>
            <b>Nota:</b> Não poderá reverter mais tarde essa ação.
          </p>
        </div>
        <div className="my-4">
          <Divider />
        </div>
        <div className="mt-2 bg-gray-50 flex justify-center sm:justify-end space-x-3">
          <button
            onClick={handleClose}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition duration-200"
          >
            <XCircle size={16} className="mr-1" />
            Cancelar
          </button>
          <button
            className={
              "flex items-center justify-center px-6 py-2 rounded font-medium transition duration-200 bg-blue-500 hover:bg-blue-600 text-white"
            }
            onClick={onSave}
          >
            <Save size={16} className="mr-1" />
            Confirmar
          </button>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
export default ModalDeleteExit;
