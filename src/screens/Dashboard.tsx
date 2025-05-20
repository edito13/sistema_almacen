import React, { useState, useMemo } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaBox,
  FaExchangeAlt,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

import Api from "@/services/api";
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
  });

  const isLoading = isLoadingEntries || isLoadingExits || isLoadingMovements;

  const dashboardItems = useMemo(
    () => [
      {
        title: "Total em Stock",
        value: 100,
        color: "black",
        Icon: FaBox,
      },
      {
        title: "Entradas de hoje",
        value: dataEntries?.length || 0,
        color: "orange",
        Icon: FaAngleDoubleRight,
      },
      {
        title: "Saídas de hoje",
        value: dataExits?.length || 0,
        color: "green",
        Icon: FaAngleDoubleLeft,
      },
      {
        title: "Movimentos do mês",
        value: dataMovements?.length || 0,
        color: "blue",
        Icon: FaExchangeAlt,
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onAnimationComplete={() => setItemsLoaded(true)}
      className="pt-3"
    >
      <motion.div
        className="flex flex-wrap gap-3"
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
                title={item.title}
                value={item.value}
                color={item.color as "black" | "blue" | "green" | "orange"}
                Icon={item.Icon}
                index={index}
                isLoaded={itemsLoaded}
              />
            ))}
      </motion.div>

      <AnimatePresence>
        {!isLoading && itemsLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            className="mt-5 p-4 bg-white rounded-lg shadow-md"
          >
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Atividade Recente
            </h3>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
              className="h-1 bg-blue-500 rounded-full mb-4"
            />
            <p className="text-gray-500">
              Todo o sistema funcionando normalmente.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
