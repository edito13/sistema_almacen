import React, { useState } from 'react';
import { Plus, Search, ChevronDown, ChevronUp } from 'lucide-react'; // Removed Edit, Trash2
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
// Removed IconButton and Tooltip as they are no longer used
// import { IconButton, Tooltip } from "@mui/material";
import { toast, ToastContainer } from "react-toastify"; // Still need ToastContainer for other toasts

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

// DeleteConfirmModal is no longer needed as actions column is removed
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


interface ClienteItem {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    direcao: string;
    tipo: string;
}

const Clientes: React.FC = () => {
    const {t} = useTranslation();

    const [filtroNome, setFiltroNome] = useState('');
    const [sortColumn, setSortColumn] = useState<keyof ClienteItem>('nome');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    // Removed delete related states
    // const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    // const [clientToDeleteId, setClientToDeleteId] = useState<number | null>(null);

    // Mock data for demonstration
    const [clientesIniciais, setClientesIniciais] = useState<ClienteItem[]>([
        { id: 1, nome: 'Empresa XYZ', telefone: '+55 11 1234-5678', email: 'contato@xyz.com', direcao: 'Rua A, 100', tipo: 'Fornecedor' },
        { id: 2, nome: 'Cliente ABC', telefone: '+55 21 9876-5432', email: 'vendas@abc.com', direcao: 'Av. B, 200', tipo: 'Cliente' },
        { id: 3, nome: 'Loja de Roupas', telefone: '+55 31 5678-1234', email: 'loja@roupas.com', direcao: 'Rua C, 300', tipo: 'Cliente' },
        { id: 4, nome: 'Distribuidora Alpha', telefone: '+55 41 9123-4567', email: 'contato@alpha.com', direcao: 'Av. D, 400', tipo: 'Fornecedor' },
        { id: 5, nome: 'Mercado Bom Preço', telefone: '+55 51 8765-4321', email: 'info@bompreco.com', direcao: 'Rua E, 500', tipo: 'Cliente' },
        { id: 6, nome: 'Tecnologia Beta', telefone: '+55 61 7890-1234', email: 'suporte@beta.com', direcao: 'Av. F, 600', tipo: 'Fornecedor' },
        { id: 7, nome: 'Consultoria Gama', telefone: '+55 71 2345-6789', email: 'servicos@gama.com', direcao: 'Rua G, 700', tipo: 'Cliente' },
        { id: 8, nome: 'Padaria Doce Lar', telefone: '+55 81 3456-7890', email: 'doce@lar.com', direcao: 'Av. H, 800', tipo: 'Cliente' },
        { id: 9, nome: 'Gráfica Rápida', telefone: '+55 91 4567-8901', email: 'pedidos@grafica.com', direcao: 'Rua I, 900', tipo: 'Fornecedor' },
        { id: 10, nome: 'Farmácia Popular', telefone: '+55 11 5678-9012', email: 'atendimento@farmacia.com', direcao: 'Av. J, 1000', tipo: 'Cliente' },
    ]);


    const itemsPerPage = 5;

    const handleSort = (column: keyof ClienteItem) => {
        if (sortColumn === column) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const SortIcon = ({ column }: { column: keyof ClienteItem }) => {
        if (sortColumn !== column) return <ChevronDown size={16} className="ml-1 text-gray-400" />;
        return sortDirection === 'asc'
            ? <ChevronUp size={16} className="ml-1 text-blue-500" />
            : <ChevronDown size={16} className="ml-1 text-blue-500" />;
    };

    const filtrados = clientesIniciais
        .filter(item => item.nome.toLowerCase().includes(filtroNome.toLowerCase()))
        .sort((a, b) => {
            const aVal = a[sortColumn];
            const bVal = b[sortColumn];
            return sortDirection === 'asc'
                ? String(aVal).localeCompare(String(bVal))
                : String(bVal).localeCompare(String(aVal));
        });

    const totalPages = Math.ceil(filtrados.length / itemsPerPage);
    const paginados = filtrados.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Removed mock functions for edit/delete as actions column is removed
    // const handleEditClient = (client: ClienteItem) => {
    //     toast.info(`Editando cliente: ${client.nome}`);
    //     // In a real app, this would open a modal for editing
    // };

    // const handleDeleteClient = (id: number) => {
    //     setClientToDeleteId(id);
    //     setShowDeleteConfirm(true);
    // };

    // const handleConfirmDelete = () => {
    //     if (clientToDeleteId === null) return;
    //     setClientesIniciais(prev => prev.filter(client => client.id !== clientToDeleteId));
    //     toast.success(`Cliente deletado com sucesso!`);
    //     setShowDeleteConfirm(false);
    //     setClientToDeleteId(null);
    // };


    return (
        <motion.div
            className="bg-gray-50 min-h-screen p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
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
                        {t('clients.title')}
                    </motion.h1>
                    <motion.button
                        className="bg-white text-blue-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-blue-50"
                        whileHover={{ ...subtleHoverScale, backgroundColor: "#eff6ff" }}
                        whileTap={subtleTapScale}
                        transition={subtleTransition}
                    >
                        <Plus size={18} />
                        <span className="font-medium">{t('clients.button')}</span>
                    </motion.button>
                </motion.div>

                {/* Filtro */}
                <motion.div
                    className="bg-white rounded-lg shadow-md p-6 mb-6"
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="relative md:col-span-2">
                            <input
                                type="text"
                                placeholder={t('clients.filter_name')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={filtroNome}
                                onChange={e => setFiltroNome(e.target.value)}
                            />
                        </div>
                        <div className="flex items-end">
                            <motion.button
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium flex items-center transition"
                                whileHover={{ ...subtleHoverScale, backgroundColor: "#15803d" }}
                                whileTap={subtleTapScale}
                                transition={subtleTransition}
                            >
                                <Search size={18} className="mr-2" /> {t('clients.search_button')}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Tabela */}
                <motion.div
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th onClick={() => handleSort('nome')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                <div className="flex items-center">{t('clients.name')}<SortIcon column="nome" /></div>
                            </th>
                            <th onClick={() => handleSort('telefone')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                <div className="flex items-center">{t('clients.phone')}<SortIcon column="telefone" /></div>
                            </th>
                            <th onClick={() => handleSort('email')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                <div className="flex items-center">{t('clients.email')}<SortIcon column="email" /></div>
                            </th>
                            <th onClick={() => handleSort('direcao')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                <div className="flex items-center">{t('clients.direction')}<SortIcon column="direcao" /></div>
                            </th>
                            <th onClick={() => handleSort('tipo')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                <div className="flex items-center">{t('clients.type')}<SortIcon column="tipo" /></div>
                            </th>
                            {/* Removed the actions column header */}
                            {/* <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('clients.actions')}</th> */}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {paginados.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.telefone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">{item.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.direcao}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tipo}</td>
                                {/* Removed the actions column data */}
                                {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <div className="inline-flex items-center space-x-2">
                                        <Tooltip title="Editar" arrow>
                                            <motion.div
                                                className="text-orange-500"
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.9, y: 0 }}
                                            >
                                                <IconButton
                                                    className="!bg-green-500 hover:!bg-green-600 text-white !rounded-xl"
                                                    onClick={() => handleEditClient(item)}
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
                                                    className="!bg-red-500 hover:!bg-red-600 text-white !rounded-xl"
                                                    onClick={() => handleDeleteClient(item.id)}
                                                >
                                                    <Trash2 size={18} />
                                                </IconButton>
                                            </motion.div>
                                        </Tooltip>
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </motion.div>

                {/* Paginação */}
                <motion.div
                    className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, filtrados.length)}</span> de <span className="font-medium">{filtrados.length}</span> resultados
                    </p>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Paginação">
                        <motion.button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            whileHover={subtleHoverScale}
                            whileTap={subtleTapScale}
                            transition={subtleTransition}
                        >
                            <ChevronDown className="h-5 w-5 rotate-90" />
                        </motion.button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1 ? 'bg-blue-50 text-blue-500' : 'bg-white text-gray-500'} hover:bg-gray-50`}
                                whileHover={subtleHoverScale}
                                whileTap={subtleTapScale}
                                transition={subtleTransition}
                            >
                                {i + 1}
                            </motion.button>
                        ))}
                        <motion.button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            whileHover={subtleHoverScale}
                            whileTap={subtleTapScale}
                            transition={subtleTransition}
                        >
                            <ChevronDown className="h-5 w-5 -rotate-90" />
                        </motion.button>
                    </nav>
                </motion.div>
            </div>
            <ToastContainer position="bottom-right" />
            {/* DeleteConfirmModal is no longer needed */}
            {/* <DeleteConfirmModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleConfirmDelete}
                title={t("clients.delete_confirm_title", "Confirm Deletion")}
                message={t("clients.delete_confirm_message", "Are you sure you want to delete this client? This action cannot be undone.")}
            /> */}
        </motion.div>
    );
};

export default Clientes;
