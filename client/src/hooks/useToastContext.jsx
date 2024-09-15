import { ToastContext } from '../context/ToastContext'
import { useContext } from 'react'

export const useToastContext = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw Error('useToastContext must be used inside an ToastContextProvider')
  }
  return context
}