import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { success: true },
    { status: 200 }
  );
  const logout = fetch(`${process.env.ACUMATICA_API_ENDPOINT}/entity/auth/logout`, {
    method: 'POST'
  });




  console.log('Logout :', logout);
  response.cookies.delete('accessToken');
  console.log('Logout Cooki deleted:');
  return response;
}