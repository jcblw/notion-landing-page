import React from "react";

export const Text = props => {
  if (!Array.isArray(props.children)) return null;
  return props.children.map((chunk, i) => {
    let wrapper = <span key={`child-${i}`}>{chunk[0]}</span>;

    (chunk[1] || []).forEach(el => {
      const Element = el[0];
      wrapper = React.createElement(Element, {}, wrapper);
    });

    return wrapper;
  });
};
