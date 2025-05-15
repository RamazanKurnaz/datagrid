import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Modal türleri için enum tanımlayalım
export enum ModalType {
  NONE = 'NONE',
  NEW_CUSTOMER = 'NEW_CUSTOMER',
  EDIT_CUSTOMER = 'EDIT_CUSTOMER',
  NEW_CONTACT = 'NEW_CONTACT',
  EDIT_CONTACT = 'EDIT_CONTACT',
  NEW_VENDOR = 'NEW_VENDOR',
  EDIT_VENDOR = 'EDIT_VENDOR',
  NEW_VEHICLE = 'NEW_VEHICLE',
  EDIT_VEHICLE = 'EDIT_VEHICLE'
  // Diğer modal türleri buraya eklenebilir
}

// Modal state için interface
interface ModalState {
  isOpen: boolean
  type: ModalType
  title: string
  data?: any // Düzenleme modunda kullanılacak veri
}

const initialState: ModalState = {
  isOpen: false,
  type: ModalType.NONE,
  title: ''
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: ModalType; title: string; data?: any }>
    ) => {
      state.isOpen = true
      state.type = action.payload.type
      state.title = action.payload.title
      state.data = action.payload.data
    },
    closeModal: (state) => {
      state.isOpen = false
      state.type = ModalType.NONE
      state.title = ''
      state.data = undefined
    }
  }
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
