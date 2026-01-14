import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = true, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-4 px-6 rounded-lg font-bold text-lg shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantStyles = "";
  if (variant === 'primary') {
    variantStyles = "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700";
  } else if (variant === 'secondary') {
    variantStyles = "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-50";
  } else if (variant === 'success') {
    variantStyles = "bg-green-500 hover:bg-green-600 text-white animate-pulse";
  }

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${widthStyles} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-md mx-auto min-h-screen bg-white shadow-xl overflow-hidden flex flex-col">
    {children}
  </div>
);

export const ContentPadding: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-6 flex flex-col gap-6 flex-grow fade-in">
    {children}
  </div>
);

export const SelectableOption: React.FC<{
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ selected, onClick, children }) => (
  <div 
    onClick={onClick}
    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
      selected 
        ? 'border-pink-500 bg-pink-50 text-pink-900 font-semibold' 
        : 'border-gray-200 hover:border-pink-300 text-gray-700'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}>
        {selected && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
      </div>
      <span className="text-base">{children}</span>
    </div>
  </div>
);

export const Mockup: React.FC = () => (
  <div className="relative mx-auto w-48 h-64 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 flex flex-col items-center justify-center text-white border-r-4 border-b-4 border-red-800/20">
    <div className="absolute inset-2 border border-white/30 rounded flex flex-col items-center justify-center text-center p-2">
      <h3 className="font-bold text-xl uppercase leading-tight mb-2">Manual das Posições Secretas</h3>
      <div className="w-8 h-8 bg-white/20 rounded-full mb-2"></div>
      <p className="text-xs opacity-90">50 Posições</p>
    </div>
  </div>
);
