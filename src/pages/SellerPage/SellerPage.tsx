import React, { useEffect, useState } from 'react'
import TableProperty from '../../components/TableProperty/TableProperty'
import { Button, Modal, NumberInput } from '@mantine/core'
import { IconCurrencyDollar } from '@tabler/icons-react'
import style from '../../components/Transaction/Transaction.module.scss'
import { GiCrownCoin } from 'react-icons/gi'
import { getConversionRateList } from '../../service/TransactionService'
import { useNavigate } from 'react-router-dom'
import { MAX_CREDIT, MIN_CREDIT } from '../../constants/credit.constant'
import { ConversionRate } from '../../types/conversionRate'
import { getProfile } from '../../service/ProfileService'
import { User } from '../../types/user'

export default function SellerPage() {
  const navigate = useNavigate()
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [opened, setOpened] = useState(false)
  const [conversionRate, setConversionRate] = useState('')
  const [creditAmount, setCreditAmount] = useState<number | string>(0)
  const [creditAmountError, setCreditAmountError] = useState('')
  const [shouldShowCheckoutForm, setShouldShowCheckoutForm] = useState(false)
  const [userProfile, setUserProfile] = useState<User>()
  const getUserProfile = async () => {
    const res = await getProfile()
    setUserProfile(res)
  }
  const handleGetConversionRate = async () => {
    const data = await getConversionRateList()
    const usdRate = data.find(
      (item: ConversionRate) => item.currencyFrom === 'USD',
    )
    setConversionRate(usdRate.exchangeRate)
  }

  const handleBuyCredit = async () => {
    if (Number(creditAmount) < MIN_CREDIT) {
      setCreditAmountError('Please enter credit amount')
      return
    }
    if (Number(creditAmount) > MAX_CREDIT) {
      setCreditAmountError('You can only buy up to 500 credits')
      return
    }

    setOpened(false)
    setCreditAmountError('')
    setShouldShowCheckoutForm(true)
    navigate('/transaction', {
      state: {
        creditAmount: creditAmount,
        conversionRate: conversionRate,
      },
    })
  }

  useEffect(() => {
    handleGetConversionRate()
  }, [])

  useEffect(() => {
    getUserProfile()
  }, [shouldUpdate])

  return (
    <>
      <div className='pt-2'>
        <TableProperty
          setShouldUpdate={setShouldUpdate}
          shouldUpdate={shouldUpdate}
          userBalance={userProfile?.balance}
          setOpened={setOpened}
        />
      </div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        styles={{
          header: {
            height: '50px',
            paddingTop: '0px',
            paddingBottom: '0px',
          },
        }}
      >
        <div className="flex flex-col gap-y-5">
          <h1 className=" font-bold text-center text-lg my-0">
            Enter the number of credits you want to buy:
            <span className="font-bold text-center text-sm flex items-center justify-center my-0">
              1{' '}
              <GiCrownCoin
                size={25}
                color="#396652"
                className=" mr-3"
              ></GiCrownCoin>
              <span className="mr-3">=</span>
              {Number(conversionRate).toFixed()} dollars
            </span>
          </h1>

          <NumberInput
            readOnly={shouldShowCheckoutForm ? true : false}
            error={creditAmountError}
            value={creditAmount}
            onChange={(_value) => {
              setCreditAmountError('')
              setCreditAmount(_value)
            }}
            size="lg"
            leftSection={<GiCrownCoin size={25} color="#396652"></GiCrownCoin>}
            placeholder="Enter credit amount"
            allowDecimal={false}
            allowNegative={false}
            label="Credit Amount"
          ></NumberInput>
          <NumberInput
            readOnly
            value={(creditAmount as number) * Number(conversionRate)}
            size="lg"
            leftSection={
              <IconCurrencyDollar
                size={25}
                color="#396652"
              ></IconCurrencyDollar>
            }
            placeholder="In USD"
            label="Total Cost in Dollars"
          ></NumberInput>
          <div className={style.creditBtn}>
            <Button
              disabled={shouldShowCheckoutForm ? true : false}
              className={`${shouldShowCheckoutForm ? 'bg-orangeBtn text-white opacity-70' : 'bg-orangeBtn hover:bg-darkBlue'} `}
              fullWidth
              onClick={handleBuyCredit}
            >
              Process To Payment
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
