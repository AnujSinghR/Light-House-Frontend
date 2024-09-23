import React, { useState, useEffect } from 'react';

function LCPElement({ pagespeed }) {
    const [imageUrl, setUrl] = useState(null);
    const [lcpDetails, setLcpDetails] = useState(null);

    useEffect(() => {
        const getLCPDetails = (pagespeed) => {
            const lcpElement = pagespeed?.lighthouseResult?.audits?.['largest-contentful-paint-element']?.details?.items[0]?.items[0]?.node;
            const lcpMetrics = pagespeed?.lighthouseResult?.audits?.['largest-contentful-paint'];
            
            if (!lcpElement || !lcpMetrics) return null;

            const url = lcpElement.snippet;

            // Extract the URL from the snippet using regex
            const regex = /src="([^"]+)"/;
            const match = url.match(regex);

            if (match && match[1]) {
                setUrl(match[1]);
            } else {
                console.error("URL not found");
            }

            return {
                label: lcpElement.nodeLabel,
                snippet: lcpElement.snippet,
                url: match?.[1] || null, // Use the extracted URL directly
                requestUrl: lcpElement?.resource?.url,
                resourceSize: lcpElement?.resource?.size || 'N/A',
                requestStartTime: lcpMetrics?.details?.timing?.startTime || 'N/A',
                requestDuration: lcpMetrics?.details?.timing?.duration || 'N/A',
                requestPriority: lcpElement?.resource?.priority || 'N/A',
                boundingRect: lcpElement.boundingRect,
            };
        };

        const details = getLCPDetails(pagespeed);
        setLcpDetails(details);
    }, [pagespeed]); // Re-run effect when pagespeed changes

    if (!lcpDetails) {
        return <div>No LCP Element found</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-bold mb-4">Largest Contentful Paint Element</h2>

            <div className="flex">
                {/* Image Section */}
                <div className="w-1/3 p-2">
                    {lcpDetails.url ? (
                        <img
                            src={lcpDetails.url}
                            alt="LCP element"
                            className="border border-red-600 p-1 rounded-md"
                        />
                    ) : (
                        <div>No image available</div>
                    )}
                </div>

                {/* Details Section */}
                <div className="w-2/3 p-4">
                    <h3 className="text-md font-bold mb-2">{lcpDetails.label}</h3>
                    <p className="text-gray-600"><strong>Title:</strong> {lcpDetails.snippet}</p>

                    {/* LCP Metrics */}
                    <div className="mt-4">
                        <p className="text-gray-600"><strong>LCP Request URL:</strong> {lcpDetails.requestUrl}</p>
                        <p className="text-gray-600"><strong>LCP Resource Size:</strong> {lcpDetails.resourceSize} KB</p>
                        <p className="text-gray-600"><strong>LCP Request Start Time:</strong> {lcpDetails.requestStartTime} s</p>
                        <p className="text-gray-600"><strong>LCP Request Duration:</strong> {lcpDetails.requestDuration} ms</p>
                        <p className="text-gray-600"><strong>LCP Request Priority:</strong> {lcpDetails.requestPriority}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LCPElement;
