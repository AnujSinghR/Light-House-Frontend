import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LighthouseReport from "./LighthouseReport";
import Sidebar from "./Sidebar";
import { Menu, X } from 'lucide-react';
import { useState } from "react";
import WebVitals from './WebVitals';
import Lighthouse from './Lighthouse';

const Report = ({pagespeedDesktop,Crux,URL}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
          <Router>
            <div className="flex bg-gray-100 min-h-screen pt-20">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 md:ml-64">
          <button 
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-40 md:hidden bg-blue-500 text-white p-2 rounded-md"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Routes>
            <Route path="/" element={<WebVitals URL={URL} crux={Crux.data} pagespeedDesktop={pagespeedDesktop.data}/>} />
            <Route path="/Web-Vitals" element={<WebVitals URL={URL} crux={Crux.data} pagespeedDesktop={pagespeedDesktop.data}/>} />
            <Route path="/lighthouse" element={<Lighthouse lighthouse={pagespeedDesktop.data.lighthouseResult}/>}/>
          </Routes>
          </div>
          </div>
    </Router>
      
    );
  };
  
  export default Report;