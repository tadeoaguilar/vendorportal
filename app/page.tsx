//import Image from "next/image";
import { cookies } from 'next/headers';

/* eslint-disable */
export default async function Home() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('accessToken');
  console.log("Access Token:", accessToken?.value);
   console.log("Fetching data with headers...");
  const data = await fetch("https://diprec.acumatica.com/entity/Default/23.200.001/Bill?$top=10&$filter=Vendor eq 'MAP0036'&$select=Amount,Vendor,ReferenceNbr", {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
       'Authorization': `Bearer ${accessToken?.value}`
    },
  });


  console.log("data",data)
  if (!data.ok) {
    throw new Error('Failed to fetch data');
  }

  const posts = await data.json()
  //console.log(posts)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      
      {
      posts.map((post: {id:string, ReferenceNbr:{value: number},  Vendor:{value: number}} ) => (
        
       console.log(post)
        
      ))
      }

      {posts.map((post: {id:string, ReferenceNbr:{value: number},  Vendor:{value: number}} ) => (
        
        <li key={post.id}> {post.ReferenceNbr.value} - {post.Vendor.value}</li>
        
      ))}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
       
      </footer>
    </div>
  );
}
/* eslint-disable */