'use client';

import { useEffect, useState, use } from 'react';
import { GradientContext } from './ContextAPI';

export default function FaviconUpdater() {

  const gradientContainer = use(GradientContext);

  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

  useEffect(() => {
    // Create the SVG for the favicon with the primary color
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <style>
            .styled {
                background: ${gradientContainer.style};
                line-height: 32px;
                text-align: center;
                font-size: 24px;
            }
      </style>
        <foreignObject x="0" y="0" width="32" height="32">
            <div xmlns="http://www.w3.org/1999/xhtml" class="styled" width="32" height = "32">
            G
            </div>
        </foreignObject>
      </svg>
    `;
    console.log(svg)
    const newBackground = `data:image/svg+xml;base64,${btoa(svg)}`; // Convert the SVG to a base64 string
    console.log(newBackground)
    setFaviconUrl(newBackground); // Set the favicon URL

    // Update the link tag in the HTML to use the new favicon
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    if (link) {
      link.href = `${newBackground}?t=${Date.now()}`;  // Append a timestamp to prevent caching
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.type = 'image/svg+xml';
      newLink.href = `${newBackground}?t=${Date.now()}`;
      document.head.appendChild(newLink);  // Add the new favicon to the document
    }

  }, [gradientContainer.style]);  // Re-run when the primary color changes

  if (!faviconUrl) return null;

  return <link rel="icon" type="image/svg+xml" href={faviconUrl} />;
}