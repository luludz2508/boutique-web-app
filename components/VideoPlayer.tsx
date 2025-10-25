"use client";

import { useState } from "react";

interface VideoPlayerProps {
  src: string;
  fallbackSrc?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: string;
  controls?: boolean;
}

export default function VideoPlayer({
  src,
  fallbackSrc = "/tramhuong-sonhong/master-video-1.mp4",
  className = "w-full h-full object-cover",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = "auto",
  controls = false,
}: VideoPlayerProps) {
  const [hasError, setHasError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const handleError = () => {
    console.log("Video failed to load, trying fallback");
    if (!useFallback && fallbackSrc) {
      setUseFallback(true);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-accent-100 to-neutral-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-accent-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-neutral-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 className="font-serif text-lg text-neutral-700 mb-2">
            Trầm Hương Tinh Túy
          </h3>
          <p className="text-sm text-neutral-500">Nghệ thuật truyền thống</p>
        </div>
      </div>
    );
  }

  return (
    <video
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      className={className}
      webkit-playsinline="true"
      x-webkit-airplay="allow"
      controls={controls}
      onError={handleError}
    >
      <source src={useFallback ? fallbackSrc : src} type="video/mp4" />
      <source src={fallbackSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
