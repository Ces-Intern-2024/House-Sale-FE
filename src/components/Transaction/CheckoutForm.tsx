import { Button } from '@mantine/core'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Swal from 'sweetalert2'
import { proceedToPayment } from '../../service/TransactionService'
import { cancelPaymentIntent } from '../../service/StripeService'

interface CheckoutFormProps {
  intentId: string
  total: number
  conversionRate: string
  setResetPayment: Dispatch<SetStateAction<boolean>>
  setShouldUpdate: Dispatch<SetStateAction<boolean>>
  setValue: Dispatch<SetStateAction<string>>
}
export default function CheckoutForm({
  intentId,
  total,
  conversionRate,
  setResetPayment,
  setShouldUpdate,
  setValue,
}: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProceedToPayment = async () => {
    await proceedToPayment(
      total / Number(conversionRate),
      `You purchased ${total / Number(conversionRate)} credits for $${total}.`,
    )
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // return_url: `${window.location}`,
      },
      redirect: 'if_required',
    })
    if (response.error) {
      setMessage(response.error.message as string)
      setIsProcessing(false)
    } else {
      await handleProceedToPayment()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Payment successful!',
        showConfirmButton: false,
        timer: 1500,
      })
      setResetPayment((prev) => !prev)
      setShouldUpdate((prev) => !prev)
      setValue('Exchange Policy')
    }
  }
  const handleCancelIntent = async () => {
    await cancelPaymentIntent(intentId)
    setResetPayment((prev) => !prev)
    setValue('Exchange Policy')
  }

  return (
    <>
      <h1 className=" font-semibold  text-primary text-xl mb-5">
        Please fill in this form to complete your purchase of{' '}
        <strong>{total / Number(conversionRate)} credits</strong> for
        <strong> ${total}</strong>.
      </h1>

      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" onChange={() => setMessage('')} />
        <button disabled={isProcessing || !stripe || !elements} id="submit">
          <Button mt={25} className=" bg-[#665dff]" loading={isProcessing}>
            {isProcessing ? 'Processing ... ' : `Pay $${total}`}
          </Button>
        </button>
        <Button
          mt={25}
          className=" bg-gray-500 ml-3"
          onClick={handleCancelIntent}
        >
          Cancel
        </Button>
        {message && <p className=" font-bold text-rose-500">{message}</p>}
      </form>
    </>
  )
}
