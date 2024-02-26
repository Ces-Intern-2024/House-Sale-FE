export interface User {
  address: string
  avatar: string | null
  districtCode: string | null
  fullName: string | number | readonly string[] | undefined
  phone: string | number | readonly string[] | undefined
  provinceCode: string | null
  // role: {
  //   roleId: number | null
  //   roleName: string
  // }
  roleId: number | null
  street: string | null
  userId: number | undefined
  wardCode: string | null
  email: string
  balance: string
}
