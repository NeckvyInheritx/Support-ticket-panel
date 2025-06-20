import React from 'react';
import Image from 'next/image'; // For optimized image loading in Next.js

interface AvatarProps {
  src?: string; 
  name?: string; 
  size?: 'small' | 'medium' | 'large' | 'xl'; 
  className?: string; 
}

const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'medium', className }) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-xs',   // 32px
    medium: 'w-10 h-10 text-sm', // 40px
    large: 'w-12 h-12 text-base', // 48px
    xl: 'w-16 h-16 text-lg', // 64px
  };

  // Get the selected size class, defaulting to medium if not provided or invalid
  const currentSizeClass = sizeClasses[size] || sizeClasses.medium;

  // Function to generate initials from a name
  const getInitials = (fullName?: string): string => {
    if (!fullName) return '';
    // Split the name by spaces, take the first letter of the first and last word
    const parts = fullName.split(' ').filter(Boolean); // Filter(Boolean) removes empty strings
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return '';
  };

  const initials = getInitials(name);

  return (
    <div
      className={`
        relative flex items-center justify-center
        rounded-full overflow-hidden
        bg-gray-300 text-white font-semibold
        flex-shrink-0
        ${currentSizeClass}
        ${className || ''}
      `}
    >
      {src ? (
        // If src is provided, display the image
        <Image
          src={src}
          alt={name ? `${name}'s avatar` : 'User avatar'}
          fill 
          className="object-cover" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
        />
      ) : initials ? (
        // If no src but initials are available, display initials
        <span className="select-none">{initials}</span>
      ) : (
        <svg
          className="w-2/3 h-2/3 text-gray-500"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      )}
    </div>
  );
};

export default Avatar;
