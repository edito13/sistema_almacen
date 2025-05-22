import React from "react";
import { NavLink } from "react-router-dom";

interface ItemProps {
  to: string;
  label: string;
  type?: "button";
  icon: React.ElementType;
  onClick?: () => void;
}

const Item: React.FC<ItemProps> = ({ ...item }) => {
  const Icon = item.icon;

  if (item.type === "button") {
    return (
      <button
        onClick={item.onClick}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors hover:bg-gray-100"
      >
        <Icon size={20} className="text-gray-700" />
        <span className="text-gray-700">{item.label}</span>
      </button>
    );
  }

  return (
    <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
          isActive ? "bg-blue-500" : "hover:bg-gray-100"
        }`
      }
      onClick={item?.onClick}
    >
      {({ isActive }) => (
        <>
          <Icon
            size={20}
            className={isActive ? "text-white" : "text-gray-700"}
          />
          <span className={isActive ? "text-white" : "text-gray-700"}>
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default Item;
