import { InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  onChange: (value: string) => void;
}

export const Input = ({ label, onChange, ...rest }: InputProps) => {
  return (
    <div className="relative">
      <input
        {...rest}
        onChange={(e) => onChange(e.target.value)}
        placeholder={rest.placeholder || " "}
        className="peer w-full bg-white border border-gray-300 rounded-lg px-3 pt-5 pb-1.5 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
      />
      <label className="absolute left-3 top-1.5 text-[10px] text-gray-600 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[10px] transition-all">
        {label}
      </label>
    </div>
  );
};

import { TextareaHTMLAttributes } from "react";

interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label: string;
  onChange: (value: string) => void;
}

export const Textarea = ({ label, onChange, ...rest }: TextareaProps) => {
  return (
    <div className="relative">
      <textarea
        {...rest}
        onChange={(e) => onChange(e.target.value)}
        placeholder={rest.placeholder || " "}
        className="peer w-full bg-white border border-gray-300 rounded-lg px-3 pt-5 pb-1.5 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition min-h-32"
      />
      <label className="absolute left-3 top-1.5 text-[10px] text-gray-600 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[10px] transition-all">
        {label}
      </label>
    </div>
  );
};
