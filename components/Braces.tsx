
import React from 'react';

interface BracesProps {
  children?: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Braces: React.FC<BracesProps> = ({ children, className = "", size = 'md' }) => {
  // Size mapping for the inner (larger) braces
  const sizeMap = {
    xs: { inner: 'text-sm', outer: 'text-[10px]', gap: 'gap-0' },
    sm: { inner: 'text-xl', outer: 'text-sm', gap: 'gap-0' },
    md: { inner: 'text-3xl', outer: 'text-xl', gap: 'gap-0.5' },
    lg: { inner: 'text-5xl', outer: 'text-3xl', gap: 'gap-0.5' },
    xl: { inner: 'text-7xl', outer: 'text-5xl', gap: 'gap-1' },
    '2xl': { inner: 'text-8xl', outer: 'text-6xl', gap: 'gap-1' }
  };

  const { inner, outer, gap } = sizeMap[size];

  return (
    <span className={`inline-flex items-center select-none font-['Poppins'] ${className}`}>
      {/* Left braces: outer (small) then inner (large) */}
      <span className={`inline-flex items-center ${gap}`}>
        <span className={`${outer} text-[#2D4769] font-normal leading-none`} style={{ marginRight: '-0.15em' }}>
          {'{'}
        </span>
        <span className={`${inner} text-[#2D4769] font-semibold leading-none`}>
          {'{'}
        </span>
      </span>

      {/* Content (children) */}
      {children && (
        <span className="mx-1">
          {children}
        </span>
      )}

      {/* Right braces: inner (large) then outer (small) */}
      <span className={`inline-flex items-center ${gap}`}>
        <span className={`${inner} text-[#2D4769] font-semibold leading-none`}>
          {'}'}
        </span>
        <span className={`${outer} text-[#2D4769] font-normal leading-none`} style={{ marginLeft: '-0.15em' }}>
          {'}'}
        </span>
      </span>
    </span>
  );
};

// Standalone icon version (just the braces, no content)
export const BracesIcon: React.FC<{ size?: 'xs' | 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className = ''
}) => {
  const sizeMap = {
    xs: { inner: 'text-base', outer: 'text-xs' },
    sm: { inner: 'text-xl', outer: 'text-sm' },
    md: { inner: 'text-3xl', outer: 'text-xl' },
    lg: { inner: 'text-5xl', outer: 'text-3xl' }
  };

  const { inner, outer } = sizeMap[size];

  return (
    <span className={`inline-flex items-center select-none font-['Poppins'] ${className}`}>
      {/* Left pair */}
      <span className="inline-flex items-center">
        <span className={`${outer} text-[#2D4769] font-normal leading-none`} style={{ marginRight: '-0.1em' }}>
          {'{'}
        </span>
        <span className={`${inner} text-[#2D4769] font-semibold leading-none`}>
          {'{'}
        </span>
      </span>

      {/* Small gap */}
      <span className="w-2" />

      {/* Right pair */}
      <span className="inline-flex items-center">
        <span className={`${inner} text-[#2D4769] font-semibold leading-none`}>
          {'}'}
        </span>
        <span className={`${outer} text-[#2D4769] font-normal leading-none`} style={{ marginLeft: '-0.1em' }}>
          {'}'}
        </span>
      </span>
    </span>
  );
};
