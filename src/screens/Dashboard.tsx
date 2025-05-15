import React, { useState } from "react";
import DashItem from "@/components/DashItem";
import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaBox,
    FaExchangeAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
    // Estado para controlar se os itens já foram carregados (para animar de forma sequencial)
    const [itemsLoaded, setItemsLoaded] = useState(false);

    // Dados do dashboard
    const dashboardItems = [
        {
            title: "Total em Stock",
            value: 100,
            color: "black",
            Icon: FaBox,
        },
        {
            title: "Entradas de hoje",
            value: 0,
            color: "orange",
            Icon: FaAngleDoubleRight,
        },
        {
            title: "Saídas de hoje",
            value: 0,
            color: "green",
            Icon: FaAngleDoubleLeft,
        },
        {
            title: "Movimentos do mês",
            value: 100,
            color: "blue",
            Icon: FaExchangeAlt,
        },
    ];

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
                {dashboardItems.map((item, index) => (
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

            {/* Indicador de atividade recente - elemento extra com animação */}
            <AnimatePresence>
                {itemsLoaded && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                        className="mt-5 p-4 bg-white rounded-lg shadow-md"
                    >
                        <h3 className="text-xl font-medium text-gray-700 mb-2">Atividade Recente</h3>
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
                            className="h-1 bg-blue-500 rounded-full mb-4"
                        />
                        <p className="text-gray-500">Todos os sistemas funcionando normalmente.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Dashboard;