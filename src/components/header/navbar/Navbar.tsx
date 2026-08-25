import React from 'react'
import HorizonalNavbar from './HorizonalNavbar'
import VerticalNavbar from './VerticalNavbar'

const Navbar = () => {
  return (
    <>
      <div className="hidden lg:block">
        <HorizonalNavbar />
      </div>
      <div className="block lg:hidden">
        <VerticalNavbar />
      </div>
    </>
  )
}

export default Navbar