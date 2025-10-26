'use client';

import React from 'react';
import { BackgroundConfig } from '@/config/content';

interface BackgroundImageProps {
  config?: BackgroundConfig;
  className?: string;
  children?: React.ReactNode;
}

export function BackgroundImage({ config, className = '', children }: BackgroundImageProps) {
  if (!config?.image && !config?.gradient) {
    return <div className={className}>{children}</div>;
  }

  const backgroundStyle: React.CSSProperties = {};

  if (config.image) {
    backgroundStyle.backgroundImage = `url(${config.image})`;
    backgroundStyle.backgroundRepeat = config.repeat ? 'repeat' : 'no-repeat';
    backgroundStyle.backgroundPosition = config.position || 'center';
    backgroundStyle.backgroundSize = config.size || 'cover';
  }

  if (config.gradient) {
    backgroundStyle.background = config.gradient;
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          ...backgroundStyle,
          opacity: config.opacity || 1,
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
