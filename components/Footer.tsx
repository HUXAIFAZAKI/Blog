import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
        <div className="">
        <p className='mx-auto border-t border-white w-[95vw]'></p>
            <div className="w-[100%] h-[50px] flex justify-between items-center px-10">
              <p>Developed by <Link href="https://github.com/HUXAIFAZAKI/" className='underline font-bold'>Huxaifa</Link></p>
              <p>© Blogs 2025</p>
            </div>
        </div>
    </div>
  )
}

export default Footer