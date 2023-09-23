import { useSelector } from 'react-redux'

export const useStoreBy = (name) => {
  return useSelector(state => state[name])
}
