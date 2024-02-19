import { Province } from './province'
import { District } from './district'
import { Ward } from './ward'
export type User = {
  address: string
  avatar: string | null
  district: District | null
  fullName: string | number | readonly string[] | undefined
  phone: string | number | readonly string[] | undefined
  province: Province | null
  role: {
    roleId: number | null
    roleName: string
  }
  street: string | null
  userId: number | undefined
  ward: Ward | null
  email: string
}
