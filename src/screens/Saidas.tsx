import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
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

// Interface para os filtros de Saída
interface ExitFilters {
  productName?: string;
  responsible?: string;
  startDate?: string;
  endDate?: string;
}

const Saidas: React.FC = () => {
  const { t } = useTranslation();

  const [inputFiltroProduto, setInputFiltroProduto] = useState("");
  const [inputResponsavel, setInputResponsavel] = useState("");
  const [inputDataInicio, setInputDataInicio] = useState("");
  const [inputDataFim, setInputDataFim] = useState("");

  const [activeFilters, setActiveFilters] = useState<ExitFilters>({});

  const queryClient = useQueryClient();
  const [selectedExit, setSelectedExit] = useState<Exit | null>(null);

  const modalExit = useModal("exit");
  const modalEdit = useModal("editExit");
  const modalDelete = useModal("deleteExit");

  // Buscar todas as saídas uma vez
  const {
    data: allExits,
    isLoading,
    refetch,
  } = useQuery<Exit[], Error>({
    queryKey: ["allExits"], // Chave para buscar todos os dados
    queryFn: Api.exit.getExits, // Assumindo que Api.exit.getExits() busca tudo
  });

  const handleApplyFilters = () => {
    setActiveFilters({
      productName: inputFiltroProduto,
      responsible: inputResponsavel,
      startDate: inputDataInicio,
      endDate: inputDataFim,
    });
  };

  // Lógica de filtragem client-side
  const filteredData = useMemo(() => {
    if (!allExits) return [];

    return allExits.filter((exit) => {
      let isValid = true;

      // Filtro por nome do produto
      if (
        activeFilters.productName &&
        !exit.equipment.name
          .toLowerCase()
          .includes(activeFilters.productName.toLowerCase())
      ) {
        isValid = false;
      }

      // Filtro por responsável
      if (
        activeFilters.responsible &&
        !exit.responsible
          .toLowerCase()
          .includes(activeFilters.responsible.toLowerCase())
      ) {
        isValid = false;
      }

      // Filtro por data de início
      if (activeFilters.startDate) {
        const exitDate = new Date(exit.exit_date);
        const filterStartDate = new Date(activeFilters.startDate);
        exitDate.setHours(0, 0, 0, 0);
        filterStartDate.setHours(0, 0, 0, 0);
        if (exitDate < filterStartDate) {
          isValid = false;
        }
      }

      // Filtro por data de fim
      if (activeFilters.endDate) {
        const exitDate = new Date(exit.exit_date);
        const filterEndDate = new Date(activeFilters.endDate);
        exitDate.setHours(0, 0, 0, 0);
        filterEndDate.setHours(0, 0, 0, 0);
        if (exitDate > filterEndDate) {
          isValid = false;
        }
      }
      return isValid;
    });
  }, [allExits, activeFilters]);

  const handleSaveExit = () => {
    modalExit.handleClose();
    modalEdit.handleClose();
    modalDelete.handleClose();
    refetch();
    queryClient.invalidateQueries({ queryKey: ["exits"], refetchType: "all" });
    queryClient.invalidateQueries({
      queryKey: ["equipments"],
      refetchType: "all",
    });
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
            {t("exit.title")}
          </motion.h1>
          <motion.button
            className="bg-white text-blue-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-blue-50"
            onClick={() => modalExit.handleOpen()}
            whileHover={{ ...subtleHoverScale, backgroundColor: "#eff6ff" }}
            whileTap={subtleTapScale}
            transition={subtleTransition}
          >
            <Plus size={18} />
            <span className="font-medium">{t("exit.button")}</span>
          </motion.button>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-6"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder={t("exit.product_name")}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={inputFiltroProduto}
              onChange={(e) => setInputFiltroProduto(e.target.value)}
            />
            <input
              type="text"
              placeholder={t("exit.responsible")}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={inputResponsavel}
              onChange={(e) => setInputResponsavel(e.target.value)}
            />
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={inputDataInicio}
              onChange={(e) => setInputDataInicio(e.target.value)}
            />
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={inputDataFim}
              onChange={(e) => setInputDataFim(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-start">
            <motion.button
              className="bg-green-500 text-white px-6 py-2 rounded-md font-medium flex items-center"
              onClick={handleApplyFilters}
              whileHover={{ ...subtleHoverScale, backgroundColor: "#15803d" }}
              whileTap={subtleTapScale}
              transition={subtleTransition}
              disabled={isLoading}
            >
              <Search size={18} className="mr-2" />
              {t("exit.search_button")}
            </motion.button>
          </div>
        </motion.div>

        {/* Tabela */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {isLoading && (
            <p className="text-center py-4">{t("exit.loading_exits")}</p>
          )}
          {!isLoading && allExits && (
            <Table columns={columns} data={filteredData} />
          )}
          {!isLoading && (!allExits || allExits.length === 0) && (
            <p className="text-center py-4">{t("exit.no_exits_found")}</p>
          )}
          {!isLoading &&
            allExits &&
            allExits.length > 0 &&
            filteredData.length === 0 &&
            activeFilters &&
            Object.keys(activeFilters).some(
              (key) => activeFilters[key as keyof ExitFilters]
            ) && (
              <p className="text-center py-4">
                {t(
                  "exit.no_exits_match_filters",
                  "Nenhuma saída corresponde aos filtros aplicados."
                )}
              </p>
            )}
        </motion.div>
      </div>
      <ToastContainer position="bottom-right" />
      {modalExit.isOpen && <ModalExit onSave={handleSaveExit} />}
      {modalExit.isOpen && <ModalExit onSave={handleSaveExit} />}
      {modalEdit.isOpen && selectedExit && (
        <ModalEditExit item={selectedExit} onSave={handleSaveExit} />
      )}
      {modalDelete.isOpen && selectedExit && (
        <ModalDeleteExit onSave={() => handleDeleteExit(selectedExit.id)} />
      )}
    </motion.div>
  );
};

export default Saidas;
