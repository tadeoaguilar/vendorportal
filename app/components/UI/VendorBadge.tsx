
import React from 'react';

interface VendorBadgeProps {
    KPI: string,
    
    Color: string,
    Legend: React.ReactNode,

}   

export const VendorBadge: React.FC<VendorBadgeProps> = ({KPI,Color,Legend}) => {


    return (
       
            <div className="container mx-auto p-8 ">
                <div className="flex items-center w-full">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${Color}`}>
 
                    </div>
                    <div className="ml-4">
                        <h4 className="text-lg font-semibold">{KPI}</h4>
          
                       {Legend}
                    </div>
                </div>
            </div>
            
       
    )
}