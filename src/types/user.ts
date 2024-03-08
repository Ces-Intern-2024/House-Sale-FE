export interface User {
  userId: number | undefined
  roleId: number | null
  fullName: string | number | readonly string[] | undefined
  email: string
  phone: string | number | readonly string[] | undefined
  avatar: string | null
  wardCode: string | null
  districtCode: string | null
  provinceCode: string | null
  street: string | null
  address: string
  balance: number
  isActive: boolean
  isEmailVerified: boolean
  updatedAt: string
  createdAt: string
}
