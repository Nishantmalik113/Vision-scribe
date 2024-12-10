import React from 'react'
import {LANGUAGES} from '../utils/presets'
export default function Translation(props) {
  const{textElement, toLanguage, translating, 
    setToLanguage, generateTranslation } = props

  return (
    <div className='flex flex-col gap-2 max-w-[400px] w-full mx-auto'>
      {!translating && (<div className='flex flex-col gap-1'>
        <p className='text-sm sm:text-md font-medium 
        text-zinc-500 mr-auto'>To Language</p>
        <div className='flex items-stretch gap-2'>
          <select className='flex-1 outline-none bg-white 
          focus:outline-none border border-solid border-transparent 
          hover:border-purple-300 duration-200 p-2 rounded' value={toLanguage} onChange={(e)=> 
            setToLanguage(e.target.value)}>
              <option value="Select Language">Select Language 
              </option>
              {Object.entries(LANGUAGES).map(([key, value])=>{
                return(
                  <option key={key} value={value}>{key}</option>
                )
              })}
          </select>
          <button onClick={generateTranslation} className='specialBtn text-sm px-3 py-2 rounded-lg 
          text-purple-400 flex items-center gap-2 
          hover:text-purple-600 duration-200'>Translate</button>
        </div>
      </div>)}
      
      {(textElement && !translating) && (
        <p>{textElement}</p>
      )} 

      {translating && (
        <div className='grid place-items-center'>
          <i className='fa-solid fa-spinner animate-spin'></i>
        </div>
      )}
    </div>
  )
}
