import React from "react";
import { NavLink } from "react-router-dom";

interface ItemProps {
  label: string;
  to: string;
  icon: React.ElementType;
}

const Item: React.FC<ItemProps> = ({ ...item }) => {
  const Icon = item.icon;

  return (
    <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
          isActive ? "bg-orange-500" : "hover:bg-gray-100"
        }`
      }
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
