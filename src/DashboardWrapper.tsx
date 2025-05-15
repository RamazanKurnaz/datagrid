'use client'

import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from './redux'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

const DashboardLayout = () => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.sidebar.isSidebarCollapsed
  )

  return (
    <div className="flex bg-pageBg text-gray-900 w-full min-h-screen">
      <Sidebar />
      <main
        className={`flex flex-col flex-1 min-w-0 ${
          isSidebarCollapsed ? 'md:pl-[64px]' : 'md:pl-[270px]'
        }`}
      >
        <div className="py-3 px-4">
          <Navbar />
        </div>

        <div className="px-4 flex-1">
          <div className="w-full h-full bg-white rounded-lg shadow-sm">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
