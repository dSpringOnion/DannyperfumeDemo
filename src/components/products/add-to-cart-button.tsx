'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { addToCartUnifiedAction } from '@/actions/unified-cart-actions'
import { toast } from 'sonner'
import { ShoppingCart, Check } from 'lucide-react'

interface AddToCartButtonProps {
  productId: string
  variantId?: string
  quantity?: number
  disabled?: boolean
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?: 'default' | 'outline' | 'ghost'
  showIcon?: boolean
  children?: React.ReactNode
}

export function AddToCartButton({
  productId,
  variantId,
  quantity = 1,
  disabled = false,
  className = 'w-full',
  size = 'lg',
  variant = 'default',
  showIcon = true,
  children,
}: AddToCartButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Prevent parent link navigation
    e.stopPropagation() // Stop event bubbling

    startTransition(async () => {
      const result = await addToCartUnifiedAction(productId, quantity, variantId)

      if (result?.error) {
        toast.error(result.error)
      } else {
        setIsAdded(true)
        toast.success('Added to cart!', {
          action: {
            label: 'View Cart',
            onClick: () => router.push('/cart'),
          },
        })

        // Reset the "added" state after 2 seconds
        setTimeout(() => setIsAdded(false), 2000)
      }
    })
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isPending}
      className={className}
      size={size}
      variant={variant}
    >
      {showIcon && (
        isAdded ? (
          <Check className="h-5 w-5 mr-2" />
        ) : (
          <ShoppingCart className="h-5 w-5 mr-2" />
        )
      )}
      {children || (isAdded ? 'Added!' : isPending ? 'Adding...' : 'Add to Cart')}
    </Button>
  )
}
