import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className,
  align = 'left',
}) => {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`${alignmentClass[align]} ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-lg leading-8 text-gray-600">{subtitle}</p>
      )}
      <div className={`mt-4 h-1 w-20 ${align === 'center' ? 'mx-auto' : ''} ${align === 'right' ? 'ml-auto' : ''} bg-blue-600 rounded`}></div>
    </div>
  );
};

export { SectionTitle };