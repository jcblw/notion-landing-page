import { css } from "glamor";

css.global("*", {
  fontFamily: "'IBM Plex Sans', sans-serif",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale"
});

const medium = { fontWeight: 700 };

const extraLight = { fontWeight: 200 };

export const headerL = css(medium, {
  fontSize: 32,
  lineHeight: "40px"
});

export const headerM = css(medium, {
  fontSize: 24,
  lineHeight: "32px"
});

export const headerS = css(medium, {
  fontSize: 16,
  lineHeight: "24px"
});

export const bodyS = css(extraLight, {
  fontSize: 16,
  lineHeight: "24px"
});

export const underline = css({ textDecoration: "underline" });
