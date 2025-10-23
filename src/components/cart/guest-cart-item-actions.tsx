'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { updateGuestCartItemAction, removeFromGuestCartAction } from '@/actions/guest-cart-actions'
import { toast } from 'sonner'

interface GuestCartItemActionsProps {
  productId: string
  variantId?: string
  quantity: number
  maxQuantity: number
}

export function GuestCartItemActions({
  productId,
  variantId,
  quantity,
  maxQuantity,
}: GuestCartItemActionsProps) {
  const [isPending, startTransition] = useTransition()
  const [optimisticQuantity, setOptimisticQuantity] = useState(quantity)

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > maxQuantity) {
      toast.error(`Only ${maxQuantity} items available`)
      return
    }

    setOptimisticQuantity(newQuantity)

    startTransition(async () => {
      const result = await updateGuestCartItemAction(productId, newQuantity, variantId)
      if (result?.error) {
        toast.error(result.error)
        setOptimisticQuantity(quantity)
      } else {
        toast.success('Cart updated')
      }
    })
  }

  const handleRemove = () => {
    startTransition(async () => {
      const result = await removeFromGuestCartAction(productId, variantId)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Item removed from cart')
      }
    })
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center border rounded-md">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-none"
          onClick={() => handleUpdateQuantity(optimisticQuantity - 1)}
          disabled={optimisticQuantity <= 1 || isPending}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <div className="h-8 w-12 flex items-center justify-center text-sm font-medium border-x">
          {optimisticQuantity}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-none"
          onClick={() => handleUpdateQuantity(optimisticQuantity + 1)}
          disabled={optimisticQuantity >= maxQuantity || isPending}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        onClick={handleRemove}
        disabled={isPending}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
