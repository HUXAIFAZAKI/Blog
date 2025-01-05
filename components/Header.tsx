import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <>
    <div className='flex w-full justify-center md:justify-between px-10 py-6 select-none'>
      <Link href={"/"} className='text-3xl font-bold hover:text-white hover:scale-125 duration-200 '>BLOGS</Link>
      <ul className='md:flex items-center gap-4 font-bold hidden'>
        <Link href={"/"} className='border border-white rounded-lg px-4 py-2 hover:bg-white hover:text-black duration-200'>Home</Link>
        <Link href={"#"} className='border border-white rounded-lg px-4 py-2 hover:bg-white hover:text-black duration-200'>About</Link>
        <Link href={"#"} className='border border-white rounded-lg px-4 py-2 hover:bg-white hover:text-black duration-200'>Contact</Link>
      </ul>
      
    </div>
    <p className='mx-auto border-t border-white w-[95vw]'></p>
    </>
  )
}

export default Header