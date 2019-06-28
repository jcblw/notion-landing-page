import React from "react";
import { Box } from "@jcblw/box";
import { Span } from "./fonts";

export const List = ({ children }) => (
  <Box Component="ul">
    {children.map((child, i) => (
      <Box Component="li" key={`li-${i}`}>
        {child}
      </Box>
    ))}
  </Box>
);
