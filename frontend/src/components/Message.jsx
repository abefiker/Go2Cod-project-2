import React from 'react';

const Message = ({ variant = 'info', children }) => {
  const variantStyles = {
    info: 'bg-blue-100 text-blue-800 border-blue-400',
    danger: 'bg-red-100 text-red-800 border-red-400',
    success: 'bg-green-100 text-green-800 border-green-400',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-400',
  };

  return (
    <div
      className={`p-4 border rounded-md ${
        variantStyles[variant] || variantStyles.info
      }`}
    >
      {children}
    </div>
  );
};

export default Message;
