import React from 'react';

interface ImperialCornerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'accent' | 'neutral' | 'gold' | 'light';
}

export function ImperialCorner({
  className = '',
  size = 'md',
  color = 'accent',
}: ImperialCornerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    accent: 'text-accent-600',
    neutral: 'text-neutral-400',
    gold: 'text-accent-500',
    light: 'text-neutral-200',
  };

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        {/* Half-bordered square corner pattern */}
        <path
          d="M2 2 L2 8 L8 2 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

interface ImperialCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  color?: 'accent' | 'neutral' | 'gold' | 'light';
}

export function ImperialCard({
  children,
  className = '',
  variant = 'default',
  color = 'accent',
}: ImperialCardProps) {
  const variantClasses = {
    default: 'bg-transparent border border-transparent',
    elevated: 'bg-transparent border border-transparent',
    outlined: 'bg-transparent border-2 border-transparent',
  };

  return (
    <div className={`relative ${variantClasses[variant]} ${className}`}>
      {/* Top-left corner */}
      <div className="absolute top-0 left-0">
        <ImperialCorner size="sm" color={color} />
      </div>

      {/* Top-right corner */}
      <div className="absolute top-0 right-0 rotate-90">
        <ImperialCorner size="sm" color={color} />
      </div>

      {/* Bottom-left corner */}
      <div className="absolute bottom-0 left-0 -rotate-90">
        <ImperialCorner size="sm" color={color} />
      </div>

      {/* Bottom-right corner */}
      <div className="absolute bottom-0 right-0 rotate-180">
        <ImperialCorner size="sm" color={color} />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

interface ImperialDividerProps {
  className?: string;
  variant?: 'line' | 'lotus';
}

export function ImperialDivider({ className = '', variant = 'line' }: ImperialDividerProps) {
  if (variant === 'lotus') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent-300 to-transparent"></div>
        <div className="mx-6">
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-accent-600">
            {/* Lotus flower design */}
            <path
              d="M12 2 C8 6, 4 8, 4 12 C4 16, 8 18, 12 18 C16 18, 20 16, 20 12 C20 8, 16 6, 12 2 Z"
              fill="currentColor"
              opacity="0.3"
            />
            <path
              d="M12 4 C9 7, 6 9, 6 12 C6 15, 9 17, 12 17 C15 17, 18 15, 18 12 C18 9, 15 7, 12 4 Z"
              fill="currentColor"
              opacity="0.6"
            />
            <path
              d="M12 6 C10 8, 8 10, 8 12 C8 14, 10 16, 12 16 C14 16, 16 14, 16 12 C16 10, 14 8, 12 6 Z"
              fill="currentColor"
            />
            {/* Lotus center */}
            <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.8" />
          </svg>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent-300 to-transparent"></div>
      </div>
    );
  }

  return (
    <div
      className={`w-32 mx-auto h-px bg-gradient-to-r from-transparent via-accent-400 to-transparent ${className}`}
    />
  );
}
