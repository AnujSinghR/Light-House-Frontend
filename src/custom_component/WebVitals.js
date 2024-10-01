import React, { useState } from 'react';
import axios from 'axios';
import LCP_element from './LCP_element';

const WebVitals = ({ pagespeedDesktop, crux, URL }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState('desktop');
  const [pagespeedMobile,setPagespeedMobile] = useState(null);
  const [pagespeedData, setPagespeedData] = useState(pagespeedDesktop);

  const siteInfo = {
    image: pagespeedData.lighthouseResult.fullPageScreenshot.screenshot.data,
    title: pagespeedData.id,
    description: pagespeedData.id
  };

  const handleViewChange = async (view) => {
    if (view === activeView) return;

    
    
    try {
      if (view === 'mobile') {
        if (pagespeedMobile === null) {
          setIsLoading(true);
          const mobileData = await axios.post('https://light-house-backend.vercel.app/get-pagespeed-report-mobile', { url: URL });
          setPagespeedMobile(mobileData.data);
          setPagespeedData(mobileData.data);
        } else {
          setPagespeedData(pagespeedMobile);
        }
      } else {
        setPagespeedData(pagespeedDesktop);
      }
    } catch (error) {
      console.error(`Failed to fetch ${view} report:`, error);
    } finally {
      setIsLoading(false);
      setActiveView(view);
    }
  };

  const typeConfig = [
    { key: 'navigate', label: 'Navigate', color: '#34d399' },
    { key: 'navigate_cache', label: 'Navigate Cache', color: '#60a5fa' },
    { key: 'reload', label: 'Reload', color: '#a78bfa' },
    { key: 'back_forward', label: 'Back / Forward', color: '#f87171' },
    { key: 'back_forward_cache', label: 'Back / Forward Cached', color: '#fbbf24' },
    { key: 'restore', label: 'Restore', color: '#fb923c' },
    { key: 'prerender', label: 'Prerender', color: '#4ade80' }
  ];

  const totalValue = crux?.record?.metrics?.navigation_types?.fractions
    ? Object.values(crux.record.metrics.navigation_types.fractions).reduce((sum, value) => sum + value, 0)
    : 0;

  const MetricCard = ({ title, value, score }) => {
    if (value === undefined || score === undefined) return null;

    const getScoreColor = (score) => {
      if (score >= 0.9) return 'bg-green-100 border-green-500 text-green-800';
      if (score >= 0.5) return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      return 'bg-red-100 border-red-500 text-red-800';
    };

    return (
      <div className={`p-4 sm:p-6 rounded-lg border-l-4 ${getScoreColor(score)} shadow-lg transition transform hover:scale-105`}>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-2xl sm:text-3xl font-bold">{value}</p>
      </div>
    );
  };

  const renderMetricCards = (metrics) => {
    return metrics.map(({ title, value, score }, index) => (
      <MetricCard key={index} title={title} value={value} score={score} />
    ));
  };

  const getMetrics = (pagespeed) => ({
    pagespeedMetrics: [
      {
        title: "First Contentful Paint",
        value: pagespeed?.lighthouseResult?.audits?.['first-contentful-paint']?.displayValue,
        score: pagespeed?.lighthouseResult?.audits?.['first-contentful-paint']?.score
      },
      {
        title: "Largest Contentful Paint (LCP)",
        value: pagespeed?.lighthouseResult?.audits?.['largest-contentful-paint']?.displayValue,
        score: pagespeed?.lighthouseResult?.audits?.['largest-contentful-paint']?.score
      },
      {
        title: "Cumulative Layout Shift (CLS)",
        value: pagespeed?.lighthouseResult?.audits?.['cumulative-layout-shift']?.displayValue,
        score: pagespeed?.lighthouseResult?.audits?.['cumulative-layout-shift']?.score
      }
    ],
    additionalMetrics: [
      {
        title: "Time to Interactive",
        value: pagespeed?.lighthouseResult?.audits?.['interactive']?.displayValue,
        score: pagespeed?.lighthouseResult?.audits?.['interactive']?.score
      },
      {
        title: "Speed Index",
        value: pagespeed?.lighthouseResult?.audits?.['speed-index']?.displayValue,
        score: pagespeed?.lighthouseResult?.audits?.['speed-index']?.score
      },
      {
        title: "Time to First Byte",
        value: pagespeed?.lighthouseResult?.audits?.['server-response-time']?.numericValue + " ms",
        score: pagespeed?.lighthouseResult?.audits?.['server-response-time']?.score
      },
      {
        title: "Total Blocking Time",
        value: pagespeed?.lighthouseResult?.audits?.['total-blocking-time']?.displayValue,
        score: pagespeed?.lighthouseResult?.audits?.['total-blocking-time']?.score
      }
    ]
  });

  const { pagespeedMetrics, additionalMetrics } = getMetrics(pagespeedData);

  const cruxMetrics = [
    {
      title: "Interaction to Next Paint (CrUX)",
      value: crux?.record?.metrics?.interaction_to_next_paint?.percentiles?.p75 + " ms",
      score: 1
    },
    {
      title: "First Contentful Paint (CrUX)",
      value: crux?.record?.metrics?.first_contentful_paint?.percentiles?.p75
        ? (crux.record.metrics.first_contentful_paint.percentiles.p75 / 1000).toFixed(1) + " s"
        : undefined,
      score: pagespeedData?.lighthouseResult?.audits?.['first-contentful-paint']?.score
    },
    {
      title: "Largest Contentful Paint (CrUX)",
      value: crux?.record?.metrics?.largest_contentful_paint?.percentiles?.p75
        ? (crux.record.metrics.largest_contentful_paint.percentiles.p75 / 1000).toFixed(1) + " s"
        : undefined,
      score: pagespeedData?.lighthouseResult?.audits?.['largest-contentful-paint']?.score
    },
    {
      title: "Round Trip Time (CrUX)",
      value: crux?.record?.metrics?.round_trip_time?.percentiles?.p75 + " ms",
      score: crux?.record?.metrics?.round_trip_time?.percentiles?.p75
    }
  ];

  return (
    <div className="container mx-auto p-6 md:p-8 bg-gray-50 shadow-lg rounded-xl">
      <div className="mb-12 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Lighthouse Report</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => handleViewChange('desktop')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'desktop'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Desktop
          </button>
          <button
            onClick={() => handleViewChange('mobile')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeView === 'mobile'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Mobile
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-700 font-semibold">Loading {activeView} report...</p>
          </div>
        </div>
      )}

      {/* Site Info Section */}
      <div className="mb-12 flex items-center bg-white p-6 rounded-lg shadow-md">
        {siteInfo?.image && (
          <img src={siteInfo.image} alt={siteInfo.title} className="w-24 h-24 rounded-lg mr-4" />
        )}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{siteInfo?.title || 'Website Title'}</h2>
          <p className="text-gray-600">{siteInfo?.description || 'Website description goes here.'}</p>
        </div>
      </div>

      {/* Pagespeed Metrics Section */}
      {pagespeedData && (
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Lab Test Result From Page Speed ({activeView})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderMetricCards(pagespeedMetrics)}
          </div>
        </div>
      )}

      {/* Navigation Types Section */}
      {crux?.record?.metrics?.navigation_types?.fractions && (
        <div className="mx-auto mt-8 mb-12 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Navigation Types</h2>
          <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            {typeConfig.map((type, index) => {
              const fraction = crux.record.metrics.navigation_types.fractions[type.key] || 0;
              const width = (fraction / totalValue) * 100;
              const left = typeConfig.slice(0, index).reduce((sum, prevType) => {
                const prevFraction = crux.record.metrics.navigation_types.fractions[prevType.key] || 0;
                return sum + (prevFraction / totalValue) * 100;
              }, 0);

              return (
                <div
                  key={type.key}
                  className="absolute h-full transition-all duration-300 ease-in-out hover:brightness-90"
                  style={{
                    width: `${width}%`,
                    left: `${left}%`,
                    backgroundColor: type.color
                  }}
                  title={`${type.label}: ${(fraction * 100).toFixed(1)}%`}
                />
              );
            })}
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {typeConfig.map((type) => {
              const fraction = crux.record.metrics.navigation_types.fractions[type.key] || 0;
              return (
                <div key={type.key} className="flex items-center">
                  <div
                    className="w-4 h-4 mr-2 rounded shadow-md"
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {type.label}: {(fraction * 100).toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CrUX Metrics Section */}
      {crux && (
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">CrUX Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderMetricCards(cruxMetrics)}
          </div>
        </div>
      )}

      {/* Additional Metrics Section */}
      {pagespeedData && (
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Additional Metrics ({activeView})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderMetricCards(additionalMetrics)}
          </div>
        </div>
      )}

      {/* LCP Element Section */}
      {pagespeedData && (
        <LCP_element pagespeedDesktop={pagespeedData} />
      )}
    </div>
  );
};

export default WebVitals;