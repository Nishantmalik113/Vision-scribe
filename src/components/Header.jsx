import React from 'react'

export default function Header(props) {
  const{handleAudioReset}=props  
  return (
    <header className='flex items-center 
        justify-between gap-4 p-4'>
          <a href='/'><h1 className='font-medium cursor-pointer' onClick={handleAudioReset}>Vision<span 
          className='text-purple-600 bold'>Scribe</span></h1></a>
          <a href='/' className=' specialBtn text-sm px-3 py-2 rounded-lg text-purple-400 
          flex items-center gap-2'>
            <p>New</p>
            <i className="fa-solid fa-plus"></i>
          </a>
    </header>
  )
}
