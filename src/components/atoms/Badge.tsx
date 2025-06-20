import React from 'react';

type BadgeVariant = 'default' | 'open' | 'in-progress' | 'resolved' | 'closed' | 'low-priority' | 'medium-priority' | 'high-priority' | 'urgent-priority' | 'category';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  className?: string; // Additional classes for custom styling
}

export const Badge = ({ text, variant = 'default', className = '' }: BadgeProps) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

  const variantStyles: Record<BadgeVariant, string> = {
    'default': 'bg-gray-100 text-gray-800',
    'open': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'resolved': 'bg-green-100 text-green-800',
    'closed': 'bg-gray-200 text-gray-700',
    'low-priority': 'bg-green-100 text-green-800',
    'medium-priority': 'bg-yellow-100 text-yellow-800',
    'high-priority': 'bg-red-100 text-red-800',
    'urgent-priority': 'bg-purple-100 text-purple-800',
    'category': 'bg-indigo-100 text-indigo-800',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {text}
    </span>
  );
};
