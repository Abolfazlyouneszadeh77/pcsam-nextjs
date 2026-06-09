import React from "react";
import SignupForm from "@/src/components/pages/signup/SignupForm";
import Image from "next/image";
import photo from '@/public/6b3cc7ab-ccbb-4abb-98f8-6a6e0af578e9.png'

const Signup = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row justify-around bg-gray-100">
      <SignupForm />
      <div className="hidden md:block h-screen w-full md:w-full ">
        <Image src={photo} alt="photo"  className="object-cover w-full h-full" /> 
      </div>
    </div>
  );
};

export default Signup;
