import { Link } from 'react-router-dom';

const Register = () => (
  <div className='flex flex-col'>
    <div className='bg-yellow-300 flex text-center shadow-md'>
      <div className='max-w-screen-md text-white font-bold text-5xl flex items-center w-full justify-center mx-auto'>
        Register
      </div>
    </div>

      <div className='flex flex-col justify-center items-center md:flex-row md:justify-between md:max-w-screen-md mx-auto py-10'>
        
        <div className='max-w-screen-sm'>
          <form className='flex flex-col'>
            <label className='font-bold mb-2'>Full Name</label>
            <input type='text' className='border p-2 mb-4' placeholder='Enter your full name' />

            <label className='font-bold mb-2'>Email</label>
            <input type='email' className='border p-2 mb-4' placeholder='Enter your email address' />

            <label className='font-bold mb-2'>Password</label>
            <input type='password' className='border p-2 mb-4' placeholder='Enter your password' />

            <label className='font-bold mb-2'>Confirm Password</label>
            <input type='password' className='border p-2 mb-4' placeholder='Confirm your password' />

            <button type='submit' className='bg-green-500 text-white py-2 px-4 rounded'>
              Register
            </button>
          </form>

          <p className='mt-4'>
            Already have an account? <Link to="/login" className='underline'>Login</Link>.
          </p>
        </div>
      </div>
    </div>
);

export default Register;
