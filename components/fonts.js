import { Text } from "./text";
import React from "react";
import { headerL, headerM, headerS, bodyS } from "../styles/fonts";
import { FontBox } from "./font-box";

export const HeaderL = props => (
  <FontBox Component="h1" {...headerL} {...props} />
);
export const HeaderM = props => (
  <FontBox Component="h2" {...headerM} {...props} />
);
export const HeaderS = props => (
  <FontBox Component="h3" {...headerS} {...props} />
);
export const Paragraph = props => (
  <FontBox Component="p" {...bodyS} {...props} />
);
export const Span = props => <FontBox Component="span" {...props} />;
export const Link = props => <FontBox Component="a" {...props} />;
