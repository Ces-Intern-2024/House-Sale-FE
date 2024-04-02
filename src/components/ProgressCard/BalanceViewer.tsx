import { GiCrownCoin } from 'react-icons/gi'
import style from './BalanceViewer.module.scss'
import React from 'react'

interface BalanceViewerProps {
  icon: JSX.Element
  background: string
  balance: number
  title: string
  isCreditBalance?: boolean
}
export default function BalanceViewer({
  icon,
  background,
  balance,
  title,
  isCreditBalance,
}: BalanceViewerProps) {
  return (
    <>
      <div
        style={{ backgroundColor: background }}
        className={` rounded-[16px] shadow-xl flex items-center justify-center p-3`}
      >
        <div className=" flex flex-col items-between w-full px-5 gap-y-5">
          <div className="flex items-center justify-between gap-x-10  ">
            <div className="text-[24px] flex items-center font-extrabold p-0 m-0 gap-x-3">
              {balance}
              {isCreditBalance && (
                <span className={style.creditIcon}>
                  <GiCrownCoin />
                </span>
              )}
            </div>
            {icon}
          </div>
          <h3 className="font-semibold m-0">{title}</h3>
        </div>
      </div>
    </>
  )
}
