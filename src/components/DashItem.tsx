import React from "react";

interface DashItemProps {
  title: string;
  value: number;
  color: "black" | "blue" | "green" | "orange";
  Icon: React.ElementType;
}

const DashItem: React.FC<DashItemProps> = ({ title, value, color, Icon }) => {
  const colors = {
    black: "bg-black",
    blue: "bg-blue-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
  };
  return (
    <div className="flex-1 relative bg-white rounded-lg shadow-md p-4">
      <div
        className={`l-3 top-[-10px] absolute p-4 rounded-lg ${colors[color]} text-white`}
      >
        <Icon size={22} />
      </div>
      <div className="flex-1 flex justify-end">
        <div className="self-end text-right">
          <p className="text-gray-400 text-lg">{title}</p>
          <p className="text-3xl font-bold text-gray-700">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default DashItem;
