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

  // Generate a proper Google Maps embed URL
  const generateMapUrl = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOWWgU6xqarR2Y&q=${encodedAddress}`;
  };

  // Fallback URL for the specific address - Da Nang location
  const fallbackUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.856168698467!2d108.24999!3d16.0544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792dfa7a9%3A0x4b0c3e5c8b8b8b8b!2zNjgwIFbDvSBHeeG6pXUgR2nDqmFwLCBQLktoeeG7gWUgTeG7mSwgcXXhuq1uIE5nxrDhu51uIEjhu5kgU8ahbiwgxJDDtG5nIE5hbSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1703123456789';

  const handleMapError = () => {
    setMapError(true);
  };

  if (mapError) {
    return (
      <div
        className={`bg-neutral-200 h-96 border border-neutral-300 rounded-lg overflow-hidden flex items-center justify-center ${className}`}
      >
        <div className="text-center text-neutral-600">
          <div className="text-4xl mb-4">📍</div>
          <h3 className="font-serif text-xl mb-2">Bản Đồ Showroom</h3>
          <p className="text-sm mb-4">680 Võ Nguyên Giáp, P.Khuê Mỹ</p>
          <p className="text-sm">quận Ngũ Hành Sơn, Đà Nẵng</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-accent-400 text-neutral-900 rounded hover:bg-accent-500 transition-colors"
          >
            Mở Google Maps
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-neutral-200 h-96 border border-neutral-300 rounded-lg overflow-hidden ${className}`}
    >
      <iframe
        src={fallbackUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        onError={handleMapError}
      />
    </div>
  );
}
