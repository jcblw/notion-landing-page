import { Text } from "./text";
import React from "react";
import { Box } from "@jcblw/box";
import { removeKeys } from "@jcblw/box/dist/lib/remove-keys";
import { headerL, headerM, headerS, bodyS } from "../styles/fonts";

export const FontBox = props => {
  const otherProps = removeKeys(props, "children");
  return (
    <Box
      {...otherProps}
      marginTop={props.marginTop || "zero"}
      marginBottom={props.marginBottom || "zero"}
      paddingTop={props.paddingTop || "m"}
      paddingBottom={props.paddingBottom || "m"}
    >
      <Text>{props.children}</Text>
    </Box>
  );
};

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
