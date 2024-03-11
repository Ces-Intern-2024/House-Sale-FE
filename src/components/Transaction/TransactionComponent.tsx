import React, { useEffect, useState } from 'react'
import style from './Transaction.module.scss'
import { BsCoin } from 'react-icons/bs'
import { Button, Modal, NumberInput, SegmentedControl } from '@mantine/core'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { IconCurrencyDollar } from '@tabler/icons-react'
import { getConversionRateList } from '../../service/TransactionService'
import ExchangePolicy from './ExchangePolicy'
import TransactionHistory from './TransactionHistory'
import CreditComponent from './CreditComponent'
import { MAX_CREDIT, MIN_CREDIT } from '../../constants/credit.constant'
import { createPaymentIntent } from '../../service/StripeService'

export default function TransactionComponent() {
  const [conversionRate, getConversionRate] = useState('')
  const [creditAmount, setCreditAmount] = useState<number | string>(0)
  const [creditAmountError, setCreditAmountError] = useState('')
  const [shouldShowCheckoutForm, setShouldShowCheckoutForm] = useState(false)
  const [shouldUpdate, setShouldUpdate] = useState(false)

  const [clientSecret, setClientSecret] = useState<string>()
  const [resetPayment, setResetPayment] = useState(false)
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!,
  )
  const [value, setValue] = useState('Exchange Policy')
  const [opened, setOpened] = useState(false)

  const [intentId, setIntentId] = useState('')

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
    setValue('Proceed To Payment')
    setCreditAmountError('')

    setShouldShowCheckoutForm(true)

    try {
      const paymentIntents = await createPaymentIntent(
        Number(creditAmount),
        Number(conversionRate),
      )
      setClientSecret(paymentIntents.client_secret as string)
      setIntentId(paymentIntents.id)
    } catch (err) {
      console.error(err)
    }
  }

  const handleGetConversionRate = async () => {
    const data = await getConversionRateList()
    getConversionRate(data[data.length - 1].exchangeRate)
  }

  useEffect(() => {
    handleGetConversionRate()
  }, [])

  useEffect(() => {
    setCreditAmount(0)
    setClientSecret('')
    setShouldShowCheckoutForm(false)
  }, [resetPayment])
  return (
    <div className="my-7.5 xl:mx-5 lg:mx-5 ">
      <div className=" grid grid-cols-12 gap-x-3 gap-y-10">
        <div className="  lg:col-span-5 mobile:col-span-12 bg-white shadow-xl rounded-[16px] pb-4 pt-2 px-5 flex flex-col items-center justify-center">
          <CreditComponent setOpened={setOpened} shouldUpdate={shouldUpdate} />
        </div>
        <div className="  lg:col-span-7 mobile:col-span-12 bg-white shadow-xl rounded-[16px] pb-4 pt-2 px-5">
          <TransactionHistory shouldUpdate={shouldUpdate} />
        </div>

        <div className="segment col-span-12 flex flex-col justify-center rounded-[16px]  p-5  bg-white shadow-xl">
          <SegmentedControl
            transitionDuration={300}
            transitionTimingFunction="linear"
            styles={{
              root: {
                paddingTop: '5px',
                paddingBottom: '5px',
              },
              label: {
                fontWeight: 'bold',
                color: '#396652',
                fontSize: '18px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
            value={value}
            onChange={setValue}
            data={[
              { label: 'Exchange Policy', value: 'Exchange Policy' },
              {
                label: 'Proceed To Payment',
                value: 'Proceed To Payment',
                disabled: shouldShowCheckoutForm ? false : true,
              },
            ]}
          />
          {value === 'Exchange Policy' && <ExchangePolicy />}
          {value === 'Proceed To Payment' && (
            <div
              className={`${shouldShowCheckoutForm ? 'col-span-6 flex flex-col    p-5' : 'hidden'}`}
            >
              {clientSecret && stripePromise && (
                <div className="w-full px-3">
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                      conversionRate={conversionRate}
                      intentId={intentId}
                      setResetPayment={setResetPayment}
                      total={Number(creditAmount) * Number(conversionRate)}
                      setShouldUpdate={setShouldUpdate}
                      setValue={setValue}
                    />
                  </Elements>
                </div>
              )}
            </div>
          )}

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
              <h1 className=" font-bold text-center text-lg">
                Enter the number of credits you want to buy:
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
                leftSection={<BsCoin size={25} color="#396652"></BsCoin>}
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
        </div>
      </div>
    </div>
  )
}
