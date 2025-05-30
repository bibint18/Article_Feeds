// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import InputField from './Shared/InputField';
// import Button from './Shared/Button';
// import { verifyOtp } from '../services/api/authService';
// import { VerifyOtpData } from '../types';

// const VerifyOtpForm: React.FC = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const data: VerifyOtpData = { email: state.email, otp };
//       await verifyOtp(data);
//       navigate('/success');
//     } catch (err:unknown) {
//       setError(err instanceof Error ? err.message : 'OTP verification failed');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <InputField
//           label="OTP"
//           type="text"
//           name="otp"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           required
//         />
//         <Button type="submit">Verify OTP</Button>
//       </form>
//     </div>
//   );
// };

// export default VerifyOtpForm;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InputField from './Shared/InputField';
import Button from './Shared/Button';
import { verifyOtp, resendOtp } from '../services/api/authService';
import { VerifyOtpData } from '../types';

const VerifyOtpForm: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsResendDisabled(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data: VerifyOtpData = { email: state.email, otp };
      console.log(data)
      await verifyOtp(data);
      navigate('/success');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'OTP verification failed');
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp({ email: state.email });
      setCountdown(60);
      setIsResendDisabled(true);
      setError('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md md:max-w-lg transform transition-all hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Verify OTP</h2>
        {error && <p className="text-red-500 text-sm mb-5 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Enter OTP"
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter the OTP sent to your email"
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
            Verify OTP
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            {countdown > 0
              ? `Resend OTP in ${countdown} seconds`
              : 'You can now resend OTP'}
          </p>
          <Button
            onClick={handleResendOtp}
            disabled={isResendDisabled}
            className={`mt-3 w-full bg-gray-600 hover:bg-gray-700 transition-colors duration-300 ${
              isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Resend OTP
          </Button>
        </div>
        <p className="text-center text-gray-600 mt-6 text-sm">
          Back to <a href="/" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtpForm;