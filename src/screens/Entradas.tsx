import React, { useState, useCallback, useMemo } from "react"; // Adicionado useMemo
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

// Definições de variantes para animações comuns
const subtleHoverScale = { scale: 1.05 };
const subtleTapScale = { scale: 0.95 };
const subtleTransition = { duration: 0.2, ease: "easeInOut" };

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface EntryFilters {
  productName?: string;
  entryResponsible?: string;
  receiveResponsible?: string; // Será ignorado se não houver campo correspondente em Entry
  origin?: string;
  startDate?: string;
  endDate?: string;
}

const Entradas: React.FC = () => {
  const { t } = useTranslation();

  const [inputFiltroProduto, setInputFiltroProduto] = useState("");
  const [inputResponsavelEntrada, setInputResponsavelEntrada] = useState("");
  const [inputResponsavelRecebimento, setInputResponsavelRecebimento] =
    useState(""); // Mantido, mas não usado na lógica de filtro atual sem campo correspondente
  const [inputOrigem, setInputOrigem] = useState("");
  const [inputDataInicio, setInputDataInicio] = useState("");
  const [inputDataFim, setInputDataFim] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const [activeFilters, setActiveFilters] = useState<EntryFilters>({});

  const queryClient = useQueryClient();
  const modalEntry = useModal("entry");
  const modalEdit = useModal("editEntry");
  const modalDelete = useModal("deleteEntry");

  // Buscar todas as entradas uma vez
  const {
    data: allEntries,
    isLoading,
    refetch,
  } = useQuery<Entry[], Error>({
    queryKey: ["allEntries"], // Chave simplificada para buscar todos os dados
    queryFn: Api.entry.getEntries, // Assumindo que Api.entry.getEntries() busca tudo
  });

  const handleApplyFilters = () => {
    setActiveFilters({
      productName: inputFiltroProduto,
      entryResponsible: inputResponsavelEntrada,
      receiveResponsible: inputResponsavelRecebimento, // Este filtro não terá efeito a menos que 'Entry' tenha um campo correspondente
      origin: inputOrigem,
      startDate: inputDataInicio,
      endDate: inputDataFim,
    });
  };

  // Lógica de filtragem client-side
  const filteredData = useMemo(() => {
    if (!allEntries) return [];

    return allEntries.filter((entry) => {
      let isValid = true;

      // Filtro por nome do produto
      if (
        activeFilters.productName &&
        !entry.equipment.name
          .toLowerCase()
          .includes(activeFilters.productName.toLowerCase())
      ) {
        isValid = false;
      }

      // Filtro por responsável pela entrada
      if (
        activeFilters.entryResponsible &&
        !entry.responsible
          .toLowerCase()
          .includes(activeFilters.entryResponsible.toLowerCase())
      ) {
        isValid = false;
      }

      // NOTA: Filtro por 'receiveResponsible' não implementado aqui pois 'Entry' não tem um campo claro para ele.
      // Se você tiver um campo, por exemplo 'entry.receiver', adicione a lógica:
      // if (activeFilters.receiveResponsible && (!entry.receiver || !entry.receiver.toLowerCase().includes(activeFilters.receiveResponsible.toLowerCase()))) {
      //   isValid = false;
      // }

      // Filtro por origem
      if (activeFilters.origin && entry.origin !== activeFilters.origin) {
        isValid = false;
      }

      // Filtro por data de início
      if (activeFilters.startDate) {
        const entryDate = new Date(entry.entry_date);
        const filterStartDate = new Date(activeFilters.startDate);
        // Ajustar para ignorar a parte do tempo, comparando apenas a data
        entryDate.setHours(0, 0, 0, 0);
        filterStartDate.setHours(0, 0, 0, 0);
        if (entryDate < filterStartDate) {
          isValid = false;
        }
      }

      // Filtro por data de fim
      if (activeFilters.endDate) {
        const entryDate = new Date(entry.entry_date);
        const filterEndDate = new Date(activeFilters.endDate);
        // Ajustar para ignorar a parte do tempo, comparando apenas a data
        entryDate.setHours(0, 0, 0, 0);
        filterEndDate.setHours(0, 0, 0, 0);
        if (entryDate > filterEndDate) {
          isValid = false;
        }
      }
      return isValid;
    });
  }, [allEntries, activeFilters]);

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
    <motion.div
      className="bg-gray-50 h-full rounded-2xl p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg p-6 shadow-md mb-6 flex justify-between items-center"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-2xl font-bold text-white"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            {t("entry.title")}
          </motion.h1>

          <motion.button
            className="bg-white text-blue-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-blue-50"
            onClick={() => modalEntry.handleOpen()}
            whileHover={{ ...subtleHoverScale, backgroundColor: "#eff6ff" }}
            whileTap={subtleTapScale}
            transition={subtleTransition}
          >
            <Plus size={18} />
            <span className="font-medium"> {t("entry.button")}</span>
          </motion.button>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-6"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <input
              type="text"
              placeholder={t("entry.product_name")}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={inputFiltroProduto}
              onChange={(e) => setInputFiltroProduto(e.target.value)}
            />
            <input
              type="text"
              placeholder={t("entry.entry_responsible")}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={inputResponsavelEntrada}
              onChange={(e) => setInputResponsavelEntrada(e.target.value)}
            />
            <input
              type="text"
              placeholder={t("entry.receive_responsible")}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={inputResponsavelRecebimento}
              onChange={(e) => setInputResponsavelRecebimento(e.target.value)}
            />
            <select
              value={inputOrigem}
              onChange={(e) => setInputOrigem(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value=""> {t("entry.select_origin")}</option>
              <option value="nacional">Nacional</option>
              <option value="internacional">Internacional</option>
            </select>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={inputDataInicio}
                onChange={(e) => setInputDataInicio(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={inputDataFim}
                onChange={(e) => setInputDataFim(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-start">
            <motion.button
              className="bg-green-500 text-white px-6 py-2 rounded-md font-medium flex items-center"
              onClick={handleApplyFilters}
              whileHover={{ ...subtleHoverScale, backgroundColor: "#15803d" }}
              whileTap={subtleTapScale}
              transition={subtleTransition}
              disabled={isLoading} // Desabilita o botão durante o carregamento inicial de todos os dados
            >
              <Search size={18} className="mr-2" />
              {/* O texto não precisa mais mudar para "Buscando..." pois a filtragem é client-side e rápida */}
              {t("entry.search_button")}
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {isLoading && (
            <p className="text-center py-4">{t("entry.loading_entries")}</p>
          )}
          {!isLoading && allEntries && (
            <Table columns={columns} data={filteredData} />
          )}{" "}
          {/* Passar filteredData para a tabela */}
          {!isLoading && (!allEntries || allEntries.length === 0) && (
            <p className="text-center py-4">{t("entry.no_entries_found")}</p>
          )}
          {!isLoading &&
            allEntries &&
            allEntries.length > 0 &&
            filteredData.length === 0 &&
            activeFilters &&
            Object.keys(activeFilters).some(
              (key) => activeFilters[key as keyof EntryFilters]
            ) && (
              <p className="text-center py-4">
                {t(
                  "entry.no_entries_match_filters",
                  "Nenhuma entrada corresponde aos filtros aplicados."
                )}
              </p>
            )}
        </motion.div>

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
    </motion.div>
  );
};
export default Entradas;
