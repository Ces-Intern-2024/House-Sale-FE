import React, { useEffect, useState } from 'react'
import style from './Transaction.module.scss'
import { User } from '../../types/user'
import { getProfile } from '../../service/ProfileService'
import { Button } from '@mantine/core'
import { GiCrownCoin } from 'react-icons/gi'

interface CreditComponentProps {
  setOpened: (value: boolean) => void
  shouldUpdate: boolean
}
export default function CreditComponent({
  setOpened,
  shouldUpdate,
}: CreditComponentProps) {
  const [userProfile, setUserProfile] = useState<User>()
  const getUserProfile = async () => {
    const res = await getProfile()
    setUserProfile(res)
  }
  useEffect(() => {
    getUserProfile()
  }, [shouldUpdate])

  return (
    <>
      <div className={style.creditCurrentHead}>
        <div className={style.titleText}>Current credit</div>
        <div className={style.creditCurrentRow}>
          {userProfile && (
            <span className={style.creditAmount}>
              {Number(userProfile.balance)}
            </span>
          )}
          <span className={style.creditIcon}>
            <GiCrownCoin/>
          </span>
        </div>
      </div>
      <div className={style.creditBtn}>
        <Button
          classNames={{ root: style.rootButton }}
          fullWidth
          onClick={() => setOpened(true)}
        >
          Buy Credit
        </Button>
      </div>
    </>
  )
}
