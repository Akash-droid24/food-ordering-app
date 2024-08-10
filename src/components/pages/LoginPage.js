import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // Ensure this CSS file is styled for the updated component

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: 'onChange' });
  
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`);
      const user = response.data[0]; // Assuming there's only one user with the given email and password

      if (user) {
        alert('Login successful!');
        navigate('/home'); // Redirect to home page or another route after successful login
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        
        {loginError && <p className="error">{loginError}</p>}
        
        <button type="submit" disabled={!isValid}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
