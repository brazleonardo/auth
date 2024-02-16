import { User } from './user'

export interface Auth extends User {
  token: string
}
