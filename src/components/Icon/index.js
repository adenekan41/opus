import React from "react";
import icon from "./iconPath";

export const Icon = ({ name, color, size, className }) => {
  let selectedIcon = icon[name];
  return (
    <svg
      className={`Icon ${className}`}
      width={size}
      height={size}
      color={color}
      viewBox={selectedIcon.viewBox}
      style={{ flexShrink: 0 }}
    >
      {selectedIcon.path}
    </svg>
  );
};

Icon.defaultProps = {
  name: "left-arrow",
  size: 16,
  color: "#b4b4b4",
  className: ""
};

export const iconList = Object.keys(icon);
