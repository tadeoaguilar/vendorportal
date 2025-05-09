'use client';

import { useState } from 'react';
import { LoginCredentials } from '../lib/types';
import { useLoginData } from '@/app/context/UserContext';
export default function LoginForm() {
  const { loginData, setLoginData } = useLoginData();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    name: '',
    password: '',
    tenant: '',
    branch: '',
    vendor: ''
  });
    
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Client - Submitting login form with credentials:', credentials);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        // Remove password before storing in context
        const loginDataToStore = {
          ...credentials,
          password: '' // Don't store password in context/localStorage
        };
        setLoginData(loginDataToStore);
        console.log('Login successful:', loginDataToStore);
        window.location.href = '/';
      } else {
        const error = await response.json();
        console.error('Login failed:', error);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  const handleInputChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials({
      ...credentials,
      [field]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-blue-500" >
      <input
        type="text"
        placeholder="Username"
        value={credentials.name}
        onChange={handleInputChange('name')}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleInputChange('password')}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Tenant"
        value={credentials.tenant}
        onChange={handleInputChange('tenant')}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Vendor"
        value={credentials.vendor}
        onChange={handleInputChange('vendor')}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Branch"
        value={credentials.branch}
        onChange={handleInputChange('branch')}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  );
}