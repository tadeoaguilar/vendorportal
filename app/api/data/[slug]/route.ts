import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Remove the revalidate constant since we'll handle caching differently
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get('accessToken');
    const pars = await params;
    const vendor = pars.slug; // Get
    console.log('Vendor:', vendor);
    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await fetch(
      `${process.env.ACUMATICA_API_ENDPOINT}/entity/${process.env.ACUMATICA_API_VERSION}/Bill?$top=100&$filter=Vendor eq '${vendor}'&$select=Date,Status,Amount,Vendor,ReferenceNbr,VendorRef,Balance,Type`,
      {
        cache: 'force-cache', // Use force-cache to cache the response
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken.value}`
        },
      }
    );

    if (!data.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data' },
        { status: data.status }
      );
    }
// Get the response text first
const text = await data.text();

// Check if we have any content
if (!text) {
  return NextResponse.json({ data: [] }, { status: 200 });
}

try {
  // Try to parse the JSON
  const vendorData = JSON.parse(text);
  
  // Create response with the data
  const nextResponse = NextResponse.json(vendorData);
  
  // Add cache control headers
  nextResponse.headers.set(
    'Cache-Control',
    'max-age=3600, s-maxage=3600, stale-while-revalidate=60'
  );
  
  return nextResponse;
} catch (parseError) {
  console.error('JSON Parse Error:', parseError, 'Response Text:', text);
  return NextResponse.json(
    { error: 'Invalid JSON response from API' },
    { status: 500 }
  );
}

} catch (error) {
console.error('Data fetch error:', error);
return NextResponse.json(
  { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
  { status: 500 }
);
}
}