// --- START OF FILE Modal/index.tsx ---
type Customer = any
type Vehicle = any

import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../redux' // Kendi yolunuza göre ayarlayın
// store import'u genellikle doğrudan kullanılmaz, kaldırılabilir veya gerekliyse bırakılabilir
// import { store } from '../../redux';
import { closeModal, ModalType } from '../../state/modalSlice' // Kendi yolunuza göre ayarlayın
import {
  X,
  House,
  User,
  SidebarSimple,
  ChartLine,
  DiamondsFour,
  PersonSimpleRun,
  MapPin,
  Bank,
  Users,
  Folder,
  DotsThreeOutline,
  NoteBlank,
  ToggleLeft,
  Table,
  Paperclip,
  MagnifyingGlass,
  Export,
  Funnel,
  DotsThreeVertical
} from '@phosphor-icons/react' // Orijinaldeki ikonlar
import { getFormFieldsByModalType, FormFieldDefinition } from './formConfig' // Kendi yolunuza göre ayarlayın
import FormField from './FormField' // Kendi yolunuza göre ayarlayın
import {
  addCustomer,
  updateCustomer,
  addVehicle,
  updateVehicle
  // Buraya addContact, updateContact, addVendor, updateVendor importlarını ekle
} from '../../state/dataSlice' // Kendi yolunuza göre ayarlayın

