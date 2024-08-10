import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';
import './RegistrationPage.css'; // Ensure this CSS file is styled for the updated component

function RegistrationPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset
  } = useForm({ mode: 'onChange' });

  const navigate = useNavigate();

  // Watch the password field to validate password match
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      alert('Registration successful!');
      reset();
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required'
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords must match'
            })}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
        </div>
        
        <button type="submit" disabled={!isValid}>Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
