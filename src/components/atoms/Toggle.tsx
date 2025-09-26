import React from 'react';

interface ToggleProps {
  isActive: boolean;
  onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ isActive, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-between p-2 rounded-lg transition-colors duration-300 ${isActive ? 'bg-yellow-500' : 'bg-gray-300'}`}
    >
      <span className="text-white">{isActive ? 'On' : 'Off'}</span>
      <span className={`w-4 h-4 rounded-full transition-transform duration-300 ${isActive ? 'transform translate-x-4 bg-white' : 'bg-gray-600'}`} />
    </button>
  );
};

export default Toggle;