const Modal: React.FC = () => {
  // State hook'ları (Orijinaldeki gibi)
  const dispatch = useAppDispatch()
  const { isOpen, type, title, data } = useAppSelector((state) => state.modal)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isToggleActive, setIsToggleActive] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({}) // Başlangıçta boş
  const [chatInput, setChatInput] = useState('') // Orijinaldeki gibi

  // --- FONKSİYONEL DÜZELTMELER ---
  const formFields = getFormFieldsByModalType(type)

  useEffect(() => {
    if (isOpen && data) {
      // Düzenleme: Redux'tan gelen veriyi formData'ya kopyala
      setFormData(data)
    } else if (isOpen && !data) {
      // Yeni ekleme: Formu temizle veya varsayılan değerleri ata
      const defaultData: Record<string, any> = {}
      formFields.forEach((field) => {
        if (field.defaultValue !== undefined) {
          defaultData[field.name] = field.defaultValue
        } else {
          // Tipine göre mantıklı bir boş değer ata (opsiyonel)
          // defaultData[field.name] = field.type === 'number' ? 0 : '';
        }
      })
      // Oluşturma tarihini otomatik ata (sadece yeni eklemede)
      if (type?.toString().includes('NEW_CUSTOMER')) {
        defaultData['olusturmaTarihi'] = new Date().toISOString().split('T')[0]
      }
      setFormData(defaultData)
    } else if (!isOpen) {
      // Modal kapalıysa formu temizle
      setFormData({})
    }
  }, [isOpen, type, data, formFields]) // Dependencies güncellendi

  const handleClose = () => {
    dispatch(closeModal())
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleChange = (
    field: FormFieldDefinition,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type, value } = e.target
    let processedValue: any = value

    // Number tipi için özel işlem
    if (type === 'number') {
      // Boş string gelirse null veya 0 ata, NaN olmasın
      processedValue = value === '' ? null : parseFloat(value)
      if (isNaN(processedValue)) processedValue = null // Geçersiz sayıysa null yap
    }
    // Checkbox tipi için (eğer eklenirse)
    // if (type === 'checkbox') {
    //   processedValue = (e.target as HTMLInputElement).checked;
    // }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: processedValue
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form Submitting with data:', formData)

    const entityId = data?.id // Düzenleme modundaki orijinal verinin ID'si

    try {
      switch (type) {
        case ModalType.NEW_CUSTOMER:
          // olusturmaTarihi zaten useEffect'te eklendi veya dataSlice hallediyor
          dispatch(addCustomer(formData as Omit<Customer, 'id'>))
          break
        case ModalType.EDIT_CUSTOMER:
          if (entityId) {
            dispatch(updateCustomer({ id: entityId, data: formData }))
          } else {
            console.error('Update Error: Customer ID not found!')
          }
          break
        case ModalType.NEW_VEHICLE:
          dispatch(addVehicle(formData as Omit<Vehicle, 'id'>))
          break
        case ModalType.EDIT_VEHICLE:
          if (entityId) {
            dispatch(updateVehicle({ id: entityId, data: formData }))
          } else {
            console.error('Update Error: Vehicle ID not found!')
          }
          break
        // --- Diğer Tipler İçin Case'ler (Contact, Vendor) ---
        // case ModalType.NEW_CONTACT: dispatch(addContact(...)); break;
        // case ModalType.EDIT_CONTACT: if (entityId) { dispatch(updateContact(...)); } break;
        // case ModalType.NEW_VENDOR: dispatch(addVendor(...)); break;
        // case ModalType.EDIT_VENDOR: if (entityId) { dispatch(updateVendor(...)); } break;
        // -----------------------------------------------
        default:
          console.warn(`Submit handler not defined for type: ${type}`)
          break
      }
      handleClose() // Başarılı olursa kapat
    } catch (error) {
      console.error('Form submission error:', error)
      // Kullanıcıya hata mesajı gösterilebilir
    }
  }

  // Orijinal renderFormField fonksiyonu (iç mantığı güncellendi)
  const fieldStil = // Orijinaldeki stil sınıfları
    'w-full px-3 py-2 placeholder:text-sm placeholder:leading-4 text-["14px"] placeholder:!font-bold placeholder:text-textGrayLight rounded-md focus:outline-none focus:ring-2 focus:ring-linkColor'
  const readOnlyFieldStil = `${fieldStil} bg-gray-100 cursor-not-allowed`

  const renderFormField = (field: FormFieldDefinition) => {
    const value = formData[field.name] ?? field.defaultValue ?? ''
    const currentFieldStyle = field.readOnly ? readOnlyFieldStil : fieldStil

    // Müşteri adı için özel durumu FormField hallediyor, burada normal render ediyoruz
    // if (field.name === 'musteriAdi') {
    //   // Bu özel durum FormField içinde handle ediliyor, burada normal input render ediyoruz
    // }

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={field.type}
            name={field.name}
            value={value ?? ''} // Null/undefined ise boş string yap
            onChange={(e) => handleChange(field, e)}
            placeholder={field.readOnly ? '' : field.placeholder || 'Boş'} // Readonly ise placeholder gösterme
            className={currentFieldStyle}
            required={field.required}
            readOnly={field.readOnly}
            step={field.type === 'number' ? 'any' : undefined}
          />
        )
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={value ?? ''}
            onChange={(e) => handleChange(field, e)}
            placeholder={field.readOnly ? '' : field.placeholder || 'Boş'}
            className={currentFieldStyle}
            rows={3} // Orijinalde 3 satırdı
            required={field.required}
            readOnly={field.readOnly}
          />
        )
      case 'select':
        return (
          <select
            name={field.name}
            value={value ?? ''}
            onChange={(e) => handleChange(field, e)}
            // Orijinaldeki select stili (biraz daha detaylı)
            className={`w-full text-sm ${
              value ? 'text-gray-700' : 'text-textGrayLight'
            } px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-linkColor  ${
              field.readOnly ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
            required={field.required}
            disabled={field.readOnly}
          >
            {/* Seçiniz seçeneğini ekleyelim */}
            <option value="" disabled={field.required}>
              Seçiniz
            </option>
            {field.options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-gray-800" // Option stili
              >
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'date':
        // Tarih formatlama (YYYY-MM-DD)
        let dateValue = ''
        if (value instanceof Date) {
          dateValue = value.toISOString().split('T')[0]
        } else if (typeof value === 'string') {
          // Eğer "dd.MM.yyyy" formatındaysa "yyyy-MM-dd"ye çevir (gerekirse)
          // const parts = value.split('.');
          // if (parts.length === 3) {
          //   dateValue = `${parts[2]}-${parts[1]}-${parts[0]}`;
          // } else {
          dateValue = value.split('T')[0] // ISO veya YYYY-MM-DD kabul et
          // }
        }

        return (
          <input
            type="date"
            name={field.name}
            value={dateValue}
            onChange={(e) => handleChange(field, e)}
            // Orijinaldeki date stili (select ile benzer)
            className={`${currentFieldStyle}  ${
              value ? 'text-gray-700' : 'text-textGrayLight'
            }`}
            required={field.required}
            readOnly={field.readOnly}
          />
        )
      default:
        return null
    }
  }

  // --- ORİJİNAL JSX YAPISI VE STİLLERİ ---
  if (!isOpen) return null // Modal kapalıysa render etme

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Karartılmış arka plan */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      {/* Modal içeriği (Orijinaldeki gibi boyutlar ve konum) */}
      <div className="fixed top-[50px] left-2 right-2 bottom-2 bg-white rounded-xl shadow-lg overflow-hidden z-10 flex flex-col">
        {' '}
        {/* flex ve flex-col eklendi */}
        {/* Modal Navbar (Orijinaldeki gibi) */}
        <div className="h-12 border-b flex items-center justify-between px-4 bg-tableBg flex-shrink-0">
          {' '}
          {/* flex-shrink-0 eklendi */}
          <div className="flex items-center gap-2 text-textGray">
            <House size={12} weight="bold" />
            <span>/</span>
            <User size={12} weight="bold" />
            <p className="text-xs font-medium font-[inter] ">{title}</p>
          </div>
          <div className="flex items-center space-x-2">
            {/* Sidebar toggle butonu FormField'a taşındı, istersen burada da kalabilir */}
            {/* <button onClick={toggleSidebar} ... > <SidebarSimple .../> </button> */}
            <button
              onClick={handleClose}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <X size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
        {/* Modal içerik (Orijinaldeki gibi flex yapı) */}
        <div className="flex flex-grow overflow-hidden">
          {' '}
          {/* flex-grow ve overflow-hidden eklendi */}
          {/* Sol taraf - Form (Orijinaldeki gibi stil ve geçişler) */}
          <div
            className={`bg-white transition-all duration-300 border-r overflow-y-auto scrollbar-hidden ${
              isSidebarOpen ? 'w-full md:w-2/5' : 'w-[48px]' // w-0 yerine w-[48px] kullanıyoruz
            }`}
          >
            {/* Sidebar kapalıyken gösterilecek toggle butonu */}
            {!isSidebarOpen && (
              <div className="h-full flex flex-col items-center pt-4">
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-md hover:bg-gray-100"
                  title="Formu Aç"
                >
                  <SidebarSimple
                    size={20}
                    className="text-gray-600"
                    weight="bold"
                  />
                </button>
              </div>
            )}

            {/* Form içeriği */}
            {isSidebarOpen && (
              <div className="p-4 h-full">
                <form onSubmit={handleSubmit}>
                  {formFields.map((field) => (
                    <FormField
                      key={field.name}
                      label={field.label}
                      icon={field.icon}
                      name={field.name}
                      onToggleSidebar={toggleSidebar} // Prop geçirildi
                    >
                      {renderFormField(field)}
                    </FormField>
                  ))}

                  {/* Butonlar (Orijinaldeki gibi) */}
                  <div className="mt-6 flex justify-end space-x-3 pt-4 border-t">
                    {' '}
                    {/* border-t eklendi */}
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 focus:outline-none" // text-sm eklendi
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-yeniEkleBtn text-white rounded-md text-sm hover:bg-purple-700 focus:outline-none" // text-sm eklendi
                    >
                      Kaydet
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          {/* Sağ taraf - Detaylar (Orijinaldeki gibi stil ve geçişler) */}
          <div
            className={`bg-white transition-all duration-300 flex flex-col overflow-hidden ${
              // bg-gray-50 eklendi, flex/flex-col/overflow
              isSidebarOpen
                ? 'w-0 md:w-3/5 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto'
                : 'w-full' // Geçişler ayarlandı
            }`}
          >
            {/* Sağ tarafın içeriği (Orijinaldeki gibi) */}
            <div className="p-4 border-b-[1px] ">
              <div className="flex items-center gap-4 p-2 overflow-x-auto scrollbar-hidden text-textGrayLight text-sm ">
                <button className="flex items-center gap-1 ">
                  <ChartLine size={16} weight="bold" />
                  <p>Akış</p>
                </button>
                <button className="flex items-center gap-1 whitespace-nowrap">
                  <DiamondsFour size={16} weight="bold" />
                  <p>Satış Fırsatları</p>
                </button>
                <button className="flex items-center gap-1 whitespace-nowrap ">
                  <PersonSimpleRun size={16} weight="bold" />
                  <p>Müşteri Ziyaretleri</p>
                </button>
                <button className="flex items-center gap-1  ">
                  <MapPin size={16} weight="bold" />
                  <p>Adres</p>
                </button>
                <button className="flex items-center gap-1  ">
                  <Bank size={16} weight="bold" />
                  <p>Banka</p>
                </button>
                <button className="flex items-center gap-1  ">
                  <Users size={16} weight="bold" />
                  <p>Kişiler</p>
                </button>
                <button className="flex items-center gap-1  ">
                  <Folder size={16} weight="bold" />
                  <p>Dosyalar</p>
                </button>
                <button className="flex items-center gap-1  ">
                  <NoteBlank size={16} weight="bold" />
                  <p>Dosyalar</p>
                </button>
              </div>
              {/* Buraya içerik eklenebilir */}
            </div>
            <div className="mt-2 px-2 globalSearch flex-shrink-0">
              {' '}
              {/* flex-shrink-0 */}
              <div className="flex items-center justify-between bg-white rounded-lg border border-text-textGrayLight">
                {/* ... Arama inputu ve butonları ... */}
                <div className="relative flex-1">
                  {' '}
                  {/* Arama */}
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlass className="h-4 w-4 text-blue-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Ara..."
                    className="w-full pl-10 pr-4 py-1 focus:outline-none text-sm rounded-lg"
                  />
                </div>
                <button className="p-1 hover:bg-ligthBg rounded-md transition-colors">
                  <Export size={16} className="text-textGrayLight mx-2" />
                </button>
                <div className="flex items-center gap-3 px-3 border-l border-gray-200">
                  {/* Odak/Filtre */}
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
                        isToggleActive ? 'text-purple-500' : 'text-textGray'
                      }`}
                    >
                      odak
                    </span>
                  </button>
                  <button className="flex items-center gap-2 text-sm text-blue-gray-400 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors">
                    {' '}
                    <Funnel size={14} className="text-textGray" />{' '}
                    <span className="whitespace-nowrap text-textGray">
                      Filtre
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* Sağ tarafın asıl içerik alanı */}
            <div className="text-textGray flex-grow overflow-y-auto p-4 scrollbar-hidden">
              {' '}
              {/* flex-grow ve overflow */}
              <p>...</p>
              <h1>İçerik girilcek</h1>
              <p>...</p>
              {/* İçerik buraya eklenebilir */}
            </div>
            {/* Chat Input (Orijinaldeki gibi en altta sabit) */}
            <div className="p-4 bg-white border-t flex-shrink-0">
              {' '}
              {/* border-t eklendi, flex-shrink-0 */}
              <div className="flex items-center gap-2 w-full">
                <div className="relative flex-1 ">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)} // onChange eklendi
                    placeholder="Bir Güncelleme Payaaş..."
                    className="w-full pl-5 pr-16 py-2 border placeholder:text-textGrayLight placeholder:text-xs border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all" // pr artırıldı
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-1">
                    {' '}
                    {/* flex ve space-x eklendi */}
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Paperclip
                        size={16}
                        weight="bold"
                        className="text-textGrayLight"
                      />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <DotsThreeOutline
                        size={16}
                        weight="bold"
                        className="text-textGrayLight"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>{' '}
          {/* Sağ taraf sonu */}
        </div>{' '}
        {/* İçerik flex sonu */}
      </div>{' '}
      {/* Modal içeriği sonu */}
    </div> // Ana div sonu
  )
}

export default Modal
// --- END OF FILE Modal/index.tsx ---
