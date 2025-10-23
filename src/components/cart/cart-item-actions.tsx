'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { updateCartItemAction, removeCartItemAction } from '@/actions/cart-actions'
import { toast } from 'sonner'
import { Minus, Plus, Trash2 } from 'lucide-react'

interface CartItemActionsProps {
  itemId: string
  quantity: number
  maxQuantity: number
}

export function CartItemActions({ itemId, quantity, maxQuantity }: CartItemActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function updateQuantity(newQuantity: number) {
    if (newQuantity < 1 || newQuantity > maxQuantity) return

    setIsLoading(true)

    try {
      const result = await updateCartItemAction(itemId, newQuantity)

      if (result.success) {
        router.refresh()
      } else {
        toast.error(result.error || 'Failed to update quantity')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  async function removeItem() {
    setIsLoading(true)

    try {
      const result = await removeCartItemAction(itemId)

      if (result.success) {
        toast.success('Item removed from cart')
        router.refresh()
      } else {
        toast.error(result.error || 'Failed to remove item')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center rounded-md border">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-r-none"
          onClick={() => updateQuantity(quantity - 1)}
          disabled={isLoading || quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>

        <div className="flex h-8 w-12 items-center justify-center border-x text-sm font-medium">
          {quantity}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-l-none"
          onClick={() => updateQuantity(quantity + 1)}
          disabled={isLoading || quantity >= maxQuantity}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive hover:text-destructive"
        onClick={removeItem}
        disabled={isLoading}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
