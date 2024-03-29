import { UserNames } from '@/types/Article'

export const getUserName = (names: UserNames): string => {
  if (names.name.length) {
    return names.name
  } else if (names.id.length) {
    return names.id
  } else {
    return 'No name found'
  }
}
