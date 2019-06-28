import React from "react";
import { HEADER, SUB_HEADER, PAGE, IMAGE, TEXT, LIST } from "./constants";
import { HeaderL, HeaderM, HeaderS, Paragraph } from "../fonts";
import { NotionImage } from "../notion-image";
import { List } from "../list";

export const Block = ({ type, children, src }) => {
  switch (type) {
    case PAGE:
      return (
        <>
          {src && <NotionImage width="80px" height="80px" src={src} />}
          <HeaderL>{children}</HeaderL>
        </>
      );
    case HEADER:
      return <HeaderM>{children}</HeaderM>;
    case SUB_HEADER:
      return <HeaderS>{children}</HeaderS>;
    case TEXT:
      return <Paragraph>{children}</Paragraph>;
    case IMAGE:
      return <NotionImage src={src} />;
    case LIST:
      return <List>{children}</List>;
    default:
      return null;
  }
};
