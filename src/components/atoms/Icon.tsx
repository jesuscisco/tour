import React from "react";

type IconName = "home" | "info"; // aquí agregas más claves si creces el set de íconos

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color = "currentColor" }) => {
  const icons: Record<IconName, JSX.Element> = {
    home: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 24 24"
      >
        <path d="M12 3l10 9h-3v9h-6v-6h-4v6H5v-9H2l10-9z" />
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 24 24"
      >
        <path d="M12 0a12 12 0 1 0 12 12A12.014 12.014 0 0 0 12 0zm1 17h-2v-2h2zm0-4h-2V7h2z" />
      </svg>
    ),
  };

  return icons[name] ?? null;
};

export default Icon;
