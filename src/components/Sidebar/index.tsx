'use client'
import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../redux'
import { setIsSidebarCollapsed } from '../../state'
import { Link, useLocation } from 'react-router-dom'
import { Info, Wrench, Browser, Dot } from '@phosphor-icons/react'
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody
} from '@material-tailwind/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { routes, RouteConfig } from '../../routes/config'

const defaultEventHandlers = {
  onPointerEnterCapture: () => {},
  onPointerLeaveCapture: () => {}
}

interface RecursiveMenuProps {
  items: RouteConfig[]
  isSidebarCollapsed: boolean
  openAccordions: number[]
  handleOpen: (id: number) => void
  isLinkActive: (path: string) => boolean
  isParentActive: (paths: string[]) => boolean
}

const RecursiveMenu: React.FC<RecursiveMenuProps> = ({
  items,
  isSidebarCollapsed,
  openAccordions,
  handleOpen,
  isLinkActive,
  isParentActive
}) => {
  return (
    <>
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0
        const isOpen = openAccordions.includes(item.id)

        const childPaths = hasChildren
          ? item.children
              ?.filter((child) => child && child?.path)
              .map((child) => child?.path)
          : []

        //
        // recursive fonkisoyn aynı işlemi yapar kenıdnı tekrarlar fonksiyon mesela  a() ->>>> if a true again a() ->>>>
        // recursive menu google
        const isActive = isLinkActive(item.path) || isParentActive(childPaths)
        const Icon = item.icon

        if (hasChildren) {
          return (
            <Accordion
              key={item.id}
              open={isOpen}
              placeholder=""
              {...defaultEventHandlers}
            >
              <ListItem
                className={item.id < 10 ? 'p-0' : 'p-0 pl-4'}
                selected={isOpen}
                placeholder=""
                {...defaultEventHandlers}
              >
                <AccordionHeader
                  onClick={() => handleOpen(item.id)}
                  className="border-b-0 p-2"
                  placeholder=""
                  {...defaultEventHandlers}
                >
                  {!isSidebarCollapsed && item.id < 10 && (
                    <ListItemPrefix placeholder="" {...defaultEventHandlers}>
                      <ChevronRightIcon
                        className={`h-3 w-3 transition-transform ${
                          isOpen ? '-rotate-90' : ''
                        }`}
                      />
                    </ListItemPrefix>
                  )}

                  {Icon && (
                    <ListItemPrefix placeholder="" {...defaultEventHandlers}>
                      <Icon
                        size={16}
                        className="text-blue-gray-500"
                        weight="fill"
                      />
                    </ListItemPrefix>
                  )}

                  {!isSidebarCollapsed && (
                    <Typography
                      className={`mr-auto ${
                        item.id < 10
                          ? "text-[10px] font-['Inter'] text-blue-gray-600 font-medium"
                          : "text-[12px] font-['Inter'] text-blue-gray-600 font-medium"
                      } ${isActive ? 'text-linkColor' : ''}`}
                      placeholder=""
                      {...defaultEventHandlers}
                    >
                      {item.label}
                    </Typography>
                  )}

                  {!isSidebarCollapsed && item.id >= 10 && (
                    <ChevronRightIcon
                      className={`h-3 w-3 transition-transform ${
                        isOpen ? '-rotate-90' : ''
                      } ml-2`}
                    />
                  )}

                  {isSidebarCollapsed && item.id < 10 && (
                    <ChevronRightIcon
                      className={`h-3 w-3 transition-transform ${
                        isOpen ? '-rotate-90' : ''
                      }`}
                    />
                  )}
                </AccordionHeader>
              </ListItem>

              <AccordionBody className="py-0">
                <List className="p-0" placeholder="" {...defaultEventHandlers}>
                  {item.children &&
                    item.children.length > 0 &&
                    item.children.map((child) => {
                      if (child.children && child.children.length > 0) {
                        return (
                          <RecursiveMenu
                            key={child.id}
                            items={[child]}
                            isSidebarCollapsed={isSidebarCollapsed}
                            openAccordions={openAccordions}
                            handleOpen={handleOpen}
                            isLinkActive={isLinkActive}
                            isParentActive={isParentActive}
                          />
                        )
                      }
                      // burada child.children.length > 0 olmadığı durumda çalışacak
                      return (
                        <ListItem
                          key={child.id}
                          className={`p-0 py-1.5 text-sm ${
                            isLinkActive(child.path) ? 'bg-linkBg' : ''
                          }`}
                          placeholder=""
                          {...defaultEventHandlers}
                        >
                          <ListItemPrefix
                            placeholder=""
                            {...defaultEventHandlers}
                            className="pl-4"
                          >
                            {child.icon ? (
                              <child.icon
                                size={16}
                                className={`${
                                  isLinkActive(child.path)
                                    ? 'text-linkColor'
                                    : 'text-blue-gray-500'
                                }`}
                                weight="fill"
                              />
                            ) : (
                              <Dot size={24} className="text-blue-gray-500" />
                            )}
                          </ListItemPrefix>

                          {!isSidebarCollapsed && (
                            <Link
                              to={child.path}
                              className={`w-full text-[12px] font-['Inter'] ${
                                isLinkActive(child.path)
                                  ? 'text-linkColor font-medium'
                                  : 'text-blue-gray-600 font-medium'
                              }`}
                            >
                              {child.label}
                            </Link>
                          )}
                        </ListItem>
                      )
                    })}
                </List>
              </AccordionBody>
            </Accordion>
          )
        }
        // acılır menu basıt lınkler
        return (
          <ListItem
            key={item.id}
            className="pl-8 py-1.5"
            placeholder=""
            {...defaultEventHandlers}
          >
            <ListItemPrefix placeholder="" {...defaultEventHandlers}>
              {Icon && (
                <Icon size={16} className="text-blue-gray-600" weight="fill" />
              )}
            </ListItemPrefix>
            <Link
              to={item.path}
              className={`w-full text-[12px] font-['Inter'] text-blue-gray-600 font-medium ${
                isLinkActive(item.path)
                  ? 'text-linkColor font-medium'
                  : 'text-blue-gray-600 font-medium'
              }`}
            >
              {item.label}
            </Link>
          </ListItem>
        )
      })}
    </>
  )
}

