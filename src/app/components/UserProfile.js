import React from 'react'
import paw from '../assets/7586571.webp'


const data = {
  img: paw,
  name: 'Couldn\'t find a profile',
  
  breed: 'bre',
  gender: 'gende',
  age: 'agea',
  about: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe asperiores qui obcaecati ipsa nihil atque eligendi, vero rerum, adipisci deleniti ipsam similique et nemo illum quod dicta dolorem quisquam autem.'
}



const UserProfile = () => {
  return (
    <div>
      <div className='flex flex-col'>
        <div className='bg-yellow-300 flex text-center shadow-md'>
          <div className='max-w-screen-md text-white font-bold text-5xl flex items-center w-full justify-center mx-auto'>
              {data.name}
          </div>
        </div>

        <div className='pt-5  w-full '>
          <div className='flex flex-col justify-center items-center md:flex-row md:justify-between md:max-w-screen-md mx-auto'>
            <div>
                <img src={data.img} alt="" />
            </div>
            <div className='max-w-screen-sm'>
                <p className='font-bold'>Pets you've liked</p>
            </div>
          </div>
        </div>
    </div>
    </div>
  )
}

export default UserProfile