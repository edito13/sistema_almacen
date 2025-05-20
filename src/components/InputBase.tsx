import React, { forwardRef } from "react";

interface InputBaseProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  register: any;
  name: string;
  error?: string;
}

const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  ({ name, icon, error, register, ...rest }, ref) => (
    <div className="space-y-1">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          {icon}
        </div>
        <input
          {...rest}
          ref={ref}
          className={`w-full border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`}
          {...register(name)}
          style={{
            paddingLeft: icon && "2.5rem",
            height: "40px",
            fontSize: "1rem",
          }}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
);
export default InputBase;
