import React, { useState } from "react";
import NovaEntradaModal from "@/components/NovaEntradaModal.tsx";
import { Search, Plus, Filter, Download, Trash2, Edit, Eye, ChevronDown, ChevronUp } from "lucide-react";

interface StockProps {}

const Stock: React.FC<StockProps> = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [origin, setOrigin] = useState("");
    const [country, setCountry] = useState("");
    const [company, setCompany] = useState("");
    const [sortColumn, setSortColumn] = useState<string>("");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleSaveEntry = (data: any) => {
        console.log("Dados salvos:", data);
        // Aqui você pode adicionar a lógica para salvar os dados,
        // atualizar a tabela, enviar para API, etc.
    };

    const itemsPerPage = 5;

    // Dados fictícios para demonstração
    const stockItems = [
        { id: 1, name: "Monitor Dell 24\"", details: "P2419H LED IPS", quantity: 15, value: 899.9, provider: "Dell Computadores", status: "Disponível" },
        { id: 2, name: "Notebook HP", details: "EliteBook 840 G8", quantity: 8, value: 5399.9, provider: "HP Brasil", status: "Baixo Estoque" },
        { id: 3, name: "Mouse Logitech", details: "M170 Wireless", quantity: 25, value: 89.9, provider: "Logitech Brasil", status: "Disponível" },
        { id: 4, name: "Teclado Microsoft", details: "Wireless Desktop 900", quantity: 12, value: 199.9, provider: "Microsoft BR", status: "Disponível" },
        { id: 5, name: "Cabo HDMI", details: "2m Premium", quantity: 30, value: 29.9, provider: "MultiCabos", status: "Disponível" },
        { id: 6, name: "SSD Kingston", details: "480GB A400", quantity: 5, value: 349.9, provider: "Kingston Technology", status: "Baixo Estoque" },
    ];

    // Função de ordenação
    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    // Ícone de sort
    const SortIcon: React.FC<{ column: string }> = ({ column }) => {
        if (sortColumn !== column) return <ChevronDown size={16} className="ml-1 text-gray-400" />;
        return sortDirection === "asc" ?
            <ChevronUp size={16} className="ml-1 text-blue-500" /> :
            <ChevronDown size={16} className="ml-1 text-blue-500" />;
    };

    // Filtra pelo search, origin, country e company
    const filteredItems = stockItems
        .filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (origin === "" || item.provider.toLowerCase().includes(origin.toLowerCase())) &&
            (country === "" || item.provider.toLowerCase().includes(country.toLowerCase())) &&
            (company === "" || item.provider.toLowerCase().includes(company.toLowerCase()))
        )
        .sort((a, b) => {
            if (!sortColumn) return 0;
            const aValue = a[sortColumn as keyof typeof a];
            const bValue = b[sortColumn as keyof typeof b];
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }
            return sortDirection === 'asc'
                ? String(aValue).localeCompare(String(bValue))
                : String(bValue).localeCompare(String(aValue));
        });

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-6 shadow-md mb-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white">Produtos em Stock</h1>
                        <button className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-orange-50 transition duration-200"
                                onClick={() => setIsModalOpen(true)}>
                            <Plus size={18} />
                            <span className="font-medium">Nova Entrada</span>
                        </button>
                    </div>
                </div>

                {/* Barra de pesquisa e filtros */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar produto..."
                                className="w-full py-2 border border-gray-300 rounded-md pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            {/*<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />*/}
                        </div>

                        <select
                            value={origin}
                            onChange={e => setOrigin(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        >
                            <option value="">Selecionar origem provedor</option>
                            <option value="nacional">Nacional</option>
                            <option value="internacional">Internacional</option>
                        </select>

                        <input
                            type="text"
                            placeholder="País Provedor"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />

                        <input
                            type="text"
                            placeholder="Comércio Provedor"
                            value={company}
                            onChange={e => setCompany(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium flex items-center transition duration-200">
                            <Search size={18} className="mr-2" />
                            Buscar
                        </button>
                    </div>
                </div>

                {/* Tabela de produtos */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-4xl font-semibold text-gray-700">Inventário de Produtos</h3>
                        <div className="flex space-x-2">
                            <button className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100">
                                <Filter size={18} />
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100">
                                <Download size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th onClick={() => handleSort("name")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    <div className="flex items-center">Produto<SortIcon column="name" /></div>
                                </th>
                                <th onClick={() => handleSort("details")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    <div className="flex items-center">Detalhes<SortIcon column="details" /></div>
                                </th>
                                <th onClick={() => handleSort("quantity")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    <div className="flex items-center">Quantidade<SortIcon column="quantity" /></div>
                                </th>
                                <th onClick={() => handleSort("value")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    <div className="flex items-center">Valor Unitário<SortIcon column="value" /></div>
                                </th>
                                <th onClick={() => handleSort("provider")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    <div className="flex items-center">Provedor<SortIcon column="provider" /></div>
                                </th>
                                <th onClick={() => handleSort("status")} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                    <div className="flex items-center">Estado<SortIcon column="status" /></div>
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedItems.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.details}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {item.value.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.provider}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`${item.status === "Disponível" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"} px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>{item.status}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"><Eye size={16} /></button>
                                            <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50"><Edit size={16} /></button>
                                            <button className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginação */}
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <p className="text-sm text-gray-700">
                                Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredItems.length)}</span> de <span className="font-medium">{filteredItems.length}</span> resultados
                            </p>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Anterior</span>
                                    <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1 ? 'bg-orange-50 text-orange-500' : 'bg-white text-gray-500'} hover:bg-gray-50`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover	bg-gray-50"
                                >
                                    <span className="sr-only">Próximo</span>
                                    <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
                <NovaEntradaModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveEntry}
                />
            </div>
        </div>
    );
};

export default Stock;
