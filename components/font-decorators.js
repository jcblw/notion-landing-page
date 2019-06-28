import { Box } from "@jcblw/box";
import React from "react";

export const Span = props => <Box Component="span" {...props} />;
export const Link = props => {
  // TODO: inject theme here to make sure colors stay nice
  return (
    <Box
      color="white"
      textDecoration="underline"
      Component="a"
      href={props["data-value"]}
      {...props}
    />
  );
};
export const Bold = props => <Box Component="strong" {...props} />;
export const Italic = props => <Box Component="em" {...props} />;
export const StrikeThrough = props => <Box Component="s" {...props} />;
