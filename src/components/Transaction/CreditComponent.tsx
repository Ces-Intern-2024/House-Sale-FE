import React, { useState } from 'react'
import style from './Transaction.module.scss'
import { User } from '../../types/user'
import { Button } from '@mantine/core'
import { GiCrownCoin } from 'react-icons/gi'
import UnderMaintenance from '../UnderMaintenance/UnderMaintenance'
import { getMaintenanceModeForSeller } from '../../service/MaintenanceService'

interface CreditComponentProps {
  setOpened: (value: boolean) => void
  userProfile?: User
}
export default function CreditComponent({
  setOpened,
  userProfile,
}: CreditComponentProps) {
  const [isUnderMaintenance, setIsUnderMaintenance] = useState(false)
  const [maintenanceMessage, setMaintenanceMessage] = useState('')

  const handleGetMaintenanceMode = async () => {
    try {
      const res = await getMaintenanceModeForSeller()
      setIsUnderMaintenance((_prev) => res.metaData.isMaintenance)
      setMaintenanceMessage((_prev) => res.metaData.description)
      // if system is not under maintenance then open modal
      if (res.metaData.isMaintenance === false) {
        setOpened(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

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
        maintenanceMessage={maintenanceMessage}
      />
    </>
  )
}
