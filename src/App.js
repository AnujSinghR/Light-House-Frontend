import { useState } from 'react';
import './App.css';
import Home from './Home.js';
import LighthouseReport from './LighthouseReport.js';
import axios from 'axios';

function App() {
    const [Report,setReport] = useState();
    const [showReport, setShowReport] = useState(false);
    let getReport = async(Url) =>{
      console.log(Url)
     await axios.post('https://light-house-backend.vercel.app/lighthouse',{url:Url})
      .then(function (response) {
        setReport(response);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      setShowReport(true);
    }

    return (
      <>
       {!showReport ? (
        <Home getReport={getReport} />
      ) : (
        <LighthouseReport report={Report} />
      )}
      </>
    )
}

export default App;
