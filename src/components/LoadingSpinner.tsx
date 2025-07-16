import * as React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'red-500',
  className = ''
}) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div 
        className={`animate-spin rounded-full border-b-2 border-${color} ${sizeClasses[size]} ${className}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner; 