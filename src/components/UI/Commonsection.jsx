import React from 'react'
import commonImage from '../../assets/images/commonsection.jpg'

const Commonsection = () => {
  return (
    <div className='h-12 w-auto sm:h-20 z-0'>
        <img src={commonImage} alt='commonsection' className='object-cover h-12 w-[100%] opacity-40 sm:h-20'></img>
    </div>
  )
}

export default Commonsection