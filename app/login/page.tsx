import React from 'react'
import LoginForm from '@/src/components/pages/login/LoginForm'
import photo from '@/public/48763d47-5b5b-4585-9243-321f5a40b675.png'
import Image from 'next/image'

const Login = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row justify-around bg-gray-100">
      <LoginForm />
      <div className="hidden md:block h-screen w-full md:w-full ">
        <Image src={photo} alt="photo"  className="object-cover w-full h-full" loading="eager" /> 
      </div>
    </div>
  )
}

export default Login