import React, { useState } from 'react';
import { Plus, Edit, X, Search, ChevronDown, ChevronUp } from 'lucide-react';
import {useTranslation} from "react-i18next";



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

    const clientesIniciais: ClienteItem[] = [
        { id: 1, nome: 'Empresa XYZ', telefone: '+55 11 1234-5678', email: 'contato@xyz.com', direcao: 'Rua A, 100', tipo: 'Fornecedor' },
        { id: 2, nome: 'Cliente ABC', telefone: '+55 21 9876-5432', email: 'vendas@abc.com', direcao: 'Av. B, 200', tipo: 'Cliente' },
        // ... mais itens
    ];

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

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg p-6 shadow-md mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">{t('clients.title')}</h1>
                    <button className="bg-white text-blue-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-blue-50 transition">
                        <Plus size={18} />
                        <span className="font-medium">{t('clients.button')}</span>
                    </button>
                </div>

                {/* Filtro */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="relative md:col-span-2">
                            <input
                                type="text"
                                placeholder={t('clients.filter_name')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={filtroNome}
                                onChange={e => setFiltroNome(e.target.value)}
                            />
                            {/*<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />*/}
                        </div>
                        <div className="flex items-end">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium flex items-center transition">
                                <Search size={18} className="mr-2" /> Buscar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabela */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('clients.actions')}</th>
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
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <div className="inline-flex items-center space-x-2">
                                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex items-center">
                                            <Edit size={16} />
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center">
                                            <X size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginação */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, filtrados.length)}</span> de <span className="font-medium">{filtrados.length}</span> resultados
                    </p>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Paginação">
                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <ChevronDown className="h-5 w-5 rotate-90" />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1 ? 'bg-blue-50 text-blue-500' : 'bg-white text-gray-500'} hover:bg-gray-50`}>{i + 1}</button>
                        ))}
                        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <ChevronDown className="h-5 w-5 -rotate-90" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Clientes;