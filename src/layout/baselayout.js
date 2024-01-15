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
        <div className="flex-1 flex flex-col h-full">
          <Outlet />
        </div>
        
        
      </div>
    </>
  );
}

export default BaseLayout;
