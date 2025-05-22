import React, { useState, useMemo } from "react"; // Import useMemo
import { Plus, Search } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import Api from "@/services/api";
import useModal from "@/hooks/useModal";

import Table from "@/components/Table";
import ModalProduto from "@/components/ModalProduto";

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

const Produtos: React.FC = () => {
  const { t } = useTranslation();

  const [filtroProduto, setFiltroProduto] = useState(""); // State for the input field
  const [activeFiltroProduto, setActiveFiltroProduto] = useState(""); // State for the applied filter

  const modalProduct = useModal("product");

  const { data: allProducts, refetch } = useQuery<Equipment[], Error>({ // Renamed data to allProducts for clarity
    queryKey: ["equipments"],
    queryFn: Api.equipment.getEquipments,
  });

  // Memoized filtering logic to apply on button click
  const filteredProducts = useMemo(() => {
    if (!allProducts) return []; // Return empty array if no data

    if (!activeFiltroProduto) {
      return allProducts; // Return all products if no filter is active
    }

    const lowerCaseFilter = activeFiltroProduto.toLowerCase();
    return allProducts.filter((item: Equipment) =>
        item.name.toLowerCase().includes(lowerCaseFilter)
    );
  }, [allProducts, activeFiltroProduto]); // Depend on allProducts and activeFiltroProduto

  const columns = [
    { name: t('product.prod'), accessor: (item: Equipment) => item.name },
    { name: t('product.category'), accessor: (item: Equipment) => item.category?.name },
    { name: t('product.ammount'), accessor: (item: Equipment) => item.quantity },
    {
      name: t('product.min_ammount'),
      accessor: (item: Equipment) => item.min_quantity,
    },
    {
      name: t('product.status'),
      accessor: (item: Equipment) => (
          <div className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
              item.min_quantity < item.quantity
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
          }`}>
            {item.min_quantity < item.quantity ? t('status.regular') : t('status.low')}
          </div>
      ),
    },
  ];

  const handleSaveProduct = () => {
    modalProduct.handleClose();
    refetch();
    // After saving, re-apply the current filter in case new product matches it
    setActiveFiltroProduto(filtroProduto);
  };

  // Function to handle search button click
  const handleSearchClick = () => {
    setActiveFiltroProduto(filtroProduto); // Apply the filter from the input field
  };

  return (
      <motion.div
          className="bg-gray-50 h-full rounded-2xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho with animations */}
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
              {t("product.title")}
            </motion.h1>
            <motion.button
                className="bg-white text-blue-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-blue-50"
                onClick={modalProduct.handleOpen}
                whileHover={{ ...subtleHoverScale, backgroundColor: "#eff6ff" }}
                whileTap={subtleTapScale}
                transition={subtleTransition}
            >
              <Plus size={18} />
              <span className="font-medium">{t("product.button")}</span>
            </motion.button>
          </motion.div>

          {/* Filtro with animations */}
          <motion.div
              className="bg-white rounded-lg shadow-md p-6 mb-6"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <div className="flex items-center gap-6 max-w-[40%]">
              <input
                  type="text"
                  placeholder={t('product.filter_prod')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filtroProduto}
                  onChange={(e) => setFiltroProduto(e.target.value)}
              />
              <motion.button
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium flex items-center transition"
                  onClick={handleSearchClick}
                  whileHover={{ ...subtleHoverScale, backgroundColor: "#15803d" }}
                  whileTap={subtleTapScale}
                  transition={subtleTransition}
              >
                <Search size={18} className="mr-2" />
                {t("product.search_button")}
              </motion.button>
            </div>
          </motion.div>

          {/* Tabela with animations */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Table columns={columns} data={filteredProducts} />
          </motion.div>
          <ToastContainer position="bottom-right" />
          {modalProduct.isOpen && <ModalProduto onSave={handleSaveProduct} />}
        </div>
      </motion.div>
  );
};

export default Produtos;
