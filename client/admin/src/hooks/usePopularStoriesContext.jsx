import { PopularStoriesContext } from '../context/PopularStoriesContext'
import { useContext } from 'react'

export const usePopularStoriesContext = () => {
  const context = useContext(PopularStoriesContext)
  if (!context) {
    throw Error('usePopularStoriesContext must be used inside an PopularStoriesContextProvider')
  }

  return context
}