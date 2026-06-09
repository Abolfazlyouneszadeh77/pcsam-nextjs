import React, { Suspense } from 'react'
import HeroSection from '@/src/components/pages/productList/HeroSection'
import CardWrapper from '@/src/components/pages/productList/CardWrapper'

const Products = () => {
  return (
    <div className="w-full dark:bg-gray-900">
      <HeroSection />
      <div className="container mx-auto px-15 py-15">
        <Suspense fallback={<div className="text-center py-10">Loading products...</div>}>
          <CardWrapper />
        </Suspense>
      </div>
    </div>
  )
}

export default Products