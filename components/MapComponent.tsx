'use client';

import { useState } from 'react';

interface MapComponentProps {
  address: string;
  title?: string;
  className?: string;
}

export function MapComponent({
  address,
  title = 'Location Map',
  className = '',
}: MapComponentProps) {
  const [mapError, setMapError] = useState(false);

  // Google Maps search URL
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleMapError = () => {
    setMapError(true);
  };

  if (mapError) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative text-right w-full h-0 pb-[66.66666666666666%]">
          <div
            className="overflow-hidden bg-gray-200 w-full h-full absolute top-0 left-0 border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
            onClick={() => window.open(mapsUrl, '_blank')}
          >
            <div className="text-center text-gray-600 p-8">
              <div className="text-6xl mb-4">📍</div>
              <h3 className="font-serif text-2xl mb-4">{title}</h3>
              <p className="text-lg mb-2 font-sans">680 Võ Nguyên Giáp, P.Khuê Mỹ</p>
              <p className="text-lg mb-6 font-sans">quận Ngũ Hành Sơn, Đà Nẵng</p>
              <div className="text-sm text-gray-500 font-sans">Nhấp để mở Google Maps</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative text-right w-full h-0 pb-[66.66666666666666%]">
        <div className="overflow-hidden bg-none w-full h-full absolute top-0 left-0">
          <iframe
            className="w-full h-full absolute top-0 left-0"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=680%20v%C3%B5%20nguy%C3%AAn%20gi%C3%A1p&t=&z=13&ie=UTF8&iwloc=B&output=embed"
            title={title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onError={handleMapError}
          />
        </div>
      </div>
    </div>
  );
}
