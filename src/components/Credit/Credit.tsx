import React, { useEffect, useState } from 'react'
import style from './Credit.module.scss'
import { BsCoin } from 'react-icons/bs'
import { IoIosNotifications } from 'react-icons/io'
import Button from '../CustomButton/ButtonCustom'
import { getTransactionService } from '../../service/SellerService'
import {
  formatDate,
  formatMoney,
  sortTransactionsByDate,
} from '../../utils/commonFunctions'
import { getProfile } from '../../service/ProfileService'
import { User } from '@/types/user'
import { HistoryTransaction } from '@/types/historyTransaction'

const Credit = () => {
  const [userProfile, setUserProfile] = useState<User>()
  const [histories, setHistories] = useState<HistoryTransaction[]>([])
  const getTransaction = async () => {
    const res = await getTransactionService()
    const resultDate = [
      ...res.depositTransactions.transactions,
      ...res.expenseTransactions.transactions,
    ]
    setHistories(sortTransactionsByDate(resultDate))
    return res
  }

  const getUserProfile = async () => {
    const res = await getProfile()
    setUserProfile(res)
  }
  useEffect(() => {
    getTransaction()
    getUserProfile()
  }, [])

  return (
    <div className={style.creditContainer}>
      <div className={style.creditContent}>
        <div className={style.creditNoti}>
          <div className={style.title}>
            <span className={style.titleText}>Transaction history</span>
            <span className={style.titleIcon}>
              <IoIosNotifications />
            </span>
          </div>
          <div className={style.detailNoti}>
            {histories.length > 0 ? (
              histories.map((history, index) => (
                <div key={index} className={style.row}>
                  <div className={style.date}>
                    {formatDate(history.createdAt)}
                  </div>
                  <div className={style.content}>
                    {history.description
                      ? 'You have used'
                      : 'You have deposited into your account'}
                  </div>
                  <div className={style.quantity}>
                    <span className={style.symbol}>
                      {history.description ? '-' : '+'}
                    </span>
                    <span className={style.money}>{history.amount}</span>
                    <span className={style.icon}>
                      <BsCoin />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div>You have not made any transactions yet.</div>
            )}
          </div>
        </div>
        <div className={style.creditCurrent}>
          <div className={style.creditCurrentHead}>
            <div className={style.titleText}>Current credit</div>
            <div className={style.creditCurrentRow}>
              {userProfile && (
                <span className={style.creditAmount}>
                  {formatMoney(userProfile.balance)}
                </span>
              )}
              <span className={style.creditIcon}>
                <BsCoin />
              </span>
            </div>
          </div>
          <div className={style.creditBtn}>
            <Button
              classNames={{ root: style.rootButton }}
              fullWidth
              text="Buy Credit"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Credit
