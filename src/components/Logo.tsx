import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-radr-orange"
      >
        <rect
          width="32"
          height="32"
          rx="8"
          fill="currentColor"
          className="opacity-10"
        />
        <path
          d="M8 8h16v4H8V8zm0 6h16v4H8v-4zm0 6h16v4H8v-4z"
          fill="currentColor"
          className="opacity-80"
        />
        <text
          x="16"
          y="22"
          textAnchor="middle"
          className="text-radr-orange font-bold text-lg fill-current"
          fontFamily="Inter"
        >
          R
        </text>
      </svg>
      <span className="ml-2 text-xl font-bold text-white">Radr</span>
    </div>
  );
};

export default Logo;
