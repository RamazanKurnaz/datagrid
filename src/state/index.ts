import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SidebarState {
  isSidebarCollapsed: boolean
}

const initialState: SidebarState = {
  isSidebarCollapsed: false
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload
    }
  }
})

export const { setIsSidebarCollapsed } = sidebarSlice.actions
export default sidebarSlice.reducer
