
import React, { useState, useEffect } from 'react';
import { TYPEWRITER_WORDS } from '../constants.tsx';
import { Braces } from './Braces';

export const Typewriter: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === TYPEWRITER_WORDS[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 3000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
      return;
    }

    // Humanized typing with variable speed and jitter
    const baseSpeed = reverse ? 30 : 80;
    const jitter = Math.random() * 60;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, baseSpeed + jitter);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 530);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <div className="font-['Poppins']">
      {/* "Engineering" on its own line */}
      <div className="opacity-90 mb-2">Engineering</div>

      {/* Braces with typewriter text - all on one line, no wrapping */}
      <div className="flex items-center whitespace-nowrap">
        <Braces size="xl">
          <span className="text-[#2D4769] tracking-[-0.04em] whitespace-nowrap">
            {TYPEWRITER_WORDS[index].substring(0, subIndex)}
            <span
              className={`inline-block w-[6px] h-[0.75em] bg-[#2D4769] ml-1 rounded-sm align-middle ${
                blink ? 'opacity-80' : 'opacity-0'
              } transition-opacity duration-100`}
            />
          </span>
        </Braces>
      </div>
    </div>
  );
};
