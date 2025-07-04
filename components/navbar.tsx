import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import NavItems from './navItems'
import { SignInButton,SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between mx-auto w-full px-14 py-4 bg-[#0D1117] max-sm:px-4 border-b border-[#21262D] shadow-md'>
      <Link href='/' className='text-2xl font-bold text-gray-800'>
      
        <div className='flex items-center gap-2 cursor-pointer'>
            <Image
                src='/images/logo.png'
                alt='Logo'
                height={35}
                width={35}                    
                
                />
        </div>
      </Link>
      <div className='flex items-center gap-10 text-[#C9D1D9] text-md font-medium '>
        <NavItems/>
        <SignedOut>
          <div className='flex items-center gap-2'>
            <SignInButton>
              <button className='btn-primary bg-[#58A6FF] hover:bg-[#1F6FEB] transition-all ease-in-out duration-200 h-8 w-16 text-black font-medium rounded-lg'>Sign-In</button>
            </SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/"/>
        </SignedIn>
      </div>
        
    </div>
  )
}

export default NavBar
