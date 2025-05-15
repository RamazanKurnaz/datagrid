import {
  Info,
  Wrench,
  Users,
  Cube,
  Car,
  Lifebuoy,
  UserGear,
  Hammer,
  ChartDonut,
  Factory,
  UsersThree
} from '@phosphor-icons/react'
import { IconProps } from '@phosphor-icons/react'
import React from 'react'

export interface RouteConfig {
  id: number
  path: string
  label: string
  icon?: React.ComponentType<IconProps>
  children?: RouteConfig[]
}

export const routes: RouteConfig[] = [
  {
    id: 1,
    path: '/',
    label: 'ORTAK',
    children: [
      {
        id: 11,
        path: '/customers',
        label: 'Taraflar',
        icon: Users,
        children: [
          { id: 111, path: '/customers', label: 'Müşteriler' },
          { id: 112, path: '/contacts', label: 'Kişiler' },
          { id: 113, path: '/vendors', label: 'Tedarikçiler' }
        ]
      },
      {
        id: 12,
        path: '/item-list',
        label: 'Ürünler',
        icon: Cube,
        children: [
          { id: 121, path: '/item-list', label: 'Malzemeler' },
          { id: 122, path: '/service-list', label: 'Hizmetler' },
          { id: 123, path: '/categories', label: 'Ürün Kategorileri' },
          { id: 124, path: '/itemgroup', label: 'Ürün Kitleri' }
        ]
      },
      {
        id: 13,
        path: '/institutional-assets',
        label: 'Şirketim',
        icon: Factory,
        children: [
          {
            id: 131,
            path: '/institutional-assets',
            label: 'Kurumsal Varlık Yönetimi'
          },
          { id: 132, path: '/notes', label: 'Notlar' },
          { id: 133, path: '/uniss', label: 'Birim' }
        ]
      }
    ]
  },
  {
    id: 2,
    path: '/technical-service',
    label: 'SATIŞ SONRASI HİZMETLER',
    children: [
      {
        id: 21,
        path: '/technical-service/overview',
        label: 'Genel Bakış',
        icon: ChartDonut
      },
      {
        id: 22,
        path: '/technical-service/technical-team-management',
        label: 'Teknik Ekip Yönetimi',
        icon: UsersThree
      },
      {
        id: 23,
        path: '/technical-service/customer-asset-management',
        label: 'Müşteri Varlık Yönetimi',
        icon: UserGear
      },
      {
        id: 24,
        path: '/technical-service/service-management',
        label: 'Servis Yönetimi',
        icon: Lifebuoy
      },
      {
        id: 25,
        path: '/technical-service/maintenance',
        label: 'Bakım Yönetimi',
        icon: Wrench
      },
      {
        id: 26,
        path: '/technical-service/car-management',
        label: 'Araç Yönetimi',
        icon: Car
      },
      {
        id: 27,
        path: '/technical-service/warranty-trackings',
        label: 'Garanti Takibi',
        icon: Hammer
      }
    ]
  }
]
