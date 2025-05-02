import { NextResponse } from 'next/server';
import { login } from '../../lib/auth'; // Adjust the import path as necessary
// Adjust the import path to the correct location
import { LoginCredentials } from '../../lib/types';

export async function POST(request: Request) {
  try {
    const credentials: LoginCredentials = await request.json();
    const authResponse = await login(credentials);
    const authCookie = authResponse.headers.get('set-cookie');

    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    if (authCookie) {
      response.headers.set('Set-Cookie', authCookie);
    }

    return response;
  } catch (error) {
    console.log(error)
    return NextResponse.json(
        
      { success: false, error: 'Authentication failed' },
      { status: 401 }
    );
  }
}