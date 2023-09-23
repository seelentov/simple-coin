import { useThisStore } from './useStoreBy'

export const useAuth = () => {
  const user = useThisStore('user')
  return !!user.id
}
