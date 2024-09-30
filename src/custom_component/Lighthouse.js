import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DiagnosticSection from './DiagnosticSection';

const Lighthouse = ({ lighthouse }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const scores = [
    { label: 'Performance', value: lighthouse.categories.performance.score * 100, color: 'bg-green-500' },
    
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSeverity = (score) => {
    if (score >= 90) return 'success';
    if (score >= 50) return 'warning';
    return 'error';
  };

  const metrics = [
    { name: 'First Contentful Paint', audit: 'first-contentful-paint' },
    { name: 'Largest Contentful Paint', audit: 'largest-contentful-paint' },
    { name: 'Total Blocking Time', audit: 'total-blocking-time' },
    { name: 'Cumulative Layout Shift', audit: 'cumulative-layout-shift' },
    { name: 'Speed Index', audit: 'speed-index' },
  ].map(metric => ({
    ...metric,
    value: lighthouse.audits[metric.audit]?.displayValue,
    score: lighthouse.audits[metric.audit]?.score * 100,
    severity: getSeverity(lighthouse.audits[metric.audit]?.score * 100)
  }));

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-lg shadow-2xl text-gray-200 font-sans space-y-12">
      {/* Scores Section */}
      <div className="flex flex-wrap justify-center gap-8 mb-6">
        {scores.map((score, index) => (
          <div key={index} className={`w-32 h-32 rounded-full flex flex-col items-center justify-center ${getScoreColor(score.value)} border-4 border-white shadow-lg transition-transform duration-300 hover:scale-110`}>
            <span className="text-sm font-semibold text-white">{score.label}</span>
            <span className="text-3xl font-bold text-white">{Math.round(score.value)}</span>
          </div>
        ))}
      </div>

      {/* Diagnostics Section */}
      <div>
        <DiagnosticSection data={lighthouse} />
      </div>

      {/* Metrics Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-bold">
            Metrics
          </h2>
          <button 
            onClick={() => toggleSection('metrics')}
            className="text-blue-400 underline font-semibold transition-colors duration-300 hover:text-blue-300 flex items-center"
          >
            {expandedSection === 'metrics' ? 'Collapse' : 'Expand'} view
            {expandedSection === 'metrics' ? <ChevronUp className="ml-1" /> : <ChevronDown className="ml-1" />}
          </button>
        </div>
        <div className={`grid gap-6 transition-all duration-500 ${expandedSection === 'metrics' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'}`}>
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                {metric.severity === 'error' && <span className="text-red-500 mr-2">▲</span>}
                {metric.severity === 'warning' && <span className="text-yellow-500 mr-2">■</span>}
                {metric.severity === 'success' && <span className="text-green-500 mr-2">●</span>}
                <span className="text-lg font-semibold">{metric.name}</span>
              </div>
              <div className={`text-4xl font-bold ${
                metric.severity === 'error' ? 'text-red-500' : 
                metric.severity === 'warning' ? 'text-yellow-500' : 
                'text-green-500'
              }`}>
                {metric.value}
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Score: {Math.round(metric.score)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lighthouse;