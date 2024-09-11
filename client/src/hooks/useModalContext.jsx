import { ModalContext } from '../context/ModalContext'
import { useContext } from 'react'

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw Error('useModalContext must be used inside an ThemeContextProvider')
  }

  return context
}