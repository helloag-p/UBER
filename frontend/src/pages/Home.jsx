import React from 'react'
import { Link, Route,Routes } from 'react-router-dom'
const Home = () => {
  return (
    <div>
        <div className=' bg-cover bg-center bg-[url(https://images.stockcake.com/public/7/f/3/7f3801ab-36b2-459a-9ef8-d86c65bb7d57_large/rainy-traffic-lights-stockcake.jpg)] h-screen pt-8 flex justify-between flex-col w-full'>
            <img className='w-16 ml-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
            <div className='bg-white pb-7 py-4 px-4 '>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5 '>Continue</Link>
            </div>
        </div>
    </div>
  )
}
export default Home
