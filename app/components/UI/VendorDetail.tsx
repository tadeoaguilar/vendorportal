'use client'
import { VendorData } from '@/app/lib/types';
import React, { useState } from 'react';
import { useLoginData } from '@/app/context/UserContext';

interface Props {
    vendorData: VendorData[];
}   

export function VendorDetail({ vendorData }: Props) {
    const { loginData } = useLoginData();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Calculate pagination values
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = vendorData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(vendorData.length / itemsPerPage);

    // Handle page changes
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto bg-foreground p-8 rounded-3xl shadow-2xl">
            <div className="overflow-x-auto">
                <p className='text-gray-500'> {loginData.vendor} </p>
                <table className="min-w-full shadow-md rounded-lg">
                    <thead className="text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Ref</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                        </tr>
                    </thead>
                    <tbody className="bg-primary divide-y divide-gray-200">
                        {currentItems.map((vendorDetail: VendorData) => (
                            <tr key={vendorDetail.id} className="hover:bg-amber-300">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(vendorDetail.Date.value).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {vendorDetail.Status.value}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${vendorDetail.Amount.value.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {vendorDetail.Vendor.value}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {vendorDetail.ReferenceNbr.value}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {vendorDetail.VendorRef.value}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {vendorDetail.Type.value}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${vendorDetail.Balance.value.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, vendorData.length)} of {vendorData.length} entries
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border rounded-md text-sm font-medium 
                                     text-gray-700 bg-white hover:bg-gray-50 
                                     disabled:bg-gray-100 disabled:text-gray-400 
                                     disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 border rounded-md text-sm font-medium 
                                          ${currentPage === index + 1 
                                            ? 'bg-blue-500 text-white' 
                                            : 'text-gray-700 bg-white hover:bg-gray-50'
                                          }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border rounded-md text-sm font-medium 
                                     text-gray-700 bg-white hover:bg-gray-50 
                                     disabled:bg-gray-100 disabled:text-gray-400 
                                     disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorDetail;