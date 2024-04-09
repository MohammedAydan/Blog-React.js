import React from 'react'
import Loading from './Loading'

function Splash() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className="flex flex-col items-center">
        <p className='font-bold text-4xl text-white mb-4'>BLOG</p>
        <Loading />
      </div>
    </div>
  )
}

export default Splash
