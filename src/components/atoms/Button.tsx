import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'; // Predefined style variants
  size?: 'small' | 'medium' | 'large'; // Predefined size variants
  children: React.ReactNode; // Content inside the button
}

export const Button = ({
  variant = 'primary', // Default variant
  size = 'medium',   // Default size
  children,
  className,         // Additional classes passed by user
  ...props           // Rest of the standard button props (onClick, type, disabled, etc.)
}:ButtonProps) => {
  // Base classes for all buttons
  let baseClasses = 'font-semibold rounded-lg cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out';

  // Apply variant-specific classes
  switch (variant) {
    case 'primary':
      baseClasses += ' bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
      break;
    case 'secondary':
      baseClasses += ' bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-500';
      break;
    case 'outline':
      baseClasses += ' bg-white border border-gray-400 text-gray-700 hover:bg-gray-100 focus:ring-gray-300';
      break;
    case 'danger':
      baseClasses += ' bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
  }

  // Apply size-specific classes
  switch (size) {
    case 'small':
      baseClasses += ' px-3 py-1.5 text-sm';
      break;
    case 'medium':
      baseClasses += ' px-4 py-2 text-base';
      break;
    case 'large':
      baseClasses += ' px-6 py-3 text-lg';
      break;
  }

  return (
    <button
      className={`${baseClasses} ${className || ''}`} // Combine base and custom classes
      {...props} // Spread all other HTML button props
    >
      {children}
    </button>
  );
};

export default Button;
