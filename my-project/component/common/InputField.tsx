import React, { InputHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';

// --- Definisi Varian Input ---
const inputStyles = cva(
  'flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  {
    variants: {
      hasError: {
        true: 'border-red-500 focus:ring-red-500',
      },
    },
  }
);

// --- Tipe Props ---
export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

// --- Komponen ---
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, id, error, icon, containerClassName, ...props }, ref) => {
    const inputId = id || props.name; // Gunakan id atau name untuk htmlFor

    return (
      <div className={`w-full ${containerClassName}`}>
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {React.cloneElement(icon as React.ReactElement, {
                className: 'h-5 w-5 text-gray-400',
              })}
            </div>
          )}
          <input
            id={inputId}
            className={`${inputStyles({ hasError: !!error })} ${icon ? 'pl-10' : ''} ${className}`}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export { InputField };