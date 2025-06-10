// src/components/common/InputField.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react'; 

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  Icon?: LucideIcon; 
  error?: string; 
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, Icon, error, type = 'text', ...props }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          )}
          <input
            id={name}
            name={name}
            type={type}
            ref={ref}
            {...props}
            className={`
              block w-full px-3 py-2 border rounded-md shadow-sm 
              focus:outline-none focus:ring-primary focus:border-primary 
              sm:text-sm
              ${Icon ? 'pl-10' : ''}
              ${error ? 'border-red-500 text-red-600 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
            `}
          />
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
export default InputField;