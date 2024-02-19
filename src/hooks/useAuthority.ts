import { useMemo } from 'react'
import { Roles } from '../types/role'

function useAuthority(userAuthority: string | null, authority: Roles[] = []) {
  const roleMatched = useMemo(() => {
    return authority.some(
      (role) => userAuthority?.toString() === role.toString().trim(),
    )
  }, [authority, userAuthority])

  return roleMatched
}

export default useAuthority
