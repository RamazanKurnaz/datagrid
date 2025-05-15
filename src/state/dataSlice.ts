// --- START OF FILE dataSlice.ts ---

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// customersData ve vehiclesData'nın düzgün import edildiğini varsayıyoruz
import { customersData } from '../pages/Customers' // Bu yolu kendi projenize göre ayarlayın
import { vehiclesData } from '../pages/Vehicles' // Bu yolu kendi projenize göre ayarlayın

// Interface'lere ID ekleyelim ve formConfig ile eşleştirelim
interface Customer {
  id: number // Benzersiz ID
  musteriAdi: string
  aciklama?: string
  kisi?: string // Bu alan formConfig'de var mıydı? Kontrol et.
  sirketTipi?: string
  grup?: string
  sınıf?: string
  sektor?: string // formConfig'de 'Sektörler' olarak geçiyor, isim eşleşmeli
  vergiNo?: string
  vergiDairesi?: string
  oncelik: 'Yüksek' | 'Orta' | 'Düşük' | '' // Boş seçeneği de ekleyelim
  calisanSayisi: string // 1-10, 11-50 etc.
  aktifSatisFirsatlari?: number // formConfig'e eklenmiş olmalı
  birincilKontak?: string // formConfig'de var mıydı? Kontrol et.
  telefon?: string
  eposta?: string
  webAdresi?: string
  olusturmaTarihi: string // Genellikle otomatik veya read-only
  [key: string]: any // Diğer olası alanlar için
}

interface Vehicle {
  id: number
  plate: string
  brand: string
  model: string
  year: number
  color: string
  status: 'available' | 'in_use' | 'maintenance' | ''
  lastService: string
  [key: string]: any
}

// Diğer tipler için Interface'ler (Contact, Vendor vb. gerekirse eklenecek)

interface DataState {
  customers: Customer[]
  vehicles: Vehicle[]
  // contacts: Contact[];
  // vendors: Vendor[];
  nextCustomerId: number // Yeni ID üretmek için sayaç
  // nextContactId: number;
  // nextVendorId: number;
  // nextVehicleId: number; // Araç için de kullanılabilir ama mevcut yapı ID üretiyor
}

// Başlangıç verisine ID ekleyerek state'i oluşturalım
let currentMaxCustomerId = 0
const initialCustomers = customersData.map((customer, index) => {
  // Gerçek veri yapınıza göre ID ataması farklı olabilir
  const existingId = (customer as any).id // Veride ID varsa onu kullan
  const id = existingId ?? index + 1
  currentMaxCustomerId = Math.max(currentMaxCustomerId, id)
  return {
    ...customer,
    id, // ID'yi ekle veya güncelle
    // Başlangıç verisindeki alan adları ile Customer interface'indeki adların eşleştiğinden emin ol
    musteriAdi: customer.musteriAdi || '',
    sektor: customer.sektor || '',
    oncelik: customer.oncelik || '',
    calisanSayisi: customer.calisanSayisi || '',
    aktifSatisFirsatlari: customer.aktifSatisFirsatlari || 0,
    birincilKontak: customer.birincilKontak || '',
    olusturmaTarihi:
      customer.olusturmaTarihi || new Date().toLocaleDateString('tr-TR')
  } as Customer // Tip güvencesi
})

// Araçlarda ID zaten vardı varsayıyoruz, yoksa benzer ID atama yapılmalı
const initialVehicles = vehiclesData.map((v) => ({
  ...v,
  id: v.id // ID'nin olduğundan emin ol
})) as Vehicle[]

const initialState: DataState = {
  customers: initialCustomers,
  vehicles: initialVehicles,
  // contacts: initialContacts,
  // vendors: initialVendors,
  nextCustomerId: currentMaxCustomerId + 1
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addCustomer: (
      state,
      action: PayloadAction<
        Omit<Customer, 'id' | 'olusturmaTarihi'> & { olusturmaTarihi?: string }
      >
    ) => {
      const newCustomer: Customer = {
        id: state.nextCustomerId, // Yeni ID ata
        olusturmaTarihi:
          action.payload.olusturmaTarihi ||
          new Date().toLocaleDateString('tr-TR'),
        // Payload'daki diğer tüm alanları al
        ...action.payload,
        // Eksik kalan veya varsayılan atanması gereken alanlar (gerekirse)
        oncelik: action.payload.oncelik || '',
        calisanSayisi: action.payload.calisanSayisi || '',
        aktifSatisFirsatlari: action.payload.aktifSatisFirsatlari || 0
      }
      state.customers.push(newCustomer)
      state.nextCustomerId++ // Sayacı artır
    },

    updateCustomer: (
      state,
      action: PayloadAction<{ id: number; data: Partial<Omit<Customer, 'id'>> }>
    ) => {
      const { id, data } = action.payload
      const index = state.customers.findIndex((c) => c.id === id)
      if (index !== -1) {
        // Mevcut müşteri verisi üzerine yeni gelen veriyi yay
        state.customers[index] = { ...state.customers[index], ...data }
      }
    },

    addVehicle: (state, action: PayloadAction<Omit<Vehicle, 'id'>>) => {
      const maxId = Math.max(0, ...state.vehicles.map((v) => v.id))
      const newVehicle: Vehicle = {
        ...action.payload,
        id: maxId + 1,
        lastService:
          action.payload.lastService || new Date().toISOString().split('T')[0],
        status: action.payload.status || '',
        year: action.payload.year || new Date().getFullYear(), // Varsayılan yıl
        color: action.payload.color || ''
      }
      state.vehicles.push(newVehicle)
    },

    updateVehicle: (
      state,
      action: PayloadAction<{ id: number; data: Partial<Omit<Vehicle, 'id'>> }>
    ) => {
      const { id, data } = action.payload
      const index = state.vehicles.findIndex((v) => v.id === id)
      if (index !== -1) {
        state.vehicles[index] = { ...state.vehicles[index], ...data }
      }
    }

    // --- Diğer Tipler İçin Reducer'lar ---
    // addContact: (state, action: PayloadAction<...>) => { ... }
    // updateContact: (state, action: PayloadAction<...>) => { ... }
    // addVendor: (state, action: PayloadAction<...>) => { ... }
    // updateVendor: (state, action: PayloadAction<...>) => { ... }
    // ------------------------------------
  }
})

export const {
  addCustomer,
  updateCustomer,
  addVehicle,
  updateVehicle /*, addContact, updateContact, ...*/
} = dataSlice.actions

export default dataSlice.reducer
// --- END OF FILE dataSlice.ts ---
