import { useState } from 'react';
import './App.css';
import Header from './custom_component/Header.js';
import Home from './Home.js';
import LoadingAnimation from './custom_component/LoadingAnimation.js';
import axios from 'axios';
import Report from './custom_component/Report.js';

function App() {
  const [report, setReport] = useState(null);
  const [pagespeed, setPagespeed] = useState(null);
  const [crux, setCrux] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // Helper function to wait for a specified amount of time
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  let getReport = async (Url) => {
    try {
    //  setIsLoading(true);
    //  // First API call to trigger the Lighthouse job and get the JobId
    //  const response = await axios.post('https://light-house-backend.vercel.app/lighthouse-request', { url: Url });
    //  const jobId = response.data; // Directly use response data as jobId
    //  console.log('Job ID:', jobId);
    //  
    //  //set timeout for 120s..
    //  await wait(90000);
      
      // Second API call to get the Lighthouse report using the JobId
      console.log(Url);
      //const reportResponse = await axios.post('https://light-house-backend.vercel.app/lighthouse-get', { jobId: Url });
      //setReport(reportResponse); // Set the report data in state
      //console.log(reportResponse);
      
      setIsLoading(true);

      // Fetch Pagespeed report
      const pagespeedResponse = await axios.post('https://light-house-backend.vercel.app/get-pagespeed-report', { url: Url });
      setPagespeed(pagespeedResponse);

      // Fetch CrUX report
      const cruxResponse = await axios.post('https://light-house-backend.vercel.app/get-crux-report', { url: Url });
      setCrux(cruxResponse);
      setIsLoading(false);
      setShowReport(true); // Show the report once both reports are received
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <>
    <Header/>
      {isLoading ? (
        <LoadingAnimation />
      ) : !showReport ? (
        <Home getReport={getReport} />
      ) : (
        <Report Crux={crux} pagespeed={pagespeed} />
      )}
    </>
  )
}

export default App;