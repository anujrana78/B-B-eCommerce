import React from 'react'
import { Link } from 'react-router-dom'


const OrderCancel = () => {
  return (
    <div className='flex-col text-center  mt-20'>
        <p>Something went wrong processing your order.</p>
        <Link to='/shop'>
        <button className='bg-black border-2 border-black px-10 py-1 text-white mt-10'>Shop More</button>
        </Link>

    </div>
  )
}

export default OrderCancel