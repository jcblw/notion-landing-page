import React from "react";
import { Text } from "./text";
import { NotionImage } from "./notion-image";
import { Header1, Header2, Paragraph } from "./fonts";
import { Box } from "@jcblw/box";

export const Section = props => {
  const { intro, first } = props;
  return (
    <Box Component="section">
      <Box Component="header">
        {intro ? (
          <>
            <Header1>{props.title}</Header1>
            {props.children[0] && props.children[0].type === "text" ? (
              <Paragraph>{props.children[0].value}</Paragraph>
            ) : null}
          </>
        ) : (
          <Header2>{props.title}</Header2>
        )}
      </Box>
      <Box>
        {props.children.map(subsection =>
          subsection.type === "image" ? (
            <NotionImage src={subsection.src} />
          ) : subsection.type === "text" ? (
            !intro && <Paragraph>{subsection.value}</Paragraph>
          ) : subsection.type === "list" ? (
            !intro && (
              <ul>
                {subsection.children.map(child => (
                  <li>
                    <Text>{child}</Text>
                  </li>
                ))}
              </ul>
            )
          ) : null
        )}
      </Box>
    </Box>
  );
};
