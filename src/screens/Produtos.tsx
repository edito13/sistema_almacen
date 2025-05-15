import React, { useState } from 'react';
import { Plus, Search, ChevronDown, ChevronUp } from 'lucide-react';

interface ProdutoItem {
    id: number;
    produto: string;
    detalhes: string;
    codigo: string;
    familia: string;
    conjunto: string;
    subconjunto: string;
    estado: 'ACTIVO' | 'INACTIVO';
}

const Produtos: React.FC = () => {
    const [filtroProduto, setFiltroProduto] = useState('');
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    const produtosIniciais: ProdutoItem[] = [
        { id: 1, produto: 'Cabo', detalhes: 'Branco 1.5 m', codigo: 'A01', familia: 'Installs v1', conjunto: 'Cables v1', subconjunto: 'Cabo 2D', estado: 'ACTIVO' },
        // ... mais itens
    ];
    const itemsPerPage = 5;

    const handleSort = (column: keyof ProdutoItem) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const SortIcon = ({ column }: { column: keyof ProdutoItem }) => {
        if (sortColumn !== column) return <ChevronDown size={16} className="ml-1 text-gray-400" />;
        return sortDirection === 'asc'
            ? <ChevronUp size={16} className="ml-1 text-blue-500" />
            : <ChevronDown size={16} className="ml-1 text-blue-500" />;
    };

    const produtosFiltrados = produtosIniciais
        .filter(item => item.produto.toLowerCase().includes(filtroProduto.toLowerCase()))
        .sort((a, b) => {
            if (!sortColumn) return 0;
            const aVal = a[sortColumn as keyof ProdutoItem];
            const bVal = b[sortColumn as keyof ProdutoItem];
            const aStr = String(aVal);
            const bStr = String(bVal);
            return sortDirection === 'asc'
                ? aStr.localeCompare(bStr)
                : bStr.localeCompare(aStr);
        });

    const totalPages = Math.ceil(produtosFiltrados.length / itemsPerPage);
    const paginados = produtosFiltrados.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-6 shadow-md mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">Produtos</h1>
                    <button className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-orange-50 transition">
                        <Plus size={18} />
                        <span className="font-medium">Novo Produto</span>
                    </button>
                </div>

                {/* Filtro */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Nome do produto"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            value={filtroProduto}
                            onChange={e => setFiltroProduto(e.target.value)}
                        />
                        <div />
                        <div />
                        <div />
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium flex items-center transition">
                            <Search size={18} className="mr-2" />
                            Buscar
                        </button>
                    </div>
                </div>

                {/* Tabela */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th onClick={() => handleSort('produto')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                <div className="flex items-center">Produto<SortIcon column="produto" /></div>
                            </th>
                            <th onClick={() => handleSort('detalhes')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                <div className="flex items-center">Detalhes<SortIcon column="detalhes" /></div>
                            </th>
                            <th onClick={() => handleSort('codigo')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                <div className="flex items-center">Código<SortIcon column="codigo" /></div>
                            </th>
                            <th onClick={() => handleSort('familia')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                <div className="flex items-center">Família<SortIcon column="familia" /></div>
                            </th>
                            <th onClick={() => handleSort('conjunto')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                <div className="flex items-center">Conjunto<SortIcon column="conjunto" /></div>
                            </th>
                            <th onClick={() => handleSort('subconjunto')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                <div className="flex items-center">Subconjunto<SortIcon column="subconjunto" /></div>
                            </th>
                            <th onClick={() => handleSort('estado')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                                <div className="flex items-center">Estado<SortIcon column="estado" /></div>
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {paginados.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.produto}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.detalhes}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.codigo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.familia}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.conjunto}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.subconjunto}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.estado === 'ACTIVO' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.estado}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50">✓</button>
                                    <button className="text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50">✏️</button>
                                    <button className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50">✕</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginação */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, produtosFiltrados.length)}</span> de <span className="font-medium">{produtosFiltrados.length}</span> resultados
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

export default Produtos;
