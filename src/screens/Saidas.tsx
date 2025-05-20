import React from "react";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Api from "@/services/api";
import format from "@/utils/Format";
import Table from "@/components/Table";
import useModal from "@/hooks/useModal";
import ModalExit from "@/components/ModalExit";

const Saidas: React.FC = () => {
  const modalExit = useModal("exit");

  const { data, refetch } = useQuery({
    queryKey: ["exits"],
    queryFn: Api.exit.getExits,
  });

  const handleSaveExit = () => {
    console.log("dados chegaram aqui");
  };

  const columns = [
    { name: "PRODUTO", accessor: (item: Exit) => item.equipment.name },
    { name: "CONCEITO", accessor: (item: Exit) => item.concept },
    { name: "QUANTIDADE", accessor: (item: Exit) => item.quantity },
    { name: "RESPONSÁVEL", accessor: (item: Exit) => item.responsible },
    {
      name: "DATA DE SAÍDA",
      accessor: (item: Exit) => format.date(new Date(item.exit_date)),
    },
    {
      name: "DATA DE ENTREGA",
      accessor: (item: Exit) => format.date(new Date(item.exit_date)),
    },
  ];

  return (
    <div className="bg-gray-50 h-full rounded-2xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-6 shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Saídas do Almoxarifado
          </h1>
          <button
            className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-orange-50 transition"
            onClick={() => modalExit.handleOpen()}
          >
            <Plus size={18} />
            <span className="font-medium">Nova Saída</span>
          </button>
        </div>
      </div>

      {/* Tabela */}
      <Table columns={columns} data={data || []} />
      {/* <NovaSaidaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEntry}
      /> */}
      {modalExit.isOpen && <ModalExit onSave={handleSaveExit} />}
    </div>
  );
};

export default Saidas;
