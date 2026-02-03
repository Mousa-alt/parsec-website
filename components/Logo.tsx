
import React from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showIcon?: boolean; // If true, only show {{ }} without ParSec
}

/**
 * Parsec Logo Component
 *
 * Structure: { { Par Sec } }
 *            ↑ ↑  ↑   ↑  ↑ ↑
 *           sm lg bold italic lg sm
 *
 * - Outer braces are smaller
 * - Inner braces are larger
 * - "Par" is bold weight
 * - "Sec" is italic style
 * - All in Poppins font
 */
export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  showIcon = false
}) => {
  // Size configurations
  const sizeConfig = {
    xs: {
      outer: 'text-xs',
      inner: 'text-sm',
      text: 'text-sm',
      gap: '-mx-0.5'
    },
    sm: {
      outer: 'text-sm',
      inner: 'text-lg',
      text: 'text-base',
      gap: '-mx-0.5'
    },
    md: {
      outer: 'text-lg',
      inner: 'text-2xl',
      text: 'text-xl',
      gap: '-mx-1'
    },
    lg: {
      outer: 'text-2xl',
      inner: 'text-4xl',
      text: 'text-3xl',
      gap: '-mx-1'
    },
    xl: {
      outer: 'text-4xl',
      inner: 'text-6xl',
      text: 'text-5xl',
      gap: '-mx-1.5'
    },
    '2xl': {
      outer: 'text-5xl',
      inner: 'text-7xl',
      text: 'text-6xl',
      gap: '-mx-2'
    }
  };

  const config = sizeConfig[size];

  // Icon only mode (just braces)
  if (showIcon) {
    return (
      <span className={`inline-flex items-center select-none font-['Poppins'] text-[#2D4769] ${className}`}>
        {/* Left: outer { then inner { */}
        <span className={`${config.outer} font-normal`} style={{ marginRight: '-0.12em' }}>{`{`}</span>
        <span className={`${config.inner} font-semibold`}>{`{`}</span>

        {/* Gap */}
        <span className="w-1" />

        {/* Right: inner } then outer } */}
        <span className={`${config.inner} font-semibold`}>{`}`}</span>
        <span className={`${config.outer} font-normal`} style={{ marginLeft: '-0.12em' }}>{`}`}</span>
      </span>
    );
  }

  // Full logo with ParSec text
  return (
    <span className={`inline-flex items-center select-none font-['Poppins'] text-[#2D4769] ${className}`}>
      {/* Left braces: outer (small) { then inner (large) { */}
      <span className={`${config.outer} font-normal`} style={{ marginRight: '-0.08em' }}>{`{`}</span>
      <span className={`${config.inner} font-semibold`}>{`{`}</span>

      {/* ParSec text */}
      <span className={`${config.text} mx-1 tracking-tight`}>
        <span className="font-bold">Par</span>
        <span className="font-semibold italic">Sec</span>
      </span>

      {/* Right braces: inner (large) } then outer (small) } */}
      <span className={`${config.inner} font-semibold`}>{`}`}</span>
      <span className={`${config.outer} font-normal`} style={{ marginLeft: '-0.08em' }}>{`}`}</span>
    </span>
  );
};

/**
 * Logo wordmark without braces - just "ParSec" with proper styling
 */
export const LogoWordmark: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }> = ({
  size = 'md',
  className = ''
}) => {
  const sizeMap = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  return (
    <span className={`font-['Poppins'] text-[#2D4769] tracking-tight ${sizeMap[size]} ${className}`}>
      <span className="font-bold">Par</span>
      <span className="font-semibold italic">Sec</span>
    </span>
  );
};
