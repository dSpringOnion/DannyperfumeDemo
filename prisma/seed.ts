import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic devices and accessories',
      isActive: true,
    },
  })

  const clothing = await prisma.category.upsert({
    where: { slug: 'clothing' },
    update: {},
    create: {
      name: 'Clothing',
      slug: 'clothing',
      description: 'Fashion and apparel',
      isActive: true,
    },
  })

  const home = await prisma.category.upsert({
    where: { slug: 'home-garden' },
    update: {},
    create: {
      name: 'Home & Garden',
      slug: 'home-garden',
      description: 'Home decor and garden supplies',
      isActive: true,
    },
  })

  console.log('✅ Categories created')

  // Create sample products
  const products = [
    {
      name: 'Wireless Headphones',
      slug: 'wireless-headphones',
      description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and commuters.',
      price: 99.99,
      compareAtPrice: 149.99,
      categoryId: electronics.id,
      inventory: 50,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'Smart Watch',
      slug: 'smart-watch',
      description: 'Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.',
      price: 199.99,
      categoryId: electronics.id,
      inventory: 30,
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'Laptop Backpack',
      slug: 'laptop-backpack',
      description: 'Durable water-resistant backpack with padded laptop compartment and USB charging port.',
      price: 49.99,
      compareAtPrice: 79.99,
      categoryId: electronics.id,
      inventory: 100,
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
      isActive: true,
    },
    {
      name: 'Classic Cotton T-Shirt',
      slug: 'classic-cotton-tshirt',
      description: 'Comfortable 100% cotton t-shirt available in multiple colors. Perfect for everyday wear.',
      price: 19.99,
      categoryId: clothing.id,
      inventory: 200,
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'],
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'Denim Jeans',
      slug: 'denim-jeans',
      description: 'Classic fit denim jeans made from premium quality fabric. Timeless style that never goes out of fashion.',
      price: 59.99,
      compareAtPrice: 89.99,
      categoryId: clothing.id,
      inventory: 75,
      images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=800'],
      isActive: true,
    },
    {
      name: 'Running Shoes',
      slug: 'running-shoes',
      description: 'Lightweight running shoes with cushioned sole and breathable mesh upper.',
      price: 79.99,
      categoryId: clothing.id,
      inventory: 60,
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
      isFeatured: true,
      isActive: true,
    },
    {
      name: 'Ceramic Plant Pot',
      slug: 'ceramic-plant-pot',
      description: 'Handcrafted ceramic plant pot with drainage hole. Perfect for indoor plants.',
      price: 24.99,
      categoryId: home.id,
      inventory: 40,
      images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800'],
      isActive: true,
    },
    {
      name: 'Scented Candle Set',
      slug: 'scented-candle-set',
      description: 'Set of 3 luxury scented candles with natural soy wax. Creates a relaxing atmosphere.',
      price: 34.99,
      categoryId: home.id,
      inventory: 80,
      images: ['https://images.unsplash.com/photo-1602874773858-601fb04527c6?w=800'],
      isFeatured: true,
      isActive: true,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('✅ Products created')
  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
