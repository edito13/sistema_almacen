import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface DashItemProps {
  title: string;
  value: number;
  color: Colors;
  Icon: React.ElementType;
  to: string;
  index: number;
  isLoaded: boolean;
}

const DashItem: React.FC<DashItemProps> = ({
  title,
  value,
  color,
  Icon,
  index,
  to,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Mapeamento de cores
  const colors = {
    black: "bg-black",
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
  };

  // Cores do texto baseadas no hover
  const textColors = {
    black: isHovered ? "text-black" : "text-gray-700",
    blue: isHovered ? "text-blue-600" : "text-gray-700",
    green: isHovered ? "text-green-600" : "text-gray-700",
    red: isHovered ? "text-red-600" : "text-gray-700",
  };

  // Animação de contagem
  const counterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      },
    },
  };

  // Variantes para o item inteiro
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.1,
      },
    },
    hover: {
      y: -1,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  // Variantes para o ícone
  const iconVariants = {
    normal: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
        duration: 0.8,
      },
    },
  };

  return (
    <motion.a
      href={to}
      className="flex-1 relative rounded-lg"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Ícone fora da área que será cortada */}
      <motion.div
        className={`absolute top-[-12px] left-3 p-4 rounded-lg ${colors[color]} text-white z-10`}
        variants={iconVariants}
        animate={isHovered ? "hover" : "normal"}
      >
        <Icon size={22} />
      </motion.div>

      {/* Container com border-radius e overflow-hidden */}
      <div className="relative bg-white shadow-xs rounded-lg overflow-hidden p-4">
        {/* Efeito de brilho ao passar o mouse */}
        {isHovered && (
          <motion.div
            className={`absolute inset-0 ${colors[color]}`}
            style={{ opacity: 0.1, zIndex: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <div className="flex-1 flex justify-end relative z-10">
          <div className="self-end text-right">
            <motion.p
              className="text-gray-400 text-lg"
              animate={{
                y: isHovered ? -2 : 0,
                transition: { duration: 0.2 },
              }}
            >
              {title}
            </motion.p>

            <motion.p
              className={`text-3xl font-bold ${textColors[color]}`}
              variants={counterVariants}
              initial="hidden"
              animate="visible"
            >
              {value}
            </motion.p>

            <motion.div
              className={`h-1 ${colors[color]} rounded-full mt-2`}
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default DashItem;
