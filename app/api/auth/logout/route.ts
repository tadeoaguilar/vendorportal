import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { success: true },
    { status: 200 }
  );
  const logout = await fetch('https://diprec.acumatica.com/identity/connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    }
    
  });
  console.log('Logout status:', logout.status);
  console.log('Logout Body:', logout.body);
  console.log('Logout :', logout);
  response.cookies.delete('accessToken');
  console.log('Logout Cooki deleted:');
  return response;
}