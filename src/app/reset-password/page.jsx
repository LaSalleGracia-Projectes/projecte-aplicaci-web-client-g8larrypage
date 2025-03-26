'use client'

import supabase from '@/helpers/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [requirements, setRequirements] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const processToken = () => {
      const hash = window.location.hash;
      if (hash.includes('access_token')) {
        const params = new URLSearchParams(hash.slice(1));
        const tokenFromHash = params.get('access_token');
        if (tokenFromHash) {
          window.history.replaceState(null, '', `${window.location.origin}/reset-password?access_token=${tokenFromHash}`);
          setToken(tokenFromHash);
        }
      } else {
        setToken(searchParams.get('access_token'));
      }
    };
    processToken();
  }, [searchParams]);

  const validatePassword = (value) => {
    setPassword(value);
    setRequirements({
      length: value.length >= 10 && value.length <= 40,
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      symbol: /[!@#$%^&*(),.?":{}|<>_]/.test(value),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      if (!token) {
        setMessage('The recovery link is invalid or has expired.');
        return;
      }

      const { error: sessionError } = await supabase.auth.setSession({
        access_token: token,
        refresh_token: token,
      });

      if (sessionError) {
        setMessage('The recovery link is invalid or has expired.');
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setMessage('Error updating the password: ' + updateError.message);
        return;
      }

      setMessage('Password updated successfully! Redirecting to the login page.');
      setTimeout(() => router.push('/login'), 3000);
    } catch (err) {
      setMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-4">
      <div className="mt-10">
        <Link href="/">
          <Image src="/assets/img/logo-principal.png" alt="Logo" width={200} height={200} />
        </Link>
      </div>
      <h1 className="text-2xl font-bold mt-4">Reset Your Password</h1>
      <p className="mt-2 text-gray-400">Please enter your new password below.</p>
      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-md">
        <label className="block text-sm font-medium">PASSWORD</label>
        <div className="relative mt-1">
          <input
            type="password"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
          />
        </div>
        <div className="mt-3 text-sm">
          <p className={requirements.length ? 'text-green-400' : 'text-red-400'}>✔ 10-40 characters</p>
          <p className={requirements.lowercase ? 'text-green-400' : 'text-red-400'}>✔ At least 1 lowercase letter</p>
          <p className={requirements.uppercase ? 'text-green-400' : 'text-red-400'}>✔ At least 1 uppercase letter</p>
          <p className={requirements.number ? 'text-green-400' : 'text-red-400'}>✔ At least 1 number</p>
          <p className={requirements.symbol ? 'text-green-400' : 'text-red-400'}>✔ At least 1 special character (!@#$%^&*...)</p>
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold disabled:opacity-50"
          disabled={!Object.values(requirements).every(Boolean) || loading}
        >
          {loading ? 'Updating...' : 'SUBMIT'}
        </button>
        {message && <p className="mt-4 text-center text-sm text-green-400">{message}</p>}
      </form>
    </div>
  );
}
