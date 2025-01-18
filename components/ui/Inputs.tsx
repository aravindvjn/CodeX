import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "email" | "search" | "submit";
  name?: string;
  isValid?: boolean;
  placeholder?: string; 
}

const Inputs = ({ name, isValid = true, type = "text", placeholder, ...props }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="capitalize">
        {name}
      </label>
      <input
        className={`px-3 py-2 rounded bg-lightgray focus:outline-white text-white shadow-sm${
          !isValid ? "outline outline-2 bg-red-200 outline-red-600" : ""
        }`}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder || name} 
        aria-invalid={!isValid} 
        {...props}
      />
      {!isValid && <p className="text-red-600 pt-2">Please enter a valid {name}.</p>} {/* Error message */}
    </div>
  );
};

export default Inputs;