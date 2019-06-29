export const colors = {
  black: "#000000",
  white: "#FFFFFF",
  merlin: "#37352f",
  transparent: "transparent",
  inherit: "inherit"
};

export const getColor = colorName => colors[colorName];

const toRGB = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? result.slice(1, 4).map(n => parseInt(n, 16)) : null;
};

export const rgba = (color, alpha) => {
  const hex = /^#/.test(color) ? color : getColor(color);
  const rgb = toRGB(hex);
  return `rgba(${rgb.join(",")},${alpha})`;
};
