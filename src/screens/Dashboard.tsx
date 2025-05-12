import React from "react";
import DashItem from "@/components/DashItem";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaBox,
  FaExchangeAlt,
} from "react-icons/fa";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div className="pt-3">
      <div className="flex gap-3">
        <DashItem
          title="Total em Stock"
          value={100}
          color="black"
          Icon={FaBox}
        />
        <DashItem
          title="Entradas de hoje"
          value={0}
          color="orange"
          Icon={FaAngleDoubleRight}
        />
        <DashItem
          title="Saídas de hoje"
          value={0}
          color="green"
          Icon={FaAngleDoubleLeft}
        />
        <DashItem
          title="Movimentos do mês"
          value={100}
          color="blue"
          Icon={FaExchangeAlt}
        />
      </div>
    </div>
  );
};

export default Dashboard;
