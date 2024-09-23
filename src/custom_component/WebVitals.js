import React from 'react';
import LCP_element from './LCP_element';

const WebVitals = ({ pagespeed, crux}) => {
  const siteInfo = {
    image:pagespeed.lighthouseResult.fullPageScreenshot.screenshot.data,
    title:pagespeed.id,
    description:pagespeed.id

  } 
  console.log(pagespeed);
  console.log('Crux report', crux);

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

  const pagespeedMetrics = [
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
  ];

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
      score: pagespeed?.lighthouseResult?.audits?.['first-contentful-paint']?.score
    },
    {
      title: "Largest Contentful Paint (CrUX)",
      value: crux?.record?.metrics?.largest_contentful_paint?.percentiles?.p75
        ? (crux.record.metrics.largest_contentful_paint.percentiles.p75 / 1000).toFixed(1) + " s"
        : undefined,
      score: pagespeed?.lighthouseResult?.audits?.['largest-contentful-paint']?.score
    },
    {
      title: "Round Trip Time (CrUX)",
      value: crux?.record?.metrics?.round_trip_time?.percentiles?.p75 + " ms",
      score: crux?.record?.metrics?.round_trip_time?.percentiles?.p75
    }
  ];

  const additionalMetrics = [
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
  ];

  return (
    <div className="container mx-auto p-6 md:p-8 bg-gray-50 shadow-lg rounded-xl">
      <div className="mb-12 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Lighthouse Report</h1>
      </div>

      {/* New Section for Site Info */}
      <div className="mb-12 flex items-center bg-white p-6 rounded-lg shadow-md">
        {siteInfo?.image && (
          <img src={siteInfo.image} alt={siteInfo.title} className="w-24 h-24 rounded-lg mr-4" />
        )}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{siteInfo?.title || 'Website Title'}</h2>
          <p className="text-gray-600">{siteInfo?.description || 'Website description goes here.'}</p>
        </div>
      </div>

      {pagespeed && (
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Lab Test Result From Page Speed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderMetricCards(pagespeedMetrics)}
          </div>
        </div>
      )}

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

      {crux && (
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">CrUX Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderMetricCards(cruxMetrics)}
          </div>
        </div>
      )}

      {pagespeed && (
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Additional Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderMetricCards(additionalMetrics)}
          </div>
        </div>
      )}

      {pagespeed && <LCP_element pagespeed={pagespeed} />}
    </div>
  );
};

export default WebVitals;
