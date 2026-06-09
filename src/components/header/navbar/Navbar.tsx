import React from 'react'
import HorizonalNavbar from './HorizonalNavbar'
import VerticalNavbar from './VerticalNavbar'

const Navbar = () => {
  return (
    <>
      <div className="hidden md:block">
        <HorizonalNavbar />
      </div>
      <div className="block md:hidden">
        <VerticalNavbar />
      </div>
    </>
  )
}

export default Navbar