import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import {useTranslation} from "react-i18next";

import Api from "@/services/api";
import useModal from "@/hooks/useModal";

import Table from "@/components/Table";
import ModalProduto from "@/components/ModalProduto";

const Produtos: React.FC = () => {
  const {t} = useTranslation();

  const [filtroProduto, setFiltroProduto] = useState("");

  const { isOpen, handleOpen, handleClose } = useModal("product");

  const { data, refetch } = useQuery({
    queryKey: ["equipments"],
    queryFn: Api.equipment.getEquipments,
  });

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
          <div className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${
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
    handleClose();
    refetch();
  };

  return (
    <div className="bg-gray-50 h-full rounded-2xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-6 shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">{t('product.title')}</h1>
          <button
            className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-orange-50 transition"
            onClick={handleOpen}
          >
            <Plus size={18} />
            <span className="font-medium">{t('product.button')}</span>
          </button>
        </div>

        {/* Filtro */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-6 max-w-[40%]">
            <input
              type="text"
              placeholder={t('product.filter_prod')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={filtroProduto}
              onChange={(e) => setFiltroProduto(e.target.value)}
            />
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium flex items-center transition">
              <Search size={18} className="mr-2" />
              Buscar
            </button>
          </div>
        </div>

        {/* Tabela */}
        <Table columns={columns} data={data || []} />
        <ToastContainer position="bottom-right" />
        {isOpen && <ModalProduto onSave={handleSaveProduct} />}
      </div>
    </div>
  );
};

export default Produtos;
