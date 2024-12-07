import React from 'react';


const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 left-0 w-full flex flex-col items-center justify-center space-y-4 py-4 bg-gray-100 text-gray-600 shadow-md z-50">
      <span className="text-sm">
        © {year} <strong>Just Shop</strong>. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
