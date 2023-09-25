import { useStoreBy } from './useStoreBy'

export const useAuth = () => {
  const user = useStoreBy('user')
  return !!user.id
}
