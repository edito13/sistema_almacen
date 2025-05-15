import React, { useState } from 'react';
import {Plus, Edit, X, ChevronDown, ChevronUp, Search} from 'lucide-react';

interface CodigoItem {
    id: number;
    codigo: string;
}

const Codigo: React.FC = () => {
    const [filtroCodigo, setFiltroCodigo] = useState('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<keyof CodigoItem>('codigo');
    const [currentPage, setCurrentPage] = useState(1);

    const codigosIniciais: CodigoItem[] = [
        { id: 1, codigo: 'MCA' },
        { id: 2, codigo: 'MCO' },
        { id: 3, codigo: 'EQ' },
        { id: 4, codigo: 'A01' },
        // ... outros códigos
    ];

    const itemsPerPage = 5;

    const handleSort = (column: keyof CodigoItem) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const SortIcon = ({ column }: { column: keyof CodigoItem }) => {
        if (sortColumn !== column) return <ChevronDown size={16} className="ml-1 text-gray-400" />;
        return sortDirection === 'asc'
            ? <ChevronUp size={16} className="ml-1 text-blue-500" />
            : <ChevronDown size={16} className="ml-1 text-blue-500" />;
    };

    // filtrar e ordenar
    const codigosFiltrados = codigosIniciais
        .filter(item => item.codigo.toLowerCase().includes(filtroCodigo.toLowerCase()))
        .sort((a, b) => {
            const aVal = a[sortColumn];
            const bVal = b[sortColumn];
            if (sortDirection === 'asc') return String(aVal).localeCompare(String(bVal));
            return String(bVal).localeCompare(String(aVal));
        });

    const totalPages = Math.ceil(codigosFiltrados.length / itemsPerPage);
    const paginados = codigosFiltrados.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-6 shadow-md mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">Código</h1>
                    <button className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-orange-50 transition">
                        <Plus size={18} />
                        <span className="font-medium">Novo Código</span>
                    </button>
                </div>

                {/* Filtro */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="relative md:col-span-2">
                            <input
                                type="text"
                                placeholder="Filtrar código"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                value={filtroCodigo}
                                onChange={e => setFiltroCodigo(e.target.value)}
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
                            <th
                                onClick={() => handleSort('codigo')}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            >
                                <div className="flex items-center">Código<SortIcon column="codigo" /></div>
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {paginados.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.codigo}</td>
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
                        Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, codigosFiltrados.length)}</span> de <span className="font-medium">{codigosFiltrados.length}</span> resultados
                    </p>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Paginação">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <ChevronDown className="h-5 w-5 rotate-90" />
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
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <ChevronDown className="h-5 w-5 -rotate-90" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Codigo;