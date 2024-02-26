import { useMemo } from 'react'
import { Roles } from '../types/role'
import isEmpty from 'lodash/isEmpty'

function useAuthority(
  userAuthority: string | null, 
  authority: Roles[] = [],
  emptyCheck = false,
  ) {
  const roleMatched = useMemo(() => {
    return authority.some(
      (role) => userAuthority?.toString() === role.toString().trim(),
    )
  }, [authority, userAuthority])


   if (
    isEmpty(authority) ||
    isEmpty(userAuthority) ||
    typeof authority === 'undefined'
  ) {
    return !emptyCheck
  }

  return roleMatched
}

export default useAuthority
