import React, { useState, useMemo } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

const DiagnosticSection = ({ data }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const diagnosticsList = [
    'bootup-time', 'critical-request-chains', 'dom-size', 'duplicated-javascript',
    'efficient-animated-content', 'font-display', 'largest-contentful-paint-element',
    'layout-shifts', 'lcp-lazy-loaded', 'legacy-javascript', 'long-tasks',
    'mainthread-work-breakdown', 'modern-image-formats', 'no-document-write',
    'non-composited-animations', 'offscreen-images', 'prioritize-lcp-image',
    'redirects', 'render-blocking-resources', 'server-response-time',
    'third-party-facades', 'total-byte-weight', 'unminified-css',
    'unminified-javascript', 'unsized-images', 'unused-css-rules',
    'unused-javascript', 'user-timings', 'uses-long-cache-ttl',
    'uses-optimized-images', 'uses-passive-event-listeners', 'uses-rel-preconnect',
    'uses-responsive-images', 'uses-text-compression', 'viewport',
  ];

  const sections = useMemo(() => {
    if (!data?.audits) return [];

    return diagnosticsList
      .map((key) => {
        const audit = data.audits[key];
        if (!audit) return null;

        let impact;
        if (audit.score === null || audit.score >= 0.9) impact = 'Low';
        else if (audit.score >= 0.5) impact = 'Medium';
        else impact = 'High';

        return {
          title: audit.title,
          description: audit.description,
          score: audit.score,
          headings: audit.details?.headings,
          table: audit.details?.items || null,
          impact,
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        const impactOrder = { High: 0, Medium: 1, Low: 2 };
        return impactOrder[a.impact] - impactOrder[b.impact];
      });
  }, [data]);

  const toggleSection = (sectionTitle) => {
    setExpandedSection((prev) => (prev === sectionTitle ? null : sectionTitle));
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl">
      <h2 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Performance Diagnostics
      </h2>
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="bg-gray-800 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full text-left p-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <div className="flex items-center space-x-3">
                <span className={`w-3 h-3 rounded-full ${getImpactColor(section.impact)}`}></span>
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(section.impact)} text-white`}>
                  {section.impact}
                </span>
                <span className="font-medium text-gray-300">
                  Score: {section.score !== null ? Math.round(section.score * 100) : 'N/A'}
                </span>
                {expandedSection === section.title ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>
            {expandedSection === section.title && (
              <div className="p-4 bg-gray-700">
                <p className="text-gray-300 mb-4">{section.description}</p>
                {section.table && section.headings && section.table.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-600">
                      <thead className="bg-gray-800">
                        <tr>
                          {section.headings.map((heading, index) => (
                            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                              {heading.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-gray-700 divide-y divide-gray-600">
                        {section.table.map((item, index) => (
                          <tr key={index}>
                            {section.headings.map((heading, cellIndex) => (
                              <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {typeof item[heading.key] === 'object' ? JSON.stringify(item[heading.key]) : item[heading.key]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosticSection;
