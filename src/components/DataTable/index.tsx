import React, { useState, useEffect, useRef } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
  FilterFn,
  ColumnFiltersState
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import { Search, User } from 'lucide-react'
import {
  Table,
  DotsThreeVertical,
  ToggleLeft,
  Asterisk,
  TextAa
} from '@phosphor-icons/react'
import { useAppDispatch } from '../../redux'
import { openModal } from '../../state/modalSlice'
import { getModalTypeByPageLabel } from '../Modal/formConfig'
import { useCurrentRoute } from '../../hooks/useCurrentRoute'

// Fuzzy filter fonksiyonu
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

// Sütun ikonu döndüren yardımcı fonksiyon
const getColumnIcon = () => (
  <TextAa
    className="h-4 w-4 text-blue-gray-400 font-medium font['inter']"
    weight="thin"
  />
)

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T, any>[]
  showSearch?: boolean
}

function DataTable<T>({ data, columns, showSearch = true }: DataTableProps<T>) {
  const dispatch = useAppDispatch()
  const currentPageLabel = useCurrentRoute()
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const debouncedGlobalFilter = useDebounce(globalFilter, 200)
  const [isToggleActive, setIsToggleActive] = useState(false)
  const tableRef = useRef<HTMLTableElement>(null)

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter: debouncedGlobalFilter, columnFilters },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  const handleRowClick = (row: any) => {
    const modalType = getModalTypeByPageLabel(currentPageLabel, true) // true: düzenleme modu
    if (modalType) {
      dispatch(
        openModal({
          type: modalType,
          title: `${currentPageLabel} Düzenle`,
          data: row.original // tüm satır verisini gönderiyoruz
        })
      )
    }
  }

  // Dinamik padding ve genişlik ayarı için useEffect
  useEffect(() => {
    const adjustTable = () => {
      if (!tableRef.current) return
      const headers = tableRef.current.querySelectorAll('th')
      const tableWidth = tableRef.current.offsetWidth
      let totalContentWidth = 0

      // Her başlığın içeriğinin genişliğini hesapla
      headers.forEach((header) => {
        const contentWidth = header.scrollWidth
        totalContentWidth += contentWidth
      })

      // Eğer içerik tablodan büyükse padding’i azalt
      headers.forEach((header) => {
        const contentWidth = header.scrollWidth
        if (totalContentWidth > tableWidth) {
          const paddingReduction = Math.max(
            2,
            24 - (totalContentWidth - tableWidth) / headers.length
          )
          header.style.paddingLeft = `${paddingReduction}px`
          header.style.paddingRight = `${paddingReduction}px`
        } else {
          header.style.paddingLeft = '24px' // Varsayılan padding (px-6)
          header.style.paddingRight = '24px'
        }
        header.style.width = `${(contentWidth / totalContentWidth) * 100}%`
      })
    }

    adjustTable()
    window.addEventListener('resize', adjustTable)
    return () => window.removeEventListener('resize', adjustTable)
  }, [data, columns])

  return (
    <div className="w-full flex flex-col h-full">
      {showSearch && (
        <div className="mb-2">
          <div className="flex items-center justify-between bg-white rounded-lg border border-gray-100">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-3 text-blue-gray-400" />
              </div>
              <input
                type="text"
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Ara..."
                className="w-full pl-10 pr-4 py-1 focus:outline-none text-sm rounded-lg"
              />
            </div>
            <div className="flex items-center gap-3 px-3 border-l border-gray-200">
              <button
                onClick={() => setIsToggleActive(!isToggleActive)}
                className="text-blue-gray-400 flex items-center gap-2 p-0.5 hover:bg-gray-50 rounded-md transition-all"
              >
                <ToggleLeft
                  size={30}
                  weight="fill"
                  className={`transition-colors duration-200 ${
                    isToggleActive
                      ? 'text-linkColor rotate-180'
                      : 'text-gray-200'
                  }`}
                />
                <span
                  className={`font-normal text-sm m-auto ${
                    isToggleActive ? 'text-purple-500' : 'text-blue-gray-700'
                  }`}
                >
                  odak
                </span>
              </button>
              <div className="h-4 border-l border-gray-300"></div>
              <div className="flex items-center space-x-1 hover:bg-ligthBg rounded-md">
                <select className="text-sm text-blue-gray-400 focus:outline-none bg-transparent appearance-none pl-6 pr-8 relative">
                  <option value="table">Tablo</option>
                </select>
                <div className="pointer-events-none absolute ml-1.5">
                  <Table
                    size={12}
                    className="text-blue-gray-400"
                    weight="fill"
                  />
                </div>
              </div>
              <div className="h-4 border-l border-gray-300"></div>
              <button className="p-1 hover:bg-ligthBg rounded-md transition-colors">
                <DotsThreeVertical size={20} className="text-blue-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      <hr className="mb-4 border-gray-200" />
      <div className="overflow-x-auto flex-grow rounded-lg bg-white">
        <table ref={tableRef} className="w-full table-fixed border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, headerIndex) => (
                  <th
                    key={header.id}
                    scope="col"
                    className={`py-3 text-left font-['inter'] text-[12px] font-medium leading-[16px] text-blue-gray-600 tracking-wider bg-tableBg whitespace-nowrap border-t border-b border-gray-200 ${
                      headerIndex > 0 ? 'border-l border-gray-200' : ''
                    }`}
                  >
                    <div
                      className={`flex items-center ${
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ''
                      }`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <span className="mr-2">{getColumnIcon()}</span>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="ml-1">
                        {{
                          asc: (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          ),
                          desc: (
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          )
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
            <tr>
              {table.getHeaderGroups()[0].headers.map((header, headerIndex) => (
                <td
                  key={header.id}
                  className={`px-6 py-2 border-b border-gray-200 bg-white ${
                    headerIndex > 0 ? 'border-l border-gray-200' : ''
                  }`}
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={
                        (table
                          .getColumn(header.id)
                          ?.getFilterValue() as string) ?? ''
                      }
                      onChange={(e) =>
                        table
                          .getColumn(header.id)
                          ?.setFilterValue(e.target.value)
                      }
                      placeholder="Ara..."
                      className="w-full px-2 py-1 text-xs focus:outline-none pr-6 bg-white placeholder-gray-400"
                    />
                    <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                      <Asterisk
                        weight="light"
                        size={15}
                        className="text-blue-gray-600"
                      />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleRowClick(row)}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => {
                    const isNameColumn = cell.column.id.includes('name')
                    const isLastRow =
                      rowIndex === table.getRowModel().rows.length - 1
                    // veri stırındaki stilleri fixle
                    return (
                      <td
                        key={cell.id}
                        className={`px-2 py-2 whitespace-nowrap text-sm text-generalTextColor ${
                          !isLastRow ? 'border-b border-gray-200' : ''
                        } ${cellIndex > 0 ? 'border-l border-gray-200' : ''}`}
                      >
                        {isNameColumn ? (
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-gray-500 border-t border-gray-200"
                >
                  Veri bulunamadı
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
