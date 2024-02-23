import React, { useEffect, useState } from 'react'
import style from './Credit.module.scss'
import { BsCoin } from 'react-icons/bs'
import { IoIosNotifications } from 'react-icons/io'
import Button from '../CustomButton/ButtonCustom'
import { getTransactionService } from '../../service/SellerService'
import { formatDate, formatMoney } from '../../utils/commonFunctions'
import { getProfile } from '../../service/ProfileService'
import { User } from '@/types/user'

const Credit = () => {
  const [userProfile, setUserProfile] = useState<User>()

  const getTransaction = async () => {
    const res = await getTransactionService()
    console.log(res.depositTransactions.transactions[0].createdAt)
    console.log(formatDate(res.depositTransactions.transactions[0].createdAt))
  }

  const getUserProfile = async () => {
    const res = await getProfile()
    console.log(res)
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
            <div className={style.row}>
              <div className={style.date}>2024-01-29 12:24:34</div>
              <div className={style.content}>Bạn đã nạp vào tài khoản</div>
              <div className={style.quantity}>
                <span className={style.symbol}>-</span>
                <span className={style.money}>20</span>
                <span className={style.icon}>
                  <BsCoin />
                </span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.date}>2024-01-29 12:24:34</div>
              <div className={style.content}>Bạn đã nạp vào tài khoản</div>
              <div className={style.quantity}>
                <span className={style.symbol}>+</span>
                <span className={style.money}>20</span>
                <span className={style.icon}>
                  <BsCoin />
                </span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.date}>2024-01-29 12:24:34</div>
              <div className={style.content}>Bạn đã sử dụng</div>
              <div className={style.quantity}>
                <span className={style.symbol}>-</span>
                <span className={style.money}>20</span>
                <span className={style.icon}>
                  <BsCoin />
                </span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.date}>2024-01-29 12:24:34</div>
              <div className={style.content}>Bạn đã sử dụng</div>
              <div className={style.quantity}>
                <span className={style.symbol}>-</span>
                <span className={style.money}>20</span>
                <span className={style.icon}>
                  <BsCoin />
                </span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.date}>2024-01-29 12:24:34</div>
              <div className={style.content}>Bạn đã sử dụng</div>
              <div className={style.quantity}>
                <span className={style.symbol}>-</span>
                <span className={style.money}>20</span>
                <span className={style.icon}>
                  <BsCoin />
                </span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.date}>2024-01-29 12:24:34</div>
              <div className={style.content}>Bạn đã sử dụng</div>
              <div className={style.quantity}>
                <span className={style.symbol}>-</span>
                <span className={style.money}>20</span>
                <span className={style.icon}>
                  <BsCoin />
                </span>
              </div>
            </div>
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
