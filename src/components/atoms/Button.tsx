import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gold text-white py-2 px-4 rounded transition duration-300 hover:bg-gold-dark ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;