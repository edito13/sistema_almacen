import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Edit, Plus, Trash2 } from "lucide-react";
import { IconButton, Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Api from "@/services/api";
import format from "@/utils/Format";
import useModal from "@/hooks/useModal";

import Table from "@/components/Table";
import ModalExit from "@/components/ModalExit";
import ModalEditExit from "@/components/ModalExit/ModalEdit";
import ModalDeleteExit from "@/components/ModalExit/ModalDeletarExit";

const Saidas: React.FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [selectedExit, setSelectedExit] = useState<Exit | null>(null);

  const modalExit = useModal("exit");
  const modalEdit = useModal("editExit");
  const modalDelete = useModal("deleteExit");

  const { data, refetch } = useQuery({
    queryKey: ["exits"],
    queryFn: Api.exit.getExits,
  });

  const handleSaveExit = () => {
    modalExit.handleClose();
    modalEdit.handleClose();
    modalExit.handleClose();
    refetch();
    queryClient.invalidateQueries({ queryKey: ["equipments"] });
    queryClient.invalidateQueries({
      queryKey: ["movements"],
      refetchType: "all",
    });
  };

  const handleDeleteExit = async (id: number) => {
    try {
      const response = await Api.exit.deleteExit(id);
      if (response?.error) throw response.message;

      toast.success("Saída deletada com sucesso.");
    } catch (message) {
      toast.error(message as string);
    } finally {
      setTimeout(() => handleSaveExit(), 1000);
    }
  };

  const columns = [
    { name: t("exit.product"), accessor: (item: Exit) => item.equipment.name },
    { name: t("exit.concept"), accessor: (item: Exit) => item.concept },
    { name: t("exit.ammount"), accessor: (item: Exit) => item.quantity },
    { name: t("exit.responsible"), accessor: (item: Exit) => item.responsible },
    {
      name: t("exit.exit_date"),
      accessor: (item: Exit) => format.date(new Date(item.exit_date)),
    },
    {
      name: t("exit.entry_date"),
      accessor: (item: Exit) => format.date(new Date(item.exit_date)),
    },
    {
      name: "Ações",
      accessor: (item: Exit) => (
        <div className="flex space-x-2">
          <Tooltip title="Editar" arrow>
            <motion.div
              className="text-orange-500"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9, y: 0 }}
            >
              <IconButton
                onClick={() => {
                  modalEdit.handleOpen();
                  setSelectedExit(item);
                }}
              >
                <Edit size={18} />
              </IconButton>
            </motion.div>
          </Tooltip>
          <Tooltip title="Deletar" arrow>
            <motion.div
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9, y: 0 }}
            >
              <IconButton
                onClick={() => {
                  modalDelete.handleOpen();
                  setSelectedExit(item);
                }}
              >
                <Trash2 size={18} />
              </IconButton>
            </motion.div>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 h-full rounded-2xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-6 shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">{t("exit.title")}</h1>
          <button
            className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-orange-50 transition"
            onClick={() => modalExit.handleOpen()}
          >
            <Plus size={18} />
            <span className="font-medium">{t("exit.button")}</span>
          </button>
        </div>
      </div>

      {/* Tabela */}
      <Table columns={columns} data={data || []} />
      <ToastContainer position="bottom-right" />
      {modalExit.isOpen && <ModalExit onSave={handleSaveExit} />}
      {modalEdit.isOpen && selectedExit && (
        <ModalEditExit item={selectedExit} onSave={handleSaveExit} />
      )}
      {modalDelete.isOpen && selectedExit && (
        <ModalDeleteExit onSave={() => handleDeleteExit(selectedExit.id)} />
      )}
    </div>
  );
};

export default Saidas;
