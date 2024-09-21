import React from 'react'
import { Link } from 'react-router-dom'
import a from '../assets/a.avif'

const Missing = () => {
  return (
    <div className='flex flex-col'>
    <div className='bg-yellow-300 flex text-center shadow-md'>
      <div className='max-w-screen-md text-white font-bold text-5xl flex items-center w-full justify-center mx-auto'>
        404 Not Found
      </div>
    </div>

    <div className='pt-5  w-full '>
      <div className='flex flex-col justify-center items-center md:flex-row md:justify-between md:max-w-screen-md mx-auto'>
        <div>
          {/* You can add an image or icon for the 404 page */}
          <img src={a} alt="404 Not Found" />
        </div>
        <div className='max-w-screen-sm'>
          <p className='font-bold'>Oops! Page not found</p>
          <p className='my-3'>
            The page you are looking for might be unavailable or does not exist.
          </p>
          <p className='my-3'>
            Go back to <Link to="/" className='underline'>home</Link>.
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Missing