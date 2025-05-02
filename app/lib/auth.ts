import { LoginCredentials } from './types';

export async function login(credentials: LoginCredentials) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entity/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Authentication failed');
  }

  return response;
}