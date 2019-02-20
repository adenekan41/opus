import React from 'react';

const FullLogo = ({ width = '2000px', height = '500px' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 2000 500"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Artboard</title>
    <desc>Created with Sketch.</desc>
    <defs />
    <g
      id="Artboard"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <rect
        id="Rectangle"
        fill="#17732D"
        fillRule="nonzero"
        x="170"
        y="131"
        width="180"
        height="180"
      />
      <rect
        id="Rectangle"
        fill="#17732D"
        fillRule="nonzero"
        x="95"
        y="311"
        width="75"
        height="75"
      />
      <rect
        id="Rectangle"
        fill="#17732D"
        fillRule="nonzero"
        x="50"
        y="199"
        width="45"
        height="45"
      />
      <text
        id="OpusInsights"
        fontFamily="IM_FELL_French_Canon_Roman, IM FELL French Canon"
        fontSize="230"
        fontWeight="normal"
        fill="#FF9900"
      >
        <tspan x="379" y="308">
          OpusInsights
        </tspan>
      </text>
      <text
        id="Forecasting-the-trop"
        fontFamily="IM_FELL_French_Canon_Roman, IM FELL French Canon"
        fontSize="60"
        fontWeight="normal"
        fill="#17732D"
      >
        <tspan x="715" y="391">
          Forecasting the tropics
        </tspan>
      </text>
    </g>
  </svg>
);

const Logo = ({ type, width, height }) => {
  let Component = type === 'full' ? FullLogo : FullLogo;
  return <Component width={width} height={height} />;
};

export default Logo;
