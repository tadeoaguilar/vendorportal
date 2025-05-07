'use client';
import { VendorData } from '@/app/lib/types';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { VendorBadge } from './VendorBadge';
import { USDollar } from '@/app/lib/utils';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface VendorDetailProps {
    vendorData: VendorData[];
}   
interface GroupedData {
    yearMonth: string;
    totalBalance: number;
    totalAmount: number;
}
export const VendorTrend: React.FC<VendorDetailProps> = ({vendorData}) => {
    const groupedData = React.useMemo(() => {
        return vendorData.reduce((acc: { [key: string]: { balance: number; amount: number } }, item) => {
            const date = new Date(item.Date.value);
            const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            if (!acc[yearMonth]) {
                acc[yearMonth] = { balance: 0, amount: 0 };
            }
            
            acc[yearMonth].balance += item.Balance.value;
            acc[yearMonth].amount += item.Amount.value;
            
            return acc;
        }, {});
    }, [vendorData]);
    // Convert to array and sort by date
    const sortedData: GroupedData[] = Object.entries(groupedData)
    .map(([yearMonth, totals]) => ({
        yearMonth,
        totalBalance: totals.balance,
        totalAmount: totals.amount
    }))
    .sort((a, b) => a.yearMonth.localeCompare(b.yearMonth));

    console.log("Grouped Data:", groupedData);
    console.log("Sorted Data:", sortedData);    

    const chartData = {
      labels: sortedData.map(item => item.yearMonth),
      datasets: [
        {
    
          label: 'Balance',
          data: sortedData.map(item => item.totalBalance),
          borderColor: 'rgb(75, 192, 192)',
    
          tension: 0.1
        },
        {
    
          label: 'Amount',
          data: sortedData.map(item => item.totalAmount),
          borderColor: 'rgb(255, 99, 132)',
    
          tension: 0.1
        }
      ]
    };
    let variance:number = 0;
    const legend = (field: string) => {
      
      if (sortedData.length > 0) {
               
        if (sortedData.length > 1) {
        variance = ((sortedData[sortedData.length - 1][field as keyof GroupedData] as number) - (sortedData[sortedData.length - 2][field as keyof GroupedData] as number)) / (sortedData[sortedData.length - 2][field as keyof GroupedData] as number) * 100;
        
        } 
        
      }
      return (
        <>                
          <p className="text-sm text-gray-600">Last Month: {USDollar.format((sortedData[sortedData.length - 2][field as keyof GroupedData] as number))}</p>
          <p className="text-sm text-gray-600">Current Month: {USDollar.format((sortedData[sortedData.length - 1][field as keyof GroupedData]as number))}</p>    
          <p className="text-sm text-gray-600">Variance: %{variance.toFixed(2)}</p>    
        </>


      )
    }

    return (
      <>
      <VendorBadge 
        KPI="Total Balance"         
        Color="bg-green-500" 
        Legend={legend("totalBalance")} />
      <VendorBadge 
        KPI="Total Amount"         
        Color="bg-green-500" 
        Legend={legend("totalAmount")} />
      <div className="container flex-col mx-auto p-8">

        <Line 
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      </div>
      </>
    );
};