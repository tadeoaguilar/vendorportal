import { VendorData } from '@/app/lib/types';
import React from 'react';

interface VendorDetailProps {
    vendorData: VendorData[];
}   

export const VendorDetail: React.FC<VendorDetailProps> = ({vendorData}) => {
    return (
        <div className="container mx-auto bg-foreground p-8 rounded-3xl shadow-2xl">
      <div className="overflow-x-auto">
        <table className="min-w-full  shadow-md rounded-lg">
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
            {vendorData.map((vendorDetail:VendorData ) => (
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
      </div>
    </div>
    );
};

export default VendorDetail;