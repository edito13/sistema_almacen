import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react"; // Only Plus is needed now
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
// IconButton and Tooltip are no longer needed if action buttons are removed
// import { IconButton, Tooltip } from "@mui/material";

import Api from "@/services/api";
import useModal from "@/hooks/useModal";

import Table from "@/components/Table";
import ModalCategoria from "@/components/ModalCategory";

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

// Simple custom confirmation modal component - REMOVED as actions column is removed
// const DeleteConfirmModal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   message: string;
//   title: string;
// }> = ({ isOpen, onClose, onConfirm, message, title }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: 50 }}
//         className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
//       >
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
//         <p className="text-gray-700 mb-6">{message}</p>
//         <div className="flex justify-end space-x-3">
//           <motion.button
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
//             onClick={onClose}
//             whileHover={subtleHoverScale}
//             whileTap={subtleTapScale}
//             transition={subtleTransition}
//           >
//             Cancel
//           </motion.button>
//           <motion.button
//             className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//             onClick={onConfirm}
//             whileHover={subtleHoverScale}
//             whileTap={subtleTapScale}
//             transition={subtleTransition}
//           >
//             Delete
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };


interface Category {
  id: number;
  name: string;
}

const Category: React.FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  // Removed delete related states as actions column is removed
  // const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // const [categoryToDeleteId, setCategoryToDeleteId] = useState<number | null>(null);


  const modalCategory = useModal("category");

  const { data, refetch } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: Api.category.getCategories,
  });

  // Filtrar categorias
  const categoriasFiltradas = data
      ? data.filter((item: Category) =>
          item.name.toLowerCase().includes(filtroCategoria.toLowerCase())
      )
      : [];

  const columns = [
    {
      name: t("category.cat"),
      accessor: (item: Category) => item.name,
    },
    // Removed the "actions" column entirely as requested
    // {
    //   name: t("category.actions"),
    //   accessor: (item: Category) => (
    //       <div className="flex items-center space-x-2 justify-end w-full">
    //         <Tooltip title="Editar categoria" arrow>
    //           <motion.div
    //             className="text-orange-500" // Apply text color from example
    //             whileHover={{ scale: 1.1, y: -2 }}
    //             whileTap={{ scale: 0.9, y: 0 }}
    //           >
    //             <IconButton
    //                 className="!bg-green-500 hover:!bg-green-600 text-white !rounded-xl"
    //                 onClick={() => handleEdit(item)}
    //             >
    //               <Edit size={18} /> {/* Use size 18 */}
    //             </IconButton>
    //           </motion.div>
    //         </Tooltip>
    //         <Tooltip title="Deletar categoria" arrow>
    //           <motion.div
    //             whileHover={{ scale: 1.1, y: -2 }}
    //             whileTap={{ scale: 0.9, y: 0 }}
    //           >
    //             <IconButton
    //                 className="!bg-red-500 hover:!bg-red-600 text-white !rounded-xl"
    //                 onClick={() => handleDelete(item.id)}
    //             >
    //               <Trash2 size={18} /> {/* Use Trash2 icon and size 18 */}
    //             </IconButton>
    //           </motion.div>
    //         </Tooltip>
    //       </div>
    //   ),
    //   align: 'right' as const,
    //   headerAlign: 'right' as const,
    // },
  ];

  // Removed handleEdit and handleDelete as actions column is removed
  // const handleEdit = (category: Category) => {
  //   setEditingCategory(category);
  //   modalCategory.handleOpen();
  // };

  // const handleDelete = (id: number) => {
  //   setCategoryToDeleteId(id);
  //   setShowDeleteConfirm(true);
  // };

  // const handleConfirmDelete = async () => {
  //   if (categoryToDeleteId === null) return;

  //   try {
  //     await Api.category.deleteCategory(categoryToDeleteId.toString());
  //     toast.success("Categoria deletada com sucesso!");
  //     refetch();
  //     queryClient.invalidateQueries({ queryKey: ["equipments"], refetchType: "all" });
  //   } catch (error) {
  //     toast.error("Erro ao deletar categoria");
  //     console.error("Erro ao deletar categoria:", error);
  //   } finally {
  //     setShowDeleteConfirm(false);
  //     setCategoryToDeleteId(null);
  //   }
  // };

  const handleSaveCategory = () => {
    modalCategory.handleClose();
    setEditingCategory(null);
    refetch();
    queryClient.invalidateQueries({ queryKey: ["equipments"], refetchType: "all" });
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
              {t("category.title")}
            </motion.h1>
            <motion.button
                className="bg-white text-blue-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-blue-50"
                onClick={() => {
                  setEditingCategory(null);
                  modalCategory.handleOpen();
                }}
                whileHover={{ ...subtleHoverScale, backgroundColor: "#eff6ff" }}
                whileTap={subtleTapScale}
                transition={subtleTransition}
            >
              <Plus size={18} />
              <span className="font-medium">{t("category.button")}</span>
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
            <div className="flex items-center gap-4 max-w-md">
              <input
                  type="text"
                  placeholder={t("category.filter_category")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Tabela reutilizável with animations */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Table data={categoriasFiltradas} columns={columns} />
          </motion.div>

          <ToastContainer position="bottom-right" />
          {modalCategory.isOpen && (
              <ModalCategoria
                  onSave={handleSaveCategory}
                  editingCategory={editingCategory}
              />
          )}

          {/* Custom Delete Confirmation Modal - REMOVED as actions column is removed */}
          {/* <DeleteConfirmModal
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={handleConfirmDelete}
            title={t("category.delete_confirm_title", "Confirm Deletion")}
            message={t("category.delete_confirm_message", "Are you sure you want to delete this category? This action cannot be undone.")}
          /> */}
        </div>
      </motion.div>
  );
};

export default Category;
