import React, { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Search, Plus, Filter, Download } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import Api from "@/services/api";
import Table from "@/components/Table";
import useModal from "@/hooks/useModal";
import ModalEntry from "@/components/ModalEntry";

interface StockProps {}

const Stock: React.FC<StockProps> = () => {
  const { t } = useTranslation();
  // Estados para filtros e paginação
  const [searchTerm, setSearchTerm] = useState("");
  const [origin, setOrigin] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const modalEntry = useModal("entry");
  const { data } = useQuery({
    queryKey: ["stock"],
    queryFn: Api.stock.getStock,
  });

  // Estados para animações
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Controles de animação
  const headerControls = useAnimation();
  const tableControls = useAnimation();

  // Simulando carregamento inicial para efeito visual
  useEffect(() => {
    const sequence = async () => {
      await headerControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      });

      await tableControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
      });

      setIsInitialLoad(false);
    };

    sequence();
  }, [headerControls, tableControls]);

  // Aplicar filtros
  const handleApplyFilters = () => {
    setIsSearching(true);
    setCurrentPage(1);

    // Simular delay de pesquisa
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  // Variantes de animação
  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const filterContainerVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const tableContainerVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  const searchButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
  };

  // Animação para o botão nova entrada
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const columns = [
    { name: "ID", accessor: (item: Equipment) => item.id },
    { name: "PRODUTO", accessor: (item: Equipment) => item.name },
    { name: "CATEGORIA", accessor: (item: Equipment) => item.category?.name },
    { name: "QUANTIDADE", accessor: (item: Equipment) => item.quantity },
    { name: "ENTRADAS", accessor: (item: Equipment) => item.entries?.length },
    { name: "SAÍDAS", accessor: (item: Equipment) => item.exits?.length },
    {
      name: t("product.status"),
      accessor: (item: Equipment) => (
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
            item.min_quantity < item.quantity
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.min_quantity < item.quantity
            ? t("status.regular")
            : t("status.low")}
        </div>
      ),
    },
  ];

  console.log("data", data);

  const handleSaveEntry = () => {};

  return (
    <div className="h-full bg-gray-50 rounded-2xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg p-6 shadow-md mb-6"
          initial="hidden"
          animate={headerControls}
          variants={headerVariants}
        >
          <div className="flex justify-between items-center">
            <motion.h1
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Produtos em Stock
            </motion.h1>

            <motion.button
              className="bg-white text-blue-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-blue-50 transition duration-200"
              onClick={() => modalEntry.handleOpen()}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Plus size={18} />
              <span className="font-medium">Nova Entrada</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Barra de pesquisa e filtros */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-6"
          variants={filterContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <motion.div
              className="relative "
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <input
                type="text"
                placeholder="Buscar produto..."
                className="w-full border border-gray-300 rounded-md pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>

            <motion.select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <option value="">Selecionar origem provedor</option>
              <option value="nacional">Nacional</option>
              <option value="internacional">Internacional</option>
            </motion.select>

            <motion.input
              type="text"
              placeholder="País Provedor"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            />

            <motion.input
              type="text"
              placeholder="Comércio Provedor"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            />
          </div>

          <div className="flex justify-end">
            <motion.button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium flex items-center transition duration-200"
              onClick={handleApplyFilters}
              variants={searchButtonVariants}
              whileHover="hover"
              whileTap="tap"
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
            >
              <Search size={18} className="mr-2" />
              <span>Buscar</span>

              {/* Efeito de onda ao clicar */}
              <AnimatePresence>
                {isSearching && (
                  <motion.span
                    className="absolute inset-0 rounded-md bg-white"
                    initial={{ opacity: 0.3, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 1.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* Tabela de produtos */}
        <motion.div
          className="bg-white rounded-lg shadow-md overflow-hidden"
          variants={tableContainerVariants}
          initial="hidden"
          animate={tableControls}
        >
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <motion.h3
              className="text-2xl font-semibold text-gray-700"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              Inventário de Produtos
            </motion.h3>
            <motion.div
              className="flex space-x-2"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <Tooltip title="Filtrar" arrow>
                <motion.button
                  className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9, y: 0 }}
                >
                  <Filter size={18} />
                </motion.button>
              </Tooltip>
              <Tooltip title="Baixar inventário" arrow>
                <motion.button
                  className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9, y: 0 }}
                >
                  <Download size={18} />
                </motion.button>
              </Tooltip>
            </motion.div>
          </div>

          <Table columns={columns} data={data || []} />
        </motion.div>

        {/* Modal com animação */}
        <AnimatePresence>
          {modalEntry.isOpen && <ModalEntry onSave={handleSaveEntry} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Stock;
