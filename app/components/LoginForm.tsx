'use client';

import { useState } from 'react';
import { LoginCredentials } from '../lib/types';

export default function LoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    name: '',
    password: '',
    tenant: '',
    branch: ''
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
        window.location.href = '/';
      } else {
        const error = await response.json();
        console.error('Login failed:', error);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setCredentials({...credentials, name: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Tenant"
        onChange={(e) => setCredentials({...credentials, tenant: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Branch"
        onChange={(e) => setCredentials({...credentials, branch: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  );
}