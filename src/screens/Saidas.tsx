import React from "react";
import { Plus } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {useTranslation} from "react-i18next";

import Api from "@/services/api";
import format from "@/utils/Format";
import useModal from "@/hooks/useModal";

import Table from "@/components/Table";
import ModalExit from "@/components/ModalExit";

const Saidas: React.FC = () => {
  const {t} = useTranslation();

  const queryClient = useQueryClient();
  const { isOpen, handleOpen, handleClose } = useModal("exit");

  const { data, refetch } = useQuery({
    queryKey: ["exits"],
    queryFn: Api.exit.getExits,
  });

  const handleSaveExit = () => {
    handleClose();
    refetch();
    queryClient.invalidateQueries({ queryKey: ["equipments"] });
  };

  const columns = [
    { name: t('exit.product'), accessor: (item: Exit) => item.equipment.name },
    { name: t('exit.concept'), accessor: (item: Exit) => item.concept },
    { name: t('exit.ammount'), accessor: (item: Exit) => item.quantity },
    { name: t('exit.responsible'), accessor: (item: Exit) => item.responsible },
    {
      name: t('exit.exit_date'),
      accessor: (item: Exit) => format.date(new Date(item.exit_date)),
    },
    {
      name: t('exit.entry_date'),
      accessor: (item: Exit) => format.date(new Date(item.exit_date)),
    },
  ];

  return (
    <div className="bg-gray-50 h-full rounded-2xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-6 shadow-md mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            {t('exit.title')}
          </h1>
          <button
            className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-orange-50 transition"
            onClick={() => handleOpen()}
          >
            <Plus size={18} />
            <span className="font-medium">{t('exit.button')}</span>
          </button>
        </div>
      </div>

      {/* Tabela */}
      <Table columns={columns} data={data || []} />
      <ToastContainer position="bottom-right" />
      {isOpen && <ModalExit onSave={handleSaveExit} />}
    </div>
  );
};

export default Saidas;
