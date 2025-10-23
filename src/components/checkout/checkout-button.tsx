'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { createCheckoutSessionAction } from '@/actions/checkout-actions'
import { toast } from 'sonner'
import { Lock } from 'lucide-react'

export function CheckoutButton() {
  const [isPending, startTransition] = useTransition()

  const handleCheckout = () => {
    startTransition(async () => {
      const result = await createCheckoutSessionAction()

      if (result?.error) {
        toast.error(result.error)
      }
      // If successful, the action will redirect to Stripe
    })
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isPending}
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      size="lg"
    >
      <Lock className="h-5 w-5 mr-2" />
      {isPending ? 'Processing...' : 'Proceed to Payment'}
    </Button>
  )
}
