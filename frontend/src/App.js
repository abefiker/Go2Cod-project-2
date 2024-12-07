import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className="pt-16 pb-16 bg-gray-50 min-h-screen">
        {/* pt-16 adds padding to account for the header height */}
        {/* pb-16 adds padding to account for the footer height */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
