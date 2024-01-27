import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

function BaseLayout() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <nav class="text-white">
          <Navbar />
        </nav>
        <div className="grid w-full h-full grid-cols-12 gap-6 px-2.5">
          <Outlet />
        </div>
        
        
      </div>
    </>
  );
}

export default BaseLayout;
