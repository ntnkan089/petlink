'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { phone, name, email, password } = formData;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-yellow-400 text-center shadow-md py-8">
        <h1 className="text-4xl text-white font-bold">Create Your Account</h1>
      </div>

      <div className="flex justify-center items-center py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
          <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-400 focus:outline-none"
                placeholder="Enter your full name" 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-400 focus:outline-none"
                placeholder="Enter your email address" 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-400 focus:outline-none"
                placeholder="Enter your password" 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile phone no.</label>
              <input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-yellow-400 focus:outline-none"
                placeholder="Enter your mobile number" 
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 transition-all duration-300"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account? <Link href="/login" className="text-yellow-500 hover:underline">Login</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
