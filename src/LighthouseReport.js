import React from 'react';

// Progress bar component for displaying scores
const ProgressBar = ({ label, value, color }) => {
  const circleRadius = 40;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progressOffset = ((100 - value) / 100) * circleCircumference;

  return (
    <div className="flex flex-col items-center space-y-2 transform transition-transform hover:scale-105">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={circleRadius}
          stroke="lightgray"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx="50%"
          cy="50%"
          r={circleRadius}
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circleCircumference}
          strokeDashoffset={progressOffset}
          style={{ transition: 'stroke-dashoffset 0.35s ease' }}
        />
      </svg>
      <span className="text-xl font-semibold">{label}</span>
      <span className="text-lg font-medium text-gray-600">{value}%</span>
    </div>
  );
};

// Main component to display Lighthouse results
const LighthouseReport = ({ report }) => {
  // Check if the report is available and has the necessary data
  if (!report || !report.data || !report.data.categories) {
    return <div className="text-center mt-8 text-lg">Loading report...</div>;
  }

  // Destructure the scores from the report (Performance, Accessibility, etc.)
  const {
    performance,
    accessibility,
    'best-practices': bestPractices,
    seo
  } = report.data.categories;

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-extrabold text-center mb-12">Lighthouse Report</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProgressBar label="Performance" value={performance.score * 100} color="#34D399" />
        <ProgressBar label="Accessibility" value={accessibility.score * 100} color="#60A5FA" />
        <ProgressBar label="Best Practices" value={bestPractices.score * 100} color="#FBBF24" />
        <ProgressBar label="SEO" value={seo.score * 100} color="#A78BFA" />
      </div>

      {/* Section for more detailed report */}
      <div className="mt-16 bg-gray-50 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Detailed Breakdown</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <strong>Performance:</strong> 
            <span>{performance.description || 'No description available'}</span>
          </div>
          <div className="flex justify-between items-center">
            <strong>Accessibility:</strong>
            <span>{accessibility.description || 'No description available'}</span>
          </div>
          <div className="flex justify-between items-center">
            <strong>Best Practices:</strong>
            <span>{bestPractices.description || 'No description available'}</span>
          </div>
          <div className="flex justify-between items-center">
            <strong>SEO:</strong>
            <span>{seo.description || 'No description available'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LighthouseReport;
