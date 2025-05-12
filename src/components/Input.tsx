import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  register: any;
  name: string;
  error?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const { type, placeholder, icon, name, error, register } = props;

  return (
    <div className="space-y-1">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500`}
          {...register(name)}
          style={{ paddingLeft: "2.5rem" }}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
