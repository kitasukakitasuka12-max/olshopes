import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full transition-all duration-300 font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-rose-600 text-white hover:bg-rose-700 shadow-lg hover:shadow-rose-300/50",
    secondary: "bg-gold-400 text-white hover:bg-gold-500 shadow-md",
    outline: "border-2 border-rose-600 text-rose-600 hover:bg-rose-50",
    ghost: "text-gray-600 hover:text-rose-600 hover:bg-rose-50/50",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};