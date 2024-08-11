// src/components/pages/SignIn.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../auth/authSlice';

function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser(form)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        navigate('/main');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      {authStatus === 'failed' && <p className="text-red-500 mb-4">{authError}</p>}
      <input 
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 w-full mt-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
      />
      <input 
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="border p-2 w-full mt-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-4 hover:bg-blue-600 transition-colors duration-300 text-sm sm:text-base md:text-lg">
        {authStatus === 'loading' ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}

export default SignIn;
