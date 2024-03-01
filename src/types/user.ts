export interface User {
  address: string
  avatar: string | null
  districtCode: string | null
  fullName: string | number | readonly string[] | undefined
  phone: string | number | readonly string[] | undefined
  provinceCode: string | null
  roleId: number | null
  street: string | null
  userId: number | undefined
  wardCode: string | null
  email: string
  balance: number
}
