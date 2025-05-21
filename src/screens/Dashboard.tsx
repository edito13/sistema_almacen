import React, { useState, useMemo } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaBox,
  FaExchangeAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { IconButton, Tooltip } from "@mui/material";
import { ArrowDown, ArrowUp, Download, Filter } from "lucide-react";

import Api from "@/services/api";
import format from "@/utils/Format";
import Table from "@/components/Table";
import DashItem from "@/components/DashItem";

const Dashboard: React.FC = () => {
  const [itemsLoaded, setItemsLoaded] = useState(false);

  const { data: dataEntries, isLoading: isLoadingEntries } = useQuery({
    queryKey: ["entries"],
    queryFn: Api.entry.getEntries,
  });

  const { data: dataExits, isLoading: isLoadingExits } = useQuery({
    queryKey: ["exits"],
    queryFn: Api.exit.getExits,
  });

  const { data: dataMovements, isLoading: isLoadingMovements } = useQuery({
    queryKey: ["movements"],
    queryFn: Api.movement.getMovements,
    refetchOnWindowFocus: true,
  });

  const isLoading = isLoadingEntries || isLoadingExits || isLoadingMovements;

  const dashboardItems = useMemo(
    () => [
      {
        title: "Total em Stock",
        value: 100,
        color: "black",
        Icon: FaBox,
        to: "/stock",
      },
      {
        title: "Entradas de hoje",
        value: dataEntries?.length || 0,
        color: "green",
        Icon: FaAngleDoubleRight,
        to: "/entradas",
      },
      {
        title: "Saídas de hoje",
        value: dataExits?.length || 0,
        color: "red",
        Icon: FaAngleDoubleLeft,
        to: "/saidas",
      },
      {
        title: "Movimentos do mês",
        value: dataMovements?.length || 0,
        color: "blue",
        Icon: FaExchangeAlt,
        to: "/",
      },
    ],
    [dataEntries, dataExits, dataMovements]
  );

  // Animação principal do container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const columns = [
    {
      name: "",
      accessor: (item: Movement) => (
        <div className="flex items-center gap-2">
          {item.type === "entry" ? (
            <ArrowUp className="text-green-500 w-5 h-5" />
          ) : (
            <ArrowDown className="text-red-500 w-5 h-5" />
          )}
        </div>
      ),
    },
    { name: "PRODUTO", accessor: (item: Movement) => item.equipment.name },
    { name: "DETALHES", accessor: (item: Movement) => item.details },
    { name: "CONCEITO", accessor: (item: Movement) => item.concept },
    { name: "QUANTIDADE", accessor: (item: Movement) => item.quantity },
    { name: "RESPONSÁVEL", accessor: (item: Movement) => item.responsible },
    {
      name: "DATA DE MOVIMENTO",
      accessor: (item: Movement) => format.date(new Date(item.movement_date)),
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onAnimationComplete={() => setItemsLoaded(true)}
      className="pt-3"
    >
      <motion.div
        className="flex flex-wrap gap-7"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }}
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-[260px] h-[120px] bg-gray-200 rounded-lg animate-pulse"
              />
            ))
          : dashboardItems.map((item, index) => (
              <DashItem
                key={index}
                to={item.to}
                index={index}
                Icon={item.Icon}
                title={item.title}
                value={item.value}
                isLoaded={itemsLoaded}
                color={item.color as Colors}
              />
            ))}
      </motion.div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-700">
            Movimentos recentes
          </h3>
          <div className="flex space-x-2">
            <Tooltip title="Filtrar" arrow>
              <motion.button
                className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9, y: 0 }}
              >
                <IconButton>
                  <Filter size={18} />
                </IconButton>
              </motion.button>
            </Tooltip>
            <Tooltip title="Baixar movimentos" arrow>
              <motion.button
                className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9, y: 0 }}
              >
                <IconButton>
                  <Download size={18} />
                </IconButton>
              </motion.button>
            </Tooltip>
          </div>
        </div>
        <Table
          data={dataMovements || []}
          columns={columns}
          itensPorPagina={10}
        />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
