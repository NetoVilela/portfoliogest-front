import React from 'react';
import { FieldValues, RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  label: string;
  name: string;
  icon: React.ReactNode;
  error: boolean;
  helperText: string;
  placeholder: string;
  classNameProps?: string;
  type?: string;
  register: (name: string, options?: RegisterOptions<FieldValues, string> | undefined) => UseFormRegisterReturn<string>
};

export default function Input({label, classNameProps, name, icon, placeholder, error, helperText, type='text', register}: Props) {
  classNameProps = classNameProps ??  'w-full sm:w-1/2 ';
  return (
    <div className={`${classNameProps} mb-2`}>
      <label className="mb-1 block text-sm font-medium text-black dark:text-white" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4.5 top-4">
          {icon}
        </span>
        <input
          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          type={type}
          {...register(name)}
          placeholder={placeholder}
        />
        {error && <p className="text-danger text-xs mt-1 font-medium"><>{helperText}</></p>}
      </div>
    </div>
  );
}
