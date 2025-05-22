import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconButton, Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Api from "@/services/api";
import format from "@/utils/Format";
import useModal from "@/hooks/useModal";

import Table from "@/components/Table";
import ModalEntry from "@/components/ModalEntry";
import ModalEditEntry from "@/components/ModalEntry/ModalEdit";
import ModalDeleteEntry from "@/components/ModalEntry/ModalDeletarEntry";

const Entradas: React.FC = () => {
  const { t } = useTranslation();
  // Estados dos filtros
  const [origem, setOrigem] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [filtroProduto, setFiltroProduto] = useState("");
  const [responsavelEntrada, setResponsavelEntrada] = useState("");
  const [responsavelRecebimento, setResponsavelRecebimento] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const queryClient = useQueryClient();
  const modalEntry = useModal("entry");
  const modalEdit = useModal("editEntry");
  const modalDelete = useModal("deleteEntry");

  const { data, refetch } = useQuery({
    queryKey: ["entries"],
    queryFn: Api.entry.getEntries,
  });

  const handleSaveEntry = () => {
    modalEntry.handleClose();
    modalEdit.handleClose();
    modalDelete.handleClose();
    refetch();
    queryClient.invalidateQueries({ queryKey: ["equipments"] });
    queryClient.invalidateQueries({
      queryKey: ["movements"],
      refetchType: "all",
    });
  };

  const handleDeleteEntry = async (id: number) => {
    try {
      const response = await Api.entry.deleteEntry(id);
      if (response?.error) throw response.message;

      toast.success("Entrada deletada com sucesso.");
    } catch (message) {
      toast.error(message as string);
    } finally {
      setTimeout(() => handleSaveEntry(), 1000);
    }
  };

  const columns = [
    {
      name: t("entry.product"),
      accessor: (item: Entry) => item.equipment.name,
    },
    { name: t("entry.details"), accessor: (item: Entry) => item.details },
    { name: t("entry.concept"), accessor: (item: Entry) => item.concept },
    { name: t("entry.ammount"), accessor: (item: Entry) => item.quantity },
    { name: t("entry.supplier"), accessor: (item: Entry) => item.supplier },
    {
      name: t("entry.responsible"),
      accessor: (item: Entry) => item.responsible,
    },
    {
      name: t("entry.entry_date"),
      accessor: (item: Entry) => format.date(new Date(item.entry_date)),
    },
    {
      name: "Ações",
      accessor: (item: Entry) => (
        <div className="flex space-x-2">
          <motion.div
            className="text-orange-500"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9, y: 0 }}
          >
            <Tooltip title="Editar" arrow>
              <IconButton
                onClick={() => {
                  modalEdit.handleOpen();
                  setSelectedEntry(item);
                }}
              >
                <Edit size={18} />
              </IconButton>
            </Tooltip>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9, y: 0 }}
          >
            <Tooltip title="Deletar" arrow>
              <IconButton
                onClick={() => {
                  modalDelete.handleOpen();
                  setSelectedEntry(item);
                }}
              >
                <Trash2 size={18} />
              </IconButton>
            </Tooltip>
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 h-full rounded-2xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-6 shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">{t("entry.title")}</h1>

          <button
            className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-orange-50 transition"
            onClick={() => modalEntry.handleOpen()}
          >
            <Plus size={18} />
            <span className="font-medium"> {t("entry.button")}</span>
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <input
              type="text"
              placeholder={t("entry.product_name")}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={filtroProduto}
              onChange={(e) => setFiltroProduto(e.target.value)}
            />
            <input
              type="text"
              placeholder={t("entry.entry_responsible")}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={responsavelEntrada}
              onChange={(e) => setResponsavelEntrada(e.target.value)}
            />
            <input
              type="text"
              placeholder={t("entry.receive_responsible")}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={responsavelRecebimento}
              onChange={(e) => setResponsavelRecebimento(e.target.value)}
            />
            <select
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value=""> {t("entry.select_origin")}</option>
              <option value="nacional">Nacional</option>
              <option value="internacional">Internacional</option>
            </select>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-start">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium flex items-center transition duration-200">
              <Search size={18} className="mr-2" />
              Buscar
            </button>
          </div>
        </div>

        {/* Tabela */}
        <Table columns={columns} data={data || []} />
        <ToastContainer position="bottom-right" />
        {modalEntry.isOpen && <ModalEntry onSave={handleSaveEntry} />}
        {modalEdit.isOpen && selectedEntry && (
          <ModalEditEntry item={selectedEntry} onSave={handleSaveEntry} />
        )}
        {modalDelete.isOpen && selectedEntry && (
          <ModalDeleteEntry
            onSave={() => handleDeleteEntry(selectedEntry.id)}
          />
        )}
      </div>
    </div>
  );
};
export default Entradas;
