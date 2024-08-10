import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './PasswordResetPage.css'; // Ensure this CSS file is styled for the updated component

function PasswordResetPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue
  } = useForm({ mode: 'onChange' });
  
  const [step, setStep] = useState('verify'); // 'verify' or 'reset'
  const [verificationError, setVerificationError] = useState(null);
  const [passwordUpdateError, setPasswordUpdateError] = useState(null);
  const [userData, setUserData] = useState(null);

  // Watch the password field to validate password match
  const password = watch('newPassword');

  const handleVerification = async (data) => {
    try {
      const response = await axios.get(`http://localhost:3000/users?username=${data.username}`);
      const user = response.data[0];

      if (user) {
        setUserData(user);
        setStep('reset'); // Move to reset step
      } else {
        setVerificationError('Username not found');
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      setVerificationError('Verification failed. Please try again.');
    }
  };

  const handlePasswordReset = async (data) => {
    try {
      await axios.patch(`http://localhost:3000/users/${userData.id}`, {
        password: data.newPassword
      });
      alert('Password updated successfully!');
      setValue('username', '');
      setValue('newPassword', '');
      setValue('confirmPassword', '');
      setStep('verify'); // Go back to verification step
    } catch (error) {
      console.error('Error updating password:', error);
      setPasswordUpdateError('Password update failed. Please try again.');
    }
  };

  return (
    <div className="password-reset-page">
      <h1>Password Reset</h1>
      {step === 'verify' && (
        <form onSubmit={handleSubmit(handleVerification)} className="verify-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <p className="error">{errors.username.message}</p>}
          </div>
          
          {verificationError && <p className="error">{verificationError}</p>}
          
          <button type="submit" disabled={!isValid}>Verify Username</button>
        </form>
      )}
      
      {step === 'reset' && (
        <form onSubmit={handleSubmit(handlePasswordReset)} className="reset-form">
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              {...register('newPassword', { required: 'New password is required' })}
            />
            {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
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
          
          {passwordUpdateError && <p className="error">{passwordUpdateError}</p>}
          
          <button type="submit" disabled={!isValid}>Update Password</button>
        </form>
      )}
    </div>
  );
}

export default PasswordResetPage;
