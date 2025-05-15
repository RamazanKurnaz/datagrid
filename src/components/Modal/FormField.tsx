// --- START OF FILE FormField.tsx ---

import React from 'react' // useState import'u kaldırıldı, gerekmiyordu
import { IconProps } from '@phosphor-icons/react'
import { SidebarSimple } from '@phosphor-icons/react' // ToggleLeft kaldırıldı

interface FormFieldProps {
  label: string
  icon: React.ComponentType<IconProps>
  children: React.ReactNode
  name: string
  onToggleSidebar?: () => void // Orijinaldeki gibi geri eklendi
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  icon: Icon,
  children,
  name,
  onToggleSidebar // Prop olarak alındı
}) => {
  const isCustomerName = name === 'musteriAdi'

  // Müşteri adı alanı için orijinaldeki özel stil ve yapı
  if (isCustomerName) {
    return (
      <div className="relative mb-6">
        {/* Toggle butonu (Orijinaldeki gibi) */}
        <div className="absolute -top-3 right-6">
          <button
            onClick={onToggleSidebar} // Prop kullanıldı
            className="p-2 rounded-md hover:bg-gray-100"
            type="button" // Form submit etmesini engelle
          >
            <SidebarSimple
              size={20}
              className=" text-textGrayLight "
              weight="bold"
            />
          </button>
        </div>

        {/* Sol border (Orijinaldeki gibi) */}
        <div className="absolute left-0 h-full w-1 bg-linkColor2 rounded-full" />

        {/* Ana içerik (Orijinaldeki gibi) */}
        <div className="pl-6 flex flex-col gap-2">
          {/* Label kısmı (Orijinaldeki gibi) */}
          <div className="flex items-center gap-2">
            {/* Icon direkt gösterilmiyor, sadece label var */}
            <div className="flex flex-col">
              <span className="text-xl text-textGrayLight font-medium placeholder:text-xl">
                #{/* ID buraya gelebilir mi? data'dan alınabilir */}
              </span>
            </div>
          </div>

          {/* Input yerine orijinaldeki yapı içinde children'ı render et */}
          {/* Orijinalde sadece placeholder input vardı, şimdi gerçek input'u (children) buraya koyuyoruz */}
          <div className="w-full">
            {' '}
            {/* Input'un tam genişlikte olması için div */}
            {children}
          </div>
        </div>
      </div>
    )
  }

  // Diğer form alanları için orijinaldeki standart görünüm
  return (
    <div className="flex items-start py-2 border-b border-gray-200 last:border-b-0">
      {' '}
      {/* last:border-b-0 eklendi */}
      <div className="w-1/3 flex items-center pr-2">
        {' '}
        {/* Stil ayarı */}
        <Icon
          size={14}
          className="text-textGrayLight mr-2 flex-shrink-0 "
        />{' '}
        {/* Stil ayarı */}
        <span className="text-sm  font-medium text-gray-700 truncate">
          {label}
        </span>{' '}
        {/* Stil ayarı */}
      </div>
      <div className="w-2/3">{children}</div>
    </div>
  )
}

export default FormField
// --- END OF FILE FormField.tsx ---
