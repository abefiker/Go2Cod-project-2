import React from 'react';
import { NavLink } from 'react-router-dom';
import { CiShoppingCart } from 'react-icons/ci';
import { IoIosAdd } from 'react-icons/io';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-white shadow-md z-50">
      <NavLink
        to="/"
        className="text-xl font-bold text-gray-800 hover:text-gray-600"
        aria-label="Home"
      >
        Just Shop
      </NavLink>
      <nav className="flex items-center space-x-6">
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex items-center text-lg ${
              isActive ? 'text-blue-500' : 'text-gray-800'
            } hover:text-blue-400`
          }
        >
          <CiShoppingCart className="mr-1 text-2xl" /> Cart
        </NavLink>
        <NavLink
          to="/addProduct"
          className={({ isActive }) =>
            `flex items-center text-lg ${
              isActive ? 'text-blue-500' : 'text-gray-800'
            } hover:text-blue-400`
          }
        >
          <IoIosAdd className="mr-1 text-2xl" /> Product
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
