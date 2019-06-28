import { Text } from "./text";
import React from "react";
import { Box } from "@jcblw/box";
import { removeKeys } from "@jcblw/box/dist/lib/remove-keys";

export const FontBox = props => {
  const otherProps = removeKeys(props, "children");
  return (
    <Box
      {...otherProps}
      marginTop={props.marginTop || "zero"}
      marginBottom={props.marginBottom || "zero"}
      paddingTop={props.paddingTop || "s"}
      paddingBottom={props.paddingBottom || "s"}
    >
      <Text>{props.children}</Text>
    </Box>
  );
};
