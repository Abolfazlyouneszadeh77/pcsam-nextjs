import React from 'react'
import HeroSection from '@/src/components/pages/productList/HeroSection'
import CardWrapper from '@/src/components/pages/productList/CardWrapper'

const Products = () => {
  return (
    <div className="w-full dark:bg-gray-900">
      <HeroSection />
      <div className="container mx-auto px-15 py-15">
        <CardWrapper />
      </div>
    </div>
  )
}

export default Products