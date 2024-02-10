import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

function BaseLayout() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <nav className="text-white">
          <Navbar />
        </nav>
        <div className="px-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BaseLayout;
