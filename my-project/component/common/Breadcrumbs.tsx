import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
  label: string;
  href: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-500">
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index > 0 && <ChevronRight size={16} className="text-gray-400" />}
          <Link
            href={item.href}
            className="hover:text-blue-600 hover:underline"
            aria-current={index === items.length - 1 ? 'page' : undefined}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export { Breadcrumbs };