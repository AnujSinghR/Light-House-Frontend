import { useState } from 'react';
import './App.css';
import Home from './Home.js';
import LighthouseReport from './LighthouseReport.js';
import axios from 'axios';

function App() {
    const [Report,setReport] = useState();
    const [JobId,setJobId] = useState();
    const [showReport, setShowReport] = useState(false);
    // Helper function to wait for a specified amount of time
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let getReport = async (Url) => {
      try {
          // First API call to trigger the Lighthouse job and get the JobId
          const response = await axios.post('https://light-house-backend.vercel.app/lighthouse-request', { url: Url });
          const jobId = response.data; // Directly use response data as jobId
          console.log('Job ID:', jobId);

          // Second API call to get the Lighthouse report using the JobId
          const reportResponse = await axios.post('https://light-house-backend.vercel.app/lighthouse-get', { jobId:jobId });
          setReport(reportResponse.data); // Set the report data in state
          console.log(Report);

          setShowReport(true); // Show the report in the UI
      } catch (error) {
          console.error(error);
      }
  }

    return (
      <>
       
        <Home getReport={getReport} />
      </>
    )
}

export default App;