const Sidebar = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const isSidebarCollapsed = useAppSelector(
    (state) => state.sidebar.isSidebarCollapsed
  )

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
  }

  const isLinkActive = (to: string) => {
    return location.pathname === to
  }

  const isParentActive = (routes: string[]) => {
    return routes.some((route) => location.pathname === route)
  }

  const [openAccordions, setOpenAccordions] = useState<number[]>([])

  const handleOpen = (value: number) => {
    setOpenAccordions((prevOpen) => {
      if (prevOpen.includes(value)) {
        return prevOpen.filter((item) => item !== value)
      } else {
        return [...prevOpen, value]
      }
    })
  }

  const sidebarClassNames = `fixed flex flex-col pageBg ${
    isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-72'
  } bg-pageBg transition-all duration-300 overflow-hidden h-full z-40 overflow-y-auto scrollbar-thin scrollbar-thumb-linkColor scrollbar-track-blue-gray-50 overflow-x-hidden`

  return (
    <div className={sidebarClassNames}>
      <Card
        className="h-[calc(100vh)] w-full max-w-[20rem] p-1 shadow-xl  bg-pageBg overflow-y-auto scrollbar-thin scrollbar-thumb-linkColor scrollbar-track-blue-gray-50 overflow-x-hidden"
        placeholder=""
        {...defaultEventHandlers}
      >
        {/* logo */}
        <div className="mb-1 flex items-center p-1">
          <div
            className={`${
              isSidebarCollapsed
                ? 'w-10 h-10 bg-gray-100'
                : 'w-full h-10 bg-white'
            } rounded-md flex items-center justify-start pl-3 overflow-hidden`}
          >
            <img
              src={`/assets/${
                !isSidebarCollapsed ? 'download.svg' : 'colllapse.svg'
              }`}
              alt="logo"
              className={`${
                isSidebarCollapsed ? 'w-8 h-8' : 'w-32'
              } object-contain`}
            />
          </div>
        </div>

        {/* Info Card */}
        <div className="px-1 mt-1">
          <div
            className={`w-full h-24 rounded-md bg-white flex flex-col justify-start px-1 py-1 ${
              isSidebarCollapsed ? 'hidden' : 'block'
            }`}
          >
            <div className="text-xs font-medium flex justify-between p-2 bg-gray-50">
              <span className="flex font-bold text-gray-700 items-center">
                <Wrench size={16} color="purple" />
                Satış Sonrası Hizmetler
              </span>
              <span className="ml-2 text-purple-800 font-bold bg-purple-50 rounded-md flex p-1">
                <Info size={16} className="mr-1" /> 4 Gün
              </span>
            </div>
            <div className="flex items-center relative mt-auto">
              <Search
                size={14}
                className="text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Ara..."
                className="w-full h-8 text-sm outline-none text-gray-700 placeholder:text-gray-500 focus:rounded-md border rounded-md border-gray-200 pl-8 pr-2"
              />
            </div>
          </div>
        </div>

        <List placeholder="" {...defaultEventHandlers}>
          <RecursiveMenu
            items={routes}
            isSidebarCollapsed={isSidebarCollapsed}
            openAccordions={openAccordions}
            handleOpen={handleOpen}
            isLinkActive={isLinkActive}
            isParentActive={isParentActive}
          />
        </List>

        {/* Profile Section */}
        <div className="mt-auto p-2">
          <div
            className={`flex items-center justify-between rounded-md p-2 shadow-sm ${
              !isSidebarCollapsed ? 'bg-white' : 'bg-gray-100'
            }`}
          >
            {!isSidebarCollapsed ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-ligthBg text-yeniEkleBtn font-medium rounded-full flex items-center justify-center">
                      RK
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm  text-gray-900 font-semibold">
                      Ramazan Kurnaz
                    </span>
                    <span className="text-xs text-gray-500">
                      ramazankurnaz@hotmail.com
                    </span>
                  </div>
                </div>
                <button onClick={toggleSidebar}>
                  <Browser
                    size={15}
                    weight="duotone"
                    className="text-gray-500 rotate-90"
                  />
                </button>
              </>
            ) : (
              <div className="flex flex-col">
                <div className="w-8 h-8 bg-ligthBg text-yeniEkleBtn font-medium rounded-full flex items-center justify-center cursor-pointer">
                  RK
                  <div className="bg-green-400 h-2 w-2 rounded-full relative top-2"></div>
                </div>
                <button
                  onClick={toggleSidebar}
                  className="w-full h-10 flex items-center justify-center hover:bg-ligthBg rounded-md mt-1"
                >
                  <Browser
                    size={20}
                    weight="duotone"
                    className="text-gray-500 rotate-90"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Sidebar
