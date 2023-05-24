import React from 'react'

const AccountCard = ({title,desc}) => {
  return (
    <div className='bg-gray-200 rounded-lg px-10 text-center mt-2 mon '>
        <h3 className=' font-medium text-[14px]'>{title}</h3>
        <p className='text-gray-500 text-[12px]'>{desc}</p>
    </div>  
  )
}

export default AccountCard