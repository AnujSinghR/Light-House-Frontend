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
    let getReport = async(Url) =>{
     await axios.post('https://light-house-backend.vercel.app/lighthouse-request',{url:Url})
      .then(function (response) {
        setJobId(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log("wait for 90s");
      //set wait method for wait for getting report then hit api again nerly 90 s
      console.log(JobId);
      await axios.post('https://light-house-backend.vercel.app/lighthouse-get',{jobId:JobId})
        .then(function (response){
          setReport(response);
          console.log(Report);
        })
        .catch(function (error){
          console.error(error);
        })
      setShowReport(true);
    }

    return (
      <>
       {!showReport ? (
        <Home getReport={getReport} />
      ) : (
        <LighthouseReport report={Report.data.report} />
      )}
      </>
    )
}

export default App;
