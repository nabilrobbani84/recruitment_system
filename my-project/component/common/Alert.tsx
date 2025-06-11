import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, CheckCircle2, XCircle, Info, X } from 'lucide-react';

// --- Definisi Varian Alert ---
const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4',
  {
    variants: {
      variant: {
        info: 'bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-500',
        success: 'bg-green-50 border-green-200 text-green-800 [&>svg]:text-green-500',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 [&>svg]:text-yellow-500',
        danger: 'bg-red-50 border-red-200 text-red-800 [&>svg]:text-red-500',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const icons = {
  info: <Info className="h-5 w-5" />,
  success: <CheckCircle2 className="h-5 w-5" />,
  warning: <AlertCircle className="h-5 w-5" />,
  danger: <XCircle className="h-5 w-5" />,
};

// --- Tipe Props ---
export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title: string;
  onClose?: () => void;
}

// --- Komponen ---
const Alert: React.FC<AlertProps> = ({ className, variant, title, children, onClose, ...props }) => {
  const IconComponent = icons[variant || 'info'];

  return (
    <div role="alert" className={alertVariants({ variant, className })} {...props}>
      {IconComponent}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 p-1 rounded-full hover:bg-black/10 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <h5 className="mb-1 font-bold tracking-tight">{title}</h5>
      <div className="text-sm">{children}</div>
    </div>
  );
};

export { Alert };