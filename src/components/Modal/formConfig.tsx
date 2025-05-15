// --- START OF FILE formConfig.tsx ---

import React from 'react'
import {
  User,
  Buildings,
  Phone,
  At,
  Money,
  Building,
  Globe,
  IdentificationCard,
  DiamondsFour,
  Briefcase,
  UsersThree,
  WarningCircle,
  Selection,
  ChartBar,
  ListNumbers,
  Envelope,
  TextT,
  CalendarBlank,
  Car,
  Palette,
  ClockClockwise,
  ChartLine,
  Users,
  Info // Gerekli ikonları import et
} from '@phosphor-icons/react'
import { ModalType } from '../../state/modalSlice' // Kendi yolunuza göre ayarlayın

export interface FormFieldDefinition {
  name: string // dataSlice'daki interface ile eşleşmeli
  label: string
  icon: React.ComponentType<any>
  type: 'text' | 'textarea' | 'select' | 'date' | 'number' | 'email'
  placeholder?: string
  options?: { value: string; label: string }[]
  required?: boolean
  defaultValue?: any
  readOnly?: boolean // Okunur alanlar için
}

// Müşteri formu için alanlar (dataSlice.Customer ile uyumlu)
const customerFields: FormFieldDefinition[] = [
  {
    name: 'musteriAdi',
    label: 'Müşteri Adı',
    icon: User,
    type: 'text',
    placeholder: 'Boş',
    required: true
  },
  {
    name: 'aciklama',
    label: 'Açıklama',
    icon: Info,
    type: 'text',
    placeholder: 'Boş'
  },
  {
    name: 'kisi',
    label: 'Kişi',
    icon: User,
    type: 'text',
    placeholder: 'Boş'
  },
  {
    name: 'sirketTipi',
    label: 'Şirket Tipi',
    icon: Selection,
    type: 'select',
    options: [
      { value: '', label: 'Seçiniz' },
      { value: 'limited', label: 'Limited Şirket' },
      { value: 'anonim', label: 'Anonim Şirket' },
      { value: 'sahis', label: 'Şahıs Şirketi' }
    ]
  },
  {
    name: 'grup',
    label: 'Grup',
    icon: Selection,
    type: 'text',
    placeholder: 'Boş'
  },
  {
    name: 'sınıf',
    label: 'Sınıf',
    icon: Selection,
    type: 'text',
    placeholder: 'Boş'
  },
  {
    name: 'sektor',
    label: 'Sektörler',
    icon: DiamondsFour,
    type: 'text',
    placeholder: 'Boş'
  },
  {
    name: 'vergiNo',
    label: 'Vergi Numarası',
    icon: Money,
    type: 'text',
    placeholder: 'Boş'
  },
  {
    name: 'vergiDairesi',
    label: 'Vergi Dairesi',
    icon: Building,
    type: 'text',
    placeholder: 'Boş'
  },
  {
    name: 'oncelik',
    label: 'Öncelik',
    icon: WarningCircle,
    type: 'select',
    options: [
      { value: '', label: 'Seçiniz' },
      { value: 'Yüksek', label: 'Yüksek' },
      { value: 'Orta', label: 'Orta' },
      { value: 'Düşük', label: 'Düşük' }
    ],
    required: true // Örnek: Zorunlu alan
  },
  {
    name: 'calisanSayisi',
    label: 'Çalışan Sayısı',
    icon: Users,
    type: 'select',
    options: [
      { value: '', label: 'Seçiniz' },
      { value: '1-10', label: '1-10' },
      { value: '11-50', label: '11-50' },
      { value: '51-200', label: '51-200' },
      { value: '201-500', label: '201-500' },
      { value: '501+', label: '501+' }
    ],
    required: true // Örnek: Zorunlu alan
  },
  {
    name: 'aktifSatisFirsatlari',
    label: 'Aktif Satış Fırsatları',
    icon: ChartLine,
    type: 'number',
    placeholder: '0'
  },
  {
    name: 'birincilKontak',
    label: 'Birincil Kontak',
    icon: User,
    type: 'text',
    placeholder: 'Boş'
  },
  {
    name: 'telefon',
    label: 'Telefon',
    icon: Phone,
    type: 'text',
    placeholder: 'Boş'
  },
  {
    name: 'eposta',
    label: 'E-posta',
    icon: At,
    type: 'email',
    placeholder: 'Boş'
  },
  {
    name: 'webAdresi',
    label: 'Web Adresi',
    icon: Globe,
    type: 'text',
    placeholder: 'Boş'
  },
  {
    name: 'olusturmaTarihi',
    label: 'Oluşturma Tarihi',
    icon: CalendarBlank,
    type: 'date',
    readOnly: true
  } // Genellikle değiştirilemez
]

