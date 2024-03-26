import React, { useEffect, useState } from 'react'
import style from './Transaction.module.scss'
import { User } from '../../types/user'
import { getProfile } from '../../service/ProfileService'
import { Button } from '@mantine/core'
import { GiCrownCoin } from 'react-icons/gi'
import UnderMaintenance from '../UnderMaintenance/UnderMaintenance'
import { getMaintenanceModeForSeller } from '../../service/MaintenanceService'

interface CreditComponentProps {
  setOpened: (value: boolean) => void
  shouldUpdate: boolean
}
export default function CreditComponent({
  setOpened,
  shouldUpdate,
}: CreditComponentProps) {
  const [userProfile, setUserProfile] = useState<User>()
  const [isUnderMaintenance, setIsUnderMaintenance] = useState(false)
  const getUserProfile = async () => {
    const res = await getProfile()
    setUserProfile(res)
  }

  const handleGetMaintenanceMode = async () => {
    try {
      const res = await getMaintenanceModeForSeller()
      setIsUnderMaintenance((_prev) => res.metaData.isMaintenance)
      // if system is not under maintenance then open modal
      if (res.metaData.isMaintenance === false) {
        setOpened(true)
      }
    } catch (error) {
      console.error(error)
    }
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
            <GiCrownCoin />
          </span>
        </div>
      </div>
      <div className={style.creditBtn}>
        <Button
          classNames={{ root: style.rootButton }}
          fullWidth
          onClick={() => {
            handleGetMaintenanceMode()
          }}
        >
          Buy Credit
        </Button>
      </div>
      <UnderMaintenance
        setStatus={setIsUnderMaintenance}
        status={isUnderMaintenance}
      />
    </>
  )
}
