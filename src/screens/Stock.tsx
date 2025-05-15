import React, { useState, useEffect } from "react";
import NovaEntradaModal from "@/components/NovaEntradaModal.tsx";
import {
  Search,
  Plus,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Tooltip } from "@mui/material";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface StockProps {}

const Stock: React.FC<StockProps> = () => {
  // Estados para filtros e paginação
  const [searchTerm, setSearchTerm] = useState("");
  const [origin, setOrigin] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSaveEntry = (data: any) => {
    console.log("Dados salvos:", data);
    // Aqui você pode adicionar a lógica para salvar os dados,
    // atualizar a tabela, enviar para API, etc.
    setIsModalOpen(false);
  };

  const itemsPerPage = 5;

  // Dados fictícios para demonstração
  const stockItems = [
    {
      id: 1,
      name: 'Monitor Dell 24"',
      details: "P2419H LED IPS",
      quantity: 15,
      value: 899.9,
      provider: "Dell Computadores",
      status: "Disponível",
    },
    {
      id: 2,
      name: "Notebook HP",
      details: "EliteBook 840 G8",
      quantity: 8,
      value: 5399.9,
      provider: "HP Brasil",
      status: "Baixo Estoque",
    },
    {
      id: 3,
      name: "Mouse Logitech",
      details: "M170 Wireless",
      quantity: 25,
      value: 89.9,
      provider: "Logitech Brasil",
      status: "Disponível",
    },
    {
      id: 4,
      name: "Teclado Microsoft",
      details: "Wireless Desktop 900",
      quantity: 12,
      value: 199.9,
      provider: "Microsoft BR",
      status: "Disponível",
    },
    {
      id: 5,
      name: "Cabo HDMI",
      details: "2m Premium",
      quantity: 30,
      value: 29.9,
      provider: "MultiCabos",
      status: "Disponível",
    },
    {
      id: 6,
      name: "SSD Kingston",
      details: "480GB A400",
      quantity: 5,
      value: 349.9,
      provider: "Kingston Technology",
      status: "Baixo Estoque",
    },
  ];

  // Função de ordenação
  const handleSort = (column: string) => {
    // Efeito visual de pesquisa
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 300);

    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Ícone de sort com animação
  const SortIcon: React.FC<{ column: string }> = ({ column }) => {
    const isActive = sortColumn === column;

    return (
      <motion.div
        animate={{
          rotate: isActive && sortDirection === "desc" ? 180 : 0,
          scale: isActive ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="ml-1"
      >
        {isActive ? (
          <ChevronUp size={16} className={`text-orange-500`} />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </motion.div>
    );
  };

  // Aplicar filtros
  const handleApplyFilters = () => {
    setIsSearching(true);
    setCurrentPage(1);

    // Simular delay de pesquisa
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  // Filtra pelo search, origin, country e company
  const filteredItems = stockItems
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (origin === "" ||
          item.provider.toLowerCase().includes(origin.toLowerCase())) &&
        (country === "" ||
          item.provider.toLowerCase().includes(country.toLowerCase())) &&
        (company === "" ||
          item.provider.toLowerCase().includes(company.toLowerCase()))
    )
    .sort((a, b) => {
      if (!sortColumn) return 0;
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortDirection === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  return (
    <div className="h-full bg-gray-50 rounded-2xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <motion.div
          className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-6 shadow-md mb-6"
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
              className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-orange-50 transition duration-200"
              onClick={() => setIsModalOpen(true)}
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
                className="w-full border border-gray-300 rounded-md pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>

            <motion.select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            />

            <motion.input
              type="text"
              placeholder="Comércio Provedor"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <th
                    onClick={() => handleSort("name")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <motion.div
                      className="flex items-center"
                      whileHover={{ color: "#f97316" }}
                    >
                      Produto
                      <SortIcon column="name" />
                    </motion.div>
                  </th>
                  <th
                    onClick={() => handleSort("details")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <motion.div
                      className="flex items-center"
                      whileHover={{ color: "#f97316" }}
                    >
                      Detalhes
                      <SortIcon column="details" />
                    </motion.div>
                  </th>
                  <th
                    onClick={() => handleSort("quantity")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <motion.div
                      className="flex items-center"
                      whileHover={{ color: "#f97316" }}
                    >
                      Quantidade
                      <SortIcon column="quantity" />
                    </motion.div>
                  </th>
                  <th
                    onClick={() => handleSort("value")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <motion.div
                      className="flex items-center"
                      whileHover={{ color: "#f97316" }}
                    >
                      Valor Unitário
                      <SortIcon column="value" />
                    </motion.div>
                  </th>
                  <th
                    onClick={() => handleSort("provider")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <motion.div
                      className="flex items-center"
                      whileHover={{ color: "#f97316" }}
                    >
                      Provedor
                      <SortIcon column="provider" />
                    </motion.div>
                  </th>
                  <th
                    onClick={() => handleSort("status")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  >
                    <motion.div
                      className="flex items-center"
                      whileHover={{ color: "#f97316" }}
                    >
                      Estado
                      <SortIcon column="status" />
                    </motion.div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </motion.tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {isSearching ? (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan={7} className="px-6 py-10 text-center">
                        <motion.div
                          animate={{
                            rotate: 360,
                            transition: {
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            },
                          }}
                          className="inline-block w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full"
                        />
                        <p className="mt-2 text-gray-500">Pesquisando...</p>
                      </td>
                    </motion.tr>
                  ) : (
                    paginatedItems.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        className="hover:bg-gray-50"
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={tableRowVariants}
                        onHoverStart={() => setHoveredRow(item.id)}
                        onHoverEnd={() => setHoveredRow(null)}
                        layoutId={`row-${item.id}`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.details}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <motion.span
                            animate={
                              hoveredRow === item.id
                                ? { scale: 1.1 }
                                : { scale: 1 }
                            }
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                          >
                            {item.quantity}
                          </motion.span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          R$ {item.value.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.provider}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <motion.span
                            className={`${
                              item.status === "Disponível"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            } px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                            whileHover={{ scale: 1.05 }}
                            animate={
                              hoveredRow === item.id
                                ? {
                                    y: [0, -2, 0],
                                    transition: { repeat: 1, duration: 0.5 },
                                  }
                                : {}
                            }
                          >
                            {item.status}
                          </motion.span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <motion.button
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 15,
                              }}
                            >
                              <Eye size={16} />
                            </motion.button>
                            <motion.button
                              className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 15,
                              }}
                            >
                              <Edit size={16} />
                            </motion.button>
                            <motion.button
                              className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 15,
                              }}
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <motion.div
            className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <p className="text-sm text-gray-700">
                Mostrando{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                a{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredItems.length)}
                </span>{" "}
                de <span className="font-medium">{filteredItems.length}</span>{" "}
                resultados
              </p>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <motion.button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">Anterior</span>
                  <ChevronDown
                    className="h-5 w-5 rotate-90"
                    aria-hidden="true"
                  />
                </motion.button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === i + 1
                        ? "bg-orange-50 text-orange-500"
                        : "bg-white text-gray-500"
                    } hover:bg-gray-50`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={
                      currentPage === i + 1
                        ? { backgroundColor: "#fff7ed", color: "#f97316" }
                        : { backgroundColor: "#ffffff", color: "#6b7280" }
                    }
                  >
                    {i + 1}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">Próximo</span>
                  <ChevronDown
                    className="h-5 w-5 -rotate-90"
                    aria-hidden="true"
                  />
                </motion.button>
              </nav>
            </div>
          </motion.div>
        </motion.div>

        {/* Modal com animação */}
        <AnimatePresence>
          {isModalOpen && (
            <NovaEntradaModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveEntry}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Stock;