// Kişiler formu için alanlar (contactFields) - Gerekirse burayı da dataSlice.Contact ile uyumlu hale getir
const contactFields: FormFieldDefinition[] = [
  // ... (Mevcut alanlar)
]

// Tedarikçiler formu için alanlar (vendorFields) - Gerekirse burayı da dataSlice.Vendor ile uyumlu hale getir
const vendorFields: FormFieldDefinition[] = [
  // ... (Mevcut alanlar)
]

// Araç formu için alanlar (vehicleFields) - dataSlice.Vehicle ile uyumlu
const vehicleFields: FormFieldDefinition[] = [
  {
    name: 'plate',
    label: 'Plaka',
    icon: Car,
    type: 'text',
    placeholder: 'Araç plakasını girin',
    required: true
  },
  {
    name: 'brand',
    label: 'Marka',
    icon: Briefcase,
    type: 'text',
    placeholder: 'Araç markasını girin'
  },
  {
    name: 'model',
    label: 'Model',
    icon: Car,
    type: 'text',
    placeholder: 'Araç modelini girin'
  },
  {
    name: 'year',
    label: 'Yıl',
    icon: CalendarBlank,
    type: 'number',
    placeholder: 'Üretim yılını girin'
  },
  {
    name: 'color',
    label: 'Renk',
    icon: Palette,
    type: 'select',
    options: [
      { value: '', label: 'Seçiniz' },
      { value: 'Siyah', label: 'Siyah' },
      { value: 'Beyaz', label: 'Beyaz' },
      { value: 'Gri', label: 'Gri' },
      { value: 'Mavi', label: 'Mavi' },
      { value: 'Kırmızı', label: 'Kırmızı' }
    ]
  },
  {
    name: 'status',
    label: 'Durum',
    icon: ClockClockwise,
    type: 'select',
    options: [
      { value: '', label: 'Seçiniz' },
      { value: 'available', label: 'Müsait' },
      { value: 'in_use', label: 'Kullanımda' },
      { value: 'maintenance', label: 'Bakımda' }
    ]
  },
  {
    name: 'lastService',
    label: 'Son Bakım Tarihi',
    icon: CalendarBlank,
    type: 'date'
  }
]

// --- Fonksiyonlar aynı kalabilir ---
export const getFormFieldsByModalType = (
  type: ModalType | null // null kontrolü eklendi
): FormFieldDefinition[] => {
  if (!type) return [] // Tip yoksa boş dizi dön
  switch (type) {
    case ModalType.NEW_CUSTOMER:
    case ModalType.EDIT_CUSTOMER:
      return customerFields
    case ModalType.NEW_CONTACT:
    case ModalType.EDIT_CONTACT:
      return contactFields
    case ModalType.NEW_VENDOR:
    case ModalType.EDIT_VENDOR:
      return vendorFields
    case ModalType.NEW_VEHICLE:
    case ModalType.EDIT_VEHICLE:
      return vehicleFields
    default:
      return []
  }
}

export const getModalTypeByPageLabel = (
  pageLabel: string | undefined, // undefined kontrolü eklendi
  isEdit: boolean = false
): ModalType | null => {
  if (!pageLabel) return null // Etiket yoksa null dön
  switch (pageLabel) {
    case 'Müşteriler':
      return isEdit ? ModalType.EDIT_CUSTOMER : ModalType.NEW_CUSTOMER
    case 'Kişiler':
      return isEdit ? ModalType.EDIT_CONTACT : ModalType.NEW_CONTACT
    case 'Tedarikçiler':
      return isEdit ? ModalType.EDIT_VENDOR : ModalType.NEW_VENDOR
    case 'Araçlar':
      return isEdit ? ModalType.EDIT_VEHICLE : ModalType.NEW_VEHICLE
    default:
      return null // Veya ModalType.NONE
  }
}
// --- END OF FILE formConfig.tsx ---
