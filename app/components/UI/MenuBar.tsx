'use client';

import Link from 'next/link';
import { useLoginData , } from '@/app/context/UserContext';
import { useState } from 'react';
import { LoginCredentials } from '@/app/lib/types';

export  function MenuBar() {
  const { loginData,setLoginData } = useLoginData();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const emptyUser:LoginCredentials={
    name: '',
    password: '',
    tenant: 'PRUEBA',
    branch: 'BRANCH',
    vendor: 'MAP0036'
  }
  const menuItems = [
    { name: 'Financial', href: '/financial' },
    { name: 'Invoices', href: '/invoices' },
    { name: 'Purchase Orders', href: '/purchase-orders' },
    { name: 'Documents', href: '/documents' },
  ];
  const logout = async () => {
    try {
    
      const response = await fetch('/api/auth/logout', {
        method: 'POST',      
      });

      if (response.ok) {
        setLoginData(emptyUser);
        console.log('Logout successful:', emptyUser);
        
        window.location.href = '/login';
      } else {
        const error = await response.json();
        console.log('Logout failed:', error);
      }
    } catch (error) {
      console.log('Login failed:', error);
    }
  };



         
         
         
   
   

  return (
    <nav className="bg-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="inline-flex items-center px-3 py-2 my-3 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
              >
                <span>{loginData?.name || 'Profile'}</span>
                <svg
                  className={`ml-2 h-5 w-5 transform ${isProfileOpen ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}