import { ConsentContext } from '../context/ConsentContext'
import { useContext } from 'react'

export const useConsentContext = () => {
  const context = useContext(ConsentContext)
  if (!context) {
    throw Error('useConsentContext must be used inside an ConsentContextProvider')
  }

  return context
}