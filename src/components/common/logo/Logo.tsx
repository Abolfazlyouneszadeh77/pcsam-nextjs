import React from 'react'
import Image from 'next/image'
import logo from '@/public/LOGO.png'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/'>
        <Image alt='logo' src={logo} width={180} height={30} className='w-55 border mt-1' />
    </Link>
  )
}

export default Logo