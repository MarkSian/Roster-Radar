import React from 'react';

interface ButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      type="button"
      className={`btn btn-danger btn-outline-dark m-2 ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;