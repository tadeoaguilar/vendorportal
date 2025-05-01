//import Image from "next/image";



export default async function Home() {
  const data = await fetch("https://diprec.acumatica.com/entity/Default/23.200.001//Bill?$top=10&$filter=Vendor eq 'MAP0036'&$select=Amount,Vendor,ReferenceNbr",
    {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer D7oT1pBt1XwcaGac6-geDsjEtWsAvbJrDcGcw6RDKek`,
        "Content-Type": 'application/json',
        "Cookie": ".ASPXAUTH=067EC596C12B2642BBC1E16E2E1DA76E763820009856B4127213E247DD544382BEB1095101D06F5DDDDE1794DE2206DE7DB636A49D635685F6BEFDAE3FEC47496D9587192F7E88A9CE8419E0EA15903A80DF680D18499A5E6042D3CFB57B3EB507F6FB27DB5CB2EBAB8846D6D6FEC5E13C2E979C1F9276814C2AE7E52071F7A7D647898AF99343A49358E0ABB18869DDFE36516D; ASP.NET_SessionId=j3ixra2vwzkvaiuogai3i2vq; CompanyID=ZUBRAUN; Locale=TimeZone=GMTM0600M&Culture=en-US; UserBranch=1; requestid=4FBDD1C36B026D8311F026D0EDF9472D; requeststat=+st:586+sc:~/entity/auth/login+start:638817307322935720+tg:"
    }
  }
    
  )
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
