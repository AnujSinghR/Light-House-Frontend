import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

function DiagnosticItem({item,report}){

    const [isOpen, setIsOpen] = useState(false);

  
    return(<>
     <div className="border-b border-gray-700">
      <div 
        className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors duration-150"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3 flex-grow">
        <div className={`w-4 h-4 rounded-sm`}></div>
          <span className="text-gray-200 text-sm">{report.audits[item].title}</span>
        </div>
      </div>
      {isOpen && (
        <div className="bg-gray-800 py-3 px-4 text-sm">
          <p className="text-gray-300">{report.audits[item].description}</p>
        </div>
      )}
    </div>
    </>)
}
export default DiagnosticItem;