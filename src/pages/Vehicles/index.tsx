import React from 'react'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from '../../components/DataTable'
import { useAppSelector } from '../../redux'

// Define the Vehicle type
export interface Vehicle {
  id: number
  plate: string
  brand: string
  model: string
  year: number
  color: string
  status: 'available' | 'in_use' | 'maintenance'
  lastService: string
}

// Sample vehicle data
export const vehiclesData: Vehicle[] = [
  {
    id: 1,
    plate: '34 ABC 123',
    brand: 'Mercedes',
    model: 'E200',
    year: 2022,
    color: 'Siyah',
    status: 'available',
    lastService: '2024-01-15'
  },
  {
    id: 2,
    plate: '06 XYZ 456',
    brand: 'BMW',
    model: '520i',
    year: 2021,
    color: 'Beyaz',
    status: 'in_use',
    lastService: '2023-12-10'
  },
  {
    id: 3,
    plate: '35 DEF 789',
    brand: 'Audi',
    model: 'A6',
    year: 2023,
    color: 'Gri',
    status: 'available',
    lastService: '2024-02-20'
  },
  {
    id: 4,
    plate: '01 GHI 012',
    brand: 'Volkswagen',
    model: 'Passat',
    year: 2020,
    color: 'Mavi',
    status: 'maintenance',
    lastService: '2024-03-01'
  },
  {
    id: 5,
    plate: '16 JKL 345',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2021,
    color: 'Kırmızı',
    status: 'in_use',
    lastService: '2023-11-25'
  },
  {
    id: 6,
    plate: '34 MNO 678',
    brand: 'Honda',
    model: 'Civic',
    year: 2022,
    color: 'Gri',
    status: 'available',
    lastService: '2024-02-05'
  },
  {
    id: 7,
    plate: '07 PQR 901',
    brand: 'Renault',
    model: 'Megane',
    year: 2020,
    color: 'Beyaz',
    status: 'maintenance',
    lastService: '2024-01-30'
  },
  {
    id: 8,
    plate: '34 STU 234',
    brand: 'Ford',
    model: 'Focus',
    year: 2021,
    color: 'Mavi',
    status: 'in_use',
    lastService: '2023-12-22'
  }
]

// Define columns for the vehicle table
const columns: ColumnDef<Vehicle, any>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span>#{row.getValue('id')}</span>,
    enableColumnFilter: true
  },
  {
    accessorKey: 'plate',
    header: 'Plaka',
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">{row.getValue('plate')}</span>
    ),
    enableColumnFilter: true
  },
  {
    accessorKey: 'brand',
    header: 'Marka',
    enableColumnFilter: true
  },
  {
    accessorKey: 'model',
    header: 'Model',
    enableColumnFilter: true
  },
  {
    accessorKey: 'year',
    header: 'Yıl',
    enableColumnFilter: true
  },
  {
    accessorKey: 'color',
    header: 'Renk',
    cell: ({ row }) => {
      const color = row.getValue('color') as string
      return (
        <div className="flex items-center">
          <div
            className="w-4 h-4 rounded-full mr-2"
            style={{
              backgroundColor: getColorCode(color),
              border: '1px solid #e2e8f0'
            }}
          ></div>
          {color}
        </div>
      )
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'status',
    header: 'Durum',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      let statusText = ''
      let statusClass = ''

      switch (status) {
        case 'available':
          statusText = 'Müsait'
          statusClass = 'bg-green-100 text-green-800'
          break
        case 'in_use':
          statusText = 'Kullanımda'
          statusClass = 'bg-blue-100 text-blue-800'
          break
        case 'maintenance':
          statusText = 'Bakımda'
          statusClass = 'bg-yellow-100 text-yellow-800'
          break
        default:
          statusText = status
          statusClass = 'bg-gray-100 text-gray-800'
      }

      return (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${statusClass}`}
        >
          {statusText}
        </span>
      )
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'lastService',
    header: 'Son Bakım',
    cell: ({ row }) => {
      const date = new Date(row.getValue('lastService'))
      return date.toLocaleDateString('tr-TR')
    },
    enableColumnFilter: true
  }
]

// Helper function to convert color names to color codes
const getColorCode = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    Siyah: '#000000',
    Beyaz: '#FFFFFF',
    Gri: '#808080',
    Mavi: '#0000FF',
    Kırmızı: '#FF0000'
  }

  return colorMap[colorName] || '#CCCCCC'
}

const VehiclesPage: React.FC = () => {
  // Redux'tan araç verilerini al
  const vehicles = useAppSelector((state) => state.data.vehicles)

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Araçlar</h1>
        <p className="text-gray-500 mt-1">
          Tüm araçları görüntüleyin ve yönetin
        </p>
      </div>

      <div className="flex-grow">
        <DataTable data={vehicles} columns={columns} />
      </div>
    </div>
  )
}

export default VehiclesPage
