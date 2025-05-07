
import { LoginCredentials } from '@/app/lib/types';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const credentials: LoginCredentials = await request.json();
    const formData = new URLSearchParams({
        "grant_type": "password",
        "scope": "api",
        "client_id": process.env.CLIENT_ID? process.env.CLIENT_ID : "Acumatica",
        "client_secret": process.env.CLIENT_SECRET? process.env.CLIENT_SECRET : "Acumatica",
        "username": credentials.name,
        "password": credentials.password,
        "tenant": credentials.tenant,
        "branch": credentials.branch
      });
    console.log('formData object:', formData);
    const response = await fetch('https://diprec.acumatica.com/identity/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData.toString(),
    });
    console.log('Response status:', response.status);
    console.log('Response Body:', response.body);
    console.log('Response :', response);
    
    const cookies = response.headers.get('set-cookie');
    
    console.log('Cookies:', cookies);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: response.status }
      );
    }

    const responseData = await response.json();

   console.log('Response data:', responseData);
    // Create response with cookie
    const nextResponse = NextResponse.json(
      { success: true ,
        access_token: responseData.access_token,
      },
      { status: 200 }
    );

    // Forward the authentication cookie
   /* if (cookies) {
      nextResponse.headers.set('Set-Cookie', cookies);
    }*/
    nextResponse.cookies.set('accessToken', responseData.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/'
      });
    return nextResponse;
  } catch (error) {
    console.error('Error during authentication:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}