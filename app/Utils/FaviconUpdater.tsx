'use client';

import { useEffect, useState, use } from 'react';
import { GradientContext } from './ContextAPI';

export default function FaviconUpdater() {

  const gradientContainer = use(GradientContext);

  const [faviconUrl, setFaviconUrl] = useState<string | null>("data:image/svg+xml;base64,CiAgICAgIDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiI+CiAgICAgIDxzdHlsZT4KICAgICAgICAgICAgLnN0eWxlZCB7CiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMHJhZCBpbiBzcmdiLCAjZjU4MjI0ZmYgMCUgMTAlICk7CiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMzJweDsKICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDsKICAgICAgICAgICAgfQogICAgICA8L3N0eWxlPgogICAgICAgIDxmb3JlaWduT2JqZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+CiAgICAgICAgICAgIDxkaXYgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIGNsYXNzPSJzdHlsZWQiIHdpZHRoPSIzMiIgaGVpZ2h0ID0gIjMyIj4KICAgICAgICAgICAgRwogICAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2ZvcmVpZ25PYmplY3Q+CiAgICAgIDwvc3ZnPgogICAg");

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
    const newBackground = `data:image/svg+xml;base64,${btoa(svg)}`; // Convert the SVG to a base64 string
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