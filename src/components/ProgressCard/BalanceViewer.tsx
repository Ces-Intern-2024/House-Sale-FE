import { formatMoneyToUSD } from '../../utils/commonFunctions'
import React from 'react'

interface BalanceViewerProps {
  icon: JSX.Element
  background: string
  balance: number
  sign: string
  title: string
}
export default function BalanceViewer({
  icon,
  background,
  balance,
  sign,
  title,
}: BalanceViewerProps) {
  return (
    <>
      <div
        style={{ backgroundColor: background }}
        className={` rounded-[16px] shadow-xl flex items-center justify-center p-3`}
      >
        <div className=" flex flex-col items-between w-full px-5">
          <div className="flex items-center justify-between gap-x-10 ">
            <h2 className="text-[24px]  font-extrabold p-0 m-0">
              {sign}
              {formatMoneyToUSD(balance)}
            </h2>
            {icon}
          </div>
          <div>
            <h3 className="font-semibold mt-3">{title}</h3>
          </div>
        </div>
      </div>
    </>
  )
}
