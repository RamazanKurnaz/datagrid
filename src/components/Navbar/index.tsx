'use client'
import { useAppDispatch, useAppSelector, RootState } from '../../redux'
import { setIsSidebarCollapsed } from '../../state'
import { openModal } from '../../state/modalSlice'
import { Link } from 'react-router-dom'
import React from 'react'
import {
  MagnifyingGlass,
  CalendarBlank,
  Bell,
  Plus,
  DotsThree
} from '@phosphor-icons/react'
import { useCurrentRoute } from '../../hooks/useCurrentRoute'
import { getModalTypeByPageLabel } from '../Modal/formConfig'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const isSidebarCollapsed = useAppSelector(
    (state: RootState) => state.sidebar.isSidebarCollapsed
  )
  const currentPageLabel = useCurrentRoute()

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
  }

  const handleModal = () => {
    const modalType = getModalTypeByPageLabel(currentPageLabel)
    if (modalType) {
      dispatch(
        openModal({
          type: modalType,
          title: `${currentPageLabel}`
        })
      )
    }
  }

  return (
    <div className="flex justify-between items-center w-full mb-1 bg-pageBg">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center">
        <button className="bg-gray-100 rounded-full" onClick={toggleSidebar}>
          <DotsThree size={24} weight="bold" className="text-gray-600" />
        </button>

        <h1 className="text-lg font-semibold text-gray-800 ml-4 font-['inter']">
          {currentPageLabel} {/* Dinamik başlık */}
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-4">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div className="flex items-center gap-3 cursor-pointer">
            <button
              className="flex items-center justify-between px-2 bg-yeniEkleBtn text-white rounded-lg w-24 h-8 border-solid border-white shadow-inner"
              onClick={handleModal}
            >
              <span className="text-xs font-medium">Yeni Ekle</span>
              <Plus size={16} />
            </button>
          </div>
        </div>
        <Link to="/settings">
          <MagnifyingGlass size={16} className="text-gray-600" />
        </Link>
        <div className="flex items-center gap-3 cursor-pointer">
          <Bell size={16} className="text-gray-600" />
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <CalendarBlank size={16} className="text-gray-600" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
