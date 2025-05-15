import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from '../../components/DataTable'
import { User, Equals, SquaresFour, ArrowUpRight } from '@phosphor-icons/react'
import { useAppSelector } from '../../redux'

// Data interface
export interface Customer {
  musteriAdi: string
  sektor: string
  oncelik: 'Yüksek' | 'Orta' | 'Düşük'
  calisanSayisi: string
  aktifSatisFirsatlari: number
  birincilKontak: string
  olusturmaTarihi: string
}

// Örnek veri - State başlatmak için kullanılacak
export const customersData: Customer[] = [
  {
    musteriAdi: 'Ahmet Yılmaz',
    sektor: 'Teknoloji',
    oncelik: 'Yüksek',
    calisanSayisi: '51-200',
    aktifSatisFirsatlari: 5,
    birincilKontak: 'Ali Veli',
    olusturmaTarihi: '15-03-2025'
  },
  {
    musteriAdi: 'Ayşe Demir',
    sektor: 'Finans',
    oncelik: 'Orta',
    calisanSayisi: '51-200',
    aktifSatisFirsatlari: 2,
    birincilKontak: 'Fatma Can',
    olusturmaTarihi: '24-03-2025'
  }
]
const cellStyle =
  'font-medium text-blue-gray-900 font-["inter"] text-[12px]  leading-4' // Ortak stil

// Define columns for the customer table
const columns: ColumnDef<Customer, any>[] = [
  {
    accessorKey: 'musteriAdi',
    header: 'Müşteri Adı',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-linkBg flex items-center justify-center">
          <User size={14} className="text-linkColor2" />
        </div>
        <span className={cellStyle}>{row.getValue('musteriAdi')}</span>
      </div>
    ),
    enableColumnFilter: true
  },
  {
    accessorKey: 'sektor',
    header: 'Sektör',
    cell: ({ row }) => (
      <span
        className={`${cellStyle} border border-gray-400 rounded-md px-1 py-[2px]  inline-block `}
      >
        {row.getValue('sektor')}
      </span>
    ),
    enableColumnFilter: true
  },
  {
    accessorKey: 'oncelik',
    header: 'Öncelik',
    cell: ({ row }) => (
      <span
        className={
          cellStyle +
          ' px-1 py-1  inline-block bg-ligthBg rounded-md text-linkColor2'
        }
      >
        <Equals size={12} weight="bold" className=" m-1 inline-block" />
        {row.getValue(`oncelik`)}
      </span>
    ),
    enableColumnFilter: true
  },
  {
    accessorKey: 'calisanSayisi',
    header: 'Çalışan Sayısı',
    cell: ({ row }) => (
      <span className={cellStyle}>{row.getValue('calisanSayisi')}</span>
    ),
    enableColumnFilter: true
  },
  {
    accessorKey: 'aktifSatisFirsatlari',
    header: 'Aktif Satış Fırsatları',
    cell: ({ row }) => (
      <div
        className={`border border-gray-400 rounded-md px-1 flex items-center whitespace-nowrap overflow-hidden leading-4 w-max ${cellStyle} gap-1`}
      >
        <SquaresFour
          size={12}
          weight="fill"
          className="flex-shrink-0 text-linkColor rotate-45"
        />

        <span className="flex-shrink-0">
          ({row.getValue('aktifSatisFirsatlari')})
        </span>
        <span className="truncate text-gray-900">Aktif Satış Fırsatı</span>
      </div>
    ),
    enableColumnFilter: true
  },
  {
    accessorKey: 'birincilKontak',
    header: 'Birincil Kontak',
    cell: ({ row }) => (
      <span className={cellStyle}>
        <ArrowUpRight size={16} weight="bold" className=" m-1 inline-block" />
        {row.getValue('birincilKontak')}
      </span>
    ),
    enableColumnFilter: true
  },
  {
    accessorKey: 'olusturmaTarihi',
    header: 'Oluşturma Tarihi',
    cell: ({ row }) => (
      <span className={cellStyle}>{row.getValue('olusturmaTarihi')}</span>
    ),
    enableColumnFilter: true
  }
]
const CustomersPage: React.FC = () => {
  // Redux'tan müşteri verilerini al
  const customers = useAppSelector((state) => state.data.customers)

  return (
    <div className="p-2.5 h-full flex flex-col ">
      <div className="flex-grow ">
        <DataTable data={customers} columns={columns} />
      </div>
    </div>
  )
}

export default CustomersPage
