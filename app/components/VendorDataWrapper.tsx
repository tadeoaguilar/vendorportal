'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { VendorData } from '../lib/types';
import React from 'react';
import { VendorTrend } from './UI/VendorTrend';
import VendorDetail from './UI/VendorDetail';
import { useLoginData } from '../context/UserContext';



export function VendorDataWrapper() {
  const [vendorData, setVendorData] = useState<VendorData[]>([]);
  const router = useRouter();


    const { loginData } = useLoginData();


   
    const fetchData = async () => {
      try {
        console.log('VendorDataWrapper - loginData:', loginData);
        if (!loginData) {
          console.log('Vendor not found in loginData');
          return;
        }
        // Fetch vendor data from the API
        const vendor = loginData.vendor;
        if (!vendor || vendor === '') { 
            console.log('Vendor not found in loginData');
            return; 
        }

        const response = await fetch(`/api/data/${loginData.vendor}`, {
          method: 'GET'
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login');
            return;
          }
          
        }
        console.log('VendorDataWrapper - response:', response);
        const data = await response.json();
        setVendorData(data);
      } catch (error) {
        console.error('Failed to fetch vendor data:', error);
      }
    };
  useEffect(() => {
    fetchData();
 }, [loginData]);
  console.log('VendorDataWrapper - vendorData:', vendorData);
  return (
    <>
       <VendorTrend vendorData={vendorData} />
       <VendorDetail vendorData={vendorData} />
    </>
  );
}