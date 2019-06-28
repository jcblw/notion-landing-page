import React from "react";
import { Box } from "@jcblw/box";

export const NotionImage = ({ src, width, height }) => {
  if (src) {
    return (
      <Box
        Component="img"
        title="image"
        src={src}
        css={{ maxWidth: "100%", width, height }}
      />
    );
  } else {
    return null;
  }
};
