import { SettingsContext } from '../context/SettingsContext'
import { useContext } from 'react'

export const useSettingsContext = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw Error('useSettingsContext must be used inside an SettingsContextProvider')
  }

  return context
}