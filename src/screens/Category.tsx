import React, { useState } from 'react';
import { Plus, Search, Edit, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQuery } from "@tanstack/react-query";

import Table from '@/components/Table';
import Api from '@/services/api';

interface CategoryItem {
    id: number;
    codigo: string;

}

const Category: React.FC = () => {
    const { t } = useTranslation();

    const [filtroCodigo, setFiltroCodigo] = useState('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<keyof CategoryItem>('codigo');

    const { data, refetch } = useQuery({
        queryKey: ["categories"],
        queryFn: Api.category.getCategories,
    });

    const handleSort = (column: keyof CategoryItem) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    // Filtrar e ordenar
    // const codigosFiltrados = data
    //     ? data
    //         .filter((item: CategoryItem) => item.codigo.toLowerCase().includes(filtroCodigo.toLowerCase()))
    //         .sort((a: CategoryItem, b: CategoryItem) => {
    //             const aVal = a[sortColumn];
    //             const bVal = b[sortColumn];
    //             if (sortDirection === 'asc') return String(aVal).localeCompare(String(bVal));
    //             return String(bVal).localeCompare(String(aVal));
    //         })
    //     : [];

    const columns = [
        {
            name: t('category.cat'),
            accessor: (item: CategoryItem) => item.codigo,
        },
        {
            name: t('category.actions'),
            accessor: (item: CategoryItem) => (
                <div className="flex items-center space-x-2 justify-center w-full">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex items-center">
                        <Edit size={16} />
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center">
                        <X size={16} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg p-6 shadow-md mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">{t('category.title')}</h1>
                    <button className="bg-white text-blue-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-blue-50 transition">
                        <Plus size={18} />
                        <span className="font-medium">{t('category.button')}</span>
                    </button>
                </div>

                {/* Filtro */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="relative md:col-span-2">
                            <input
                                type="text"
                                placeholder={t('category.filter_category')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={filtroCodigo}
                                onChange={(e) => setFiltroCodigo(e.target.value)}
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium flex items-center transition"
                                onClick={() => refetch()}
                            >
                                <Search size={18} className="mr-2" />
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabela reutilizável */}
                <Table columns={columns} data={data || []} />
            </div>
        </div>
    );
};

export default Category;