import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider
} from 'react-redux'
import sidebarReducer from './state'
import modalReducer from './state/modalSlice'
import dataReducer from './state/dataSlice'

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    modal: modalReducer,
    data: dataReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
