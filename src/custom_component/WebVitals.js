import React from 'react';
import { AlertCircle, InfoIcon } from 'lucide-react';

const MetricCard = ({ title, value, unit, percentage, trend }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <div className="text-sm text-gray-600 mb-2">{title}</div>
    <div className="text-2xl font-bold">{value} <span className="text-sm font-normal">{unit}</span></div>
    <div className="mt-2 flex items-center">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${
            percentage >= 90 ? 'bg-green-500' : 
            percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
          }`} 
          style={{width: `${percentage}%`}}
        ></div>
      </div>
      <span className="ml-2 text-sm font-medium">{percentage}%</span>
    </div>

  </div>
);

const WebVitals = ({webVitals}) => {
  return (
    <div className="bg-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Real User Data From Google <InfoIcon className="inline-block ml-1" size={16} /></h2>
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <AlertCircle className="inline-block text-red-500 mr-2" size={20} />
          <span className="text-sm">Improve the Interaction to Next Paint metric to rank better in Google. At least 75% of users need have a good experience to get the maximum ranking boost.</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="First Contentful Paint (CrUX) - URL"
           value={webVitals['first-contentful-paint'].displayValue}
            unit="s" percentage={webVitals['first-contentful-paint'].score*100} trend={true} />
          <MetricCard title="Largest Contentful Paint (CrUX) - URL" 
          value={webVitals['largest-contentful-paint'].displayValue}
           unit="s"
            percentage={webVitals['largest-contentful-paint'].score*100}
             trend={true} />
          <MetricCard title="Cumulative Layout Shift (CrUX) - URL"
           value={webVitals['cumulative-layout-shift'].displayValue}
            unit=""
             percentage={webVitals['cumulative-layout-shift'].score*100} trend={true} />
          <MetricCard title="Interaction to Next Paint (CrUX) - URL" value="261" unit="ms" percentage={64} trend={true} />
        </div>
      </div>
    </div>
  );
};

export default WebVitals;