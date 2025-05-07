
import { cookies } from 'next/headers';

import VendorDetail from './components/UI/VendorDetail';
import { VendorTrend } from './components/UI/VendorTrend';
import { redirect } from 'next/navigation';



export const revalidate = 3600; // invalidate every hour


export default async function Home() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('accessToken');
  console.log("Access Token:", accessToken?.value);
   console.log("Fetching data with headers...");
  const data = await 
  fetch(`${process.env.ACUMATICA_API_ENDPOINT }/entity/${process.env.ACUMATICA_API_VERSION}/Bill?$top=100&$filter=Vendor eq 'MAP0036'&$select=Date,Status,Amount,Vendor,ReferenceNbr,VendorRef,Balance,Type`, 
    {
    cache: 'force-cache',    
    headers: {
      
      'Content-Type': 'application/json',
      'Accept': 'application/json',
       'Authorization': `Bearer ${accessToken?.value}`
    },
  });
   // Add cache validation
   const cacheStatus = data.headers.get('x-vercel-cache') || 'Not cached';
   console.log('Cache status:', cacheStatus);
 
   // Log response headers for cache inspection
   console.log('Cache-Control:', data.headers.get('cache-control'));
   console.log('Age:', data.headers.get('age'));
  
  if (!data.ok) {
    console.log("Error fetching data:", data.status, data.statusText);
  
  }
  if (data.status === 401) {
    console.log("Unauthorized access - redirecting to login page");
    redirect('/login');
    
  
  }
  const vendorData = data.ok ? await data.json() : [];
  return (
    <>
      
      <VendorTrend vendorData={vendorData} />
    
      <VendorDetail vendorData={vendorData} />
    </>
  );
}
