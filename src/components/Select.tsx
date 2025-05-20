import React, { type ReactNode } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  register?: any;
  name: string;
  error?: string;
  options: Option[];
  icon?: ReactNode;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  placeholder,
  icon,
  register,
  name,
  error,
  options,
}) => {
  return (
    <div className="space-y-1">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          {icon}
        </div>
        <select
          className={`w-full border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white`}
          {...register(name)}
          style={{
            paddingLeft: icon && "2.5rem",
            height: "40px",
            fontSize: "1rem",
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Select;
