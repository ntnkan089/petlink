'use client'

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa'; // GitHub icon

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setError('');
      window.location.href = '/';
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      const result = await signIn('github', { callbackUrl: "/" });

      if (result?.error) {
        setError(result.error);
      } else {
        setError('');
        
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header Section */}
      <div className='bg-yellow-400 py-10 shadow-md'>
        <div className='text-center text-white font-extrabold text-5xl'>
          Login to Your Account
        </div>
      </div>

      
      <div className='flex flex-col justify-center items-center py-12 px-4 md:px-0'>
        <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8'>
          <h2 className='text-3xl font-semibold text-center text-gray-800 mb-6'>Welcome Back!</h2>
          
          
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Username</label>
              <input
                type='text'
                className='w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
                placeholder='Enter your email'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
              <input
                type='password'
                className='w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className='text-red-500 text-sm'>{error}</p>}

            <button
              type='submit'
              className={`w-full bg-blue-600 text-white py-2 rounded-lg transition duration-300 hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* GitHub Sign-In Button */}
          <button
            onClick={handleGitHubSignIn}
            className='w-full bg-gray-800 text-white py-2 rounded-lg flex items-center justify-center mt-4 transition duration-300 hover:bg-gray-900'
          >
            <FaGithub className='mr-2' /> Sign in with GitHub
          </button>

          {/* Register Link */}
          <p className='text-center text-sm mt-4'>
            Don&apos;t have an account?{' '}
            <Link href="/register" className='text-blue-500 hover:underline'>
              Sign up
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
