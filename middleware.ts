import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }
  
  const accessToken = request.cookies.get('accessToken');
  

 // console.log("Auth Cookie:", accessToken?.value);
  //console.log("Auth :", accessToken);
  
  if (!accessToken && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};