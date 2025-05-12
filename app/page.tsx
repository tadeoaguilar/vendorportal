'use client'

import { MenuBar } from './components/UI/MenuBar';
import VendorDetail from './components/UI/VendorDetail';
import { VendorTrend } from './components/UI/VendorTrend';
import { VendorDataWrapper } from './components/VendorDataWrapper';

export default function Home() {
  return (
    <>
      <MenuBar/>
      <VendorDataWrapper />
    </>
    
  );
}
