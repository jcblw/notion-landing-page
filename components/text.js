import React from "react";
import {
  Link,
  Span,
  Bold,
  Italic,
  Highlight,
  StrikeThrough
} from "./font-decorators";

const elementMap = {
  a: Link,
  span: Span,
  b: Bold,
  i: Italic,
  h: Span, // TODO: support colors check data-value
  s: StrikeThrough
};

export const Text = props => {
  if (!Array.isArray(props.children)) return null;
  return props.children.map((chunk, i) => {
    let wrapper = <Span key={`child-${i}`}>{chunk[0]}</Span>;

    (chunk[1] || []).forEach((el, i) => {
      const [element, dataValue] = el;
      const Element = elementMap[element] || element;
      wrapper = React.createElement(
        Element,
        { "data-value": dataValue, key: `chunk-${i}` },
        wrapper
      );
    });

    return wrapper;
  });
};
