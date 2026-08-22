import React, { Suspense } from 'react'
import HeroSection from '@/src/components/pages/productList/HeroSection'
import CardWrapper from '@/src/components/pages/productList/CardWrapper'
import ScrollToTop from '@/src/components/common/scrollToTop'

const Products = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 relative">
      <HeroSection />
      <div className="container mx-auto px-15 py-15">
        <Suspense>
          <CardWrapper />
        </Suspense>
      </div>
      <ScrollToTop />
    </div>
  )
}

export default Products