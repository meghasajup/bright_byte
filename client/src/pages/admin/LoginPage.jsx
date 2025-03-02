import React from 'react';
import { useForm } from 'react-hook-form';
import { Player } from '@lottiefiles/react-lottie-player';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
const navigate=useNavigate()
  const onSubmit = async (data) => {
    try {
      console.log('Login credentials:', data);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/login`,
        data,
        { withCredentials: true }
      );
      console.log("Login successful:", response.data);
      if(response.data){
        navigate('/admin/dashboard')
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Player
            src="https://assets8.lottiefiles.com/packages/lf20_iorpbol0.json"
            className="w-48 h-48"
            loop
            autoplay
          />
          <h2 className="mt-4 text-3xl font-extrabold text-center text-gray-900">Welcome Admin</h2>
          <p className="mt-2 text-sm text-center text-gray-600">Sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full pl-10 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-4 bg-gray-50"
                  placeholder="email"
                  {...register('email')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="block w-full pl-10 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-4 bg-gray-50"
                  placeholder="Password"
                  {...register('password')}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">Remember me</label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;