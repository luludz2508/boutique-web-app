'use client';

import React from 'react';
import { BackgroundConfig } from '@/config/content';

interface BackgroundImageProps {
  config?: BackgroundConfig;
  className?: string;
  children?: React.ReactNode;
}

export function BackgroundImage({ config, className = '', children }: BackgroundImageProps) {
  if (!config?.image) {
    return <div className={className}>{children}</div>;
  }

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${config.image})`,
    backgroundRepeat: config.repeat ? 'repeat' : 'no-repeat',
    backgroundPosition: config.position || 'center',
    backgroundSize: config.size || 'cover',
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          ...backgroundStyle,
          opacity: config.opacity || 1,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
