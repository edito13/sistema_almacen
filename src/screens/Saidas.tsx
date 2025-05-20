import React, { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {useTranslation} from "react-i18next";

import Api from "@/services/api";
import format from "@/utils/Format";
import Table from "@/components/Table";
import useModal from "@/hooks/useModal";
import ModalExit from "@/components/ModalExit";
import { ToastContainer } from "react-toastify";

const Saidas: React.FC = () => {
  const {t} = useTranslation();
  const [filtroProduto, setFiltroProduto] = useState("");
  const [responsavelSaida, setResponsavelSaida] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const { isOpen, handleOpen, handleClose } = useModal("exit");

  const { data, refetch } = useQuery({
    queryKey: ["exits"],
    queryFn: Api.exit.getExits,
  });

  const handleSaveExit = () => {
    handleClose();
    refetch();
  };

  const filteredData = useMemo(() => {
    return (data || []).filter((item) => {
      return (
          item.equipment.name.toLowerCase().includes(filtroProduto.toLowerCase()) &&
          item.responsible.toLowerCase().includes(responsavelSaida.toLowerCase()) &&
          (dataInicio === "" || new Date(item.exit_date) >= new Date(dataInicio)) &&
          (dataFim === "" || new Date(item.exit_date) <= new Date(dataFim))
      );
    });
  }, [data, filtroProduto, responsavelSaida, dataInicio, dataFim]);

  const columns = [
    { name: t('exit.product'), accessor: (item: Exit) => item.equipment.name },
    { name: t('exit.concept'), accessor: (item: Exit) => item.concept },
    { name: t('exit.ammount'), accessor: (item: Exit) => item.quantity },
    { name: t('exit.responsible'), accessor: (item: Exit) => item.responsible },
    {
      name: t('exit.exit_date'),
      accessor: (item: Exit) => format.date(new Date(item.exit_date)),
    },
    {
      name: t('exit.entry_date'),
      accessor: (item: Exit) => format.date(new Date(item.delivery_date)),
    },
  ];

  return (
      <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="bg-gray-50 h-full rounded-2xl p-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-6 shadow-md mb-6 flex justify-between items-center"
          >
            <h1 className="text-2xl font-bold text-white">Saídas do Almoxarifado</h1>
            <button
                className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-orange-50 transition"
                onClick={() => handleOpen()}
            >
              <Plus size={18} />
              <span className="font-medium">Nova Saída</span>
            </button>
          </motion.div>

          {/* Filtros */}
          <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="bg-white rounded-lg shadow-md p-6 mb-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <input
                  type="text"
                  placeholder="Nome do produto"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={filtroProduto}
                  onChange={(e) => setFiltroProduto(e.target.value)}
              />
              <input
                  type="text"
                  placeholder="Responsável Saída"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={responsavelSaida}
                  onChange={(e) => setResponsavelSaida(e.target.value)}
              />
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
          </motion.div>

          {/* Tabela */}
          <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          >
            <Table columns={columns} data={filteredData} />
          </motion.div>

          <ToastContainer position="bottom-right" />
          {isOpen && <ModalExit onSave={handleSaveExit} />}
        </div>
      </motion.div>
  );
};

export default Saidas;
