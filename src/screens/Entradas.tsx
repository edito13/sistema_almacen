import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Plus, Search, Calendar } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Api from "@/services/api";
import format from "@/utils/Format";
import useModal from "@/hooks/useModal";

import Table from "@/components/Table";
import ModalEntry from "@/components/ModalEntry";

const Entradas: React.FC = () => {
  // Estados dos filtros
  const [origem, setOrigem] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [filtroProduto, setFiltroProduto] = useState("");
  const [responsavelEntrada, setResponsavelEntrada] = useState("");
  const [responsavelRecebimento, setResponsavelRecebimento] = useState("");

  const queryClient = useQueryClient();
  const { isOpen, handleOpen, handleClose } = useModal("entry");

  const { data, refetch } = useQuery({
    queryKey: ["entries"],
    queryFn: Api.entry.getEntries,
  });

  const handleSaveEntry = () => {
    handleClose();
    refetch();
    queryClient.invalidateQueries({ queryKey: ["equipments"] });
  };

  const columns = [
    { name: "PRODUTO", accessor: (item: Entry) => item.equipment.name },
    { name: "DETALHES", accessor: (item: Entry) => item.details },
    { name: "CONCEITO", accessor: (item: Entry) => item.concept },
    { name: "QUANTIDADE", accessor: (item: Entry) => item.quantity },
    { name: "FORNECEDOR", accessor: (item: Entry) => item.supplier },
    { name: "RESPONSÁVEL", accessor: (item: Entry) => item.responsible },
    {
      name: "DATA DE ENTRADA",
      accessor: (item: Entry) => format.date(new Date(item.entry_date)),
    },
  ];

  return (
    <div className="bg-gray-50 h-full rounded-2xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-6 shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Entradas no Almoxarifado
          </h1>

          <button
            className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-orange-50 transition"
            onClick={() => handleOpen()}
          >
            <Plus size={18} />
            <span className="font-medium">Nova Entrada</span>
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <input
              type="text"
              placeholder="Nome do produto"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={filtroProduto}
              onChange={(e) => setFiltroProduto(e.target.value)}
            />
            <input
              type="text"
              placeholder="Responsável Entrada"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={responsavelEntrada}
              onChange={(e) => setResponsavelEntrada(e.target.value)}
            />
            <input
              type="text"
              placeholder="Responsável Recebimento"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={responsavelRecebimento}
              onChange={(e) => setResponsavelRecebimento(e.target.value)}
            />
            <select
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Selecionar origem do fornecedor</option>
              <option value="nacional">Nacional</option>
              <option value="internacional">Internacional</option>
            </select>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />

            </div>
          </div>

          <div className="mt-4 flex justify-start">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium flex items-center transition duration-200">
              <Search size={18} className="mr-2" />
              Buscar
            </button>
          </div>
        </div>

        {/* Tabela */}
        <Table columns={columns} data={data || []} />
        <ToastContainer position="bottom-right" />
        {isOpen && <ModalEntry onSave={handleSaveEntry} />}
      </div>
    </div>
  );
};
export default Entradas;
