import React from "react";
import Input from "./Select_input";
import ValueMulti from "./Select_ValueMulti";

export default function ValueBlock({
  style,
  valueInput,
  multiSelect,
  value,
  inputProps,
  multiValueProps
}) {
  return (
    <div
      style={
        multiSelect || (!valueInput && !multiSelect)
          ? valueStyle(style, multiSelect, multiWrap)
          : { display: "none" }
      }
    >
      {multiSelect ? (
        <ValueMulti
          value={value}
          style={style}
          multiValueProps={multiValueProps}
        />
      ) : (
        value
      )}

      {multiSelect && (
        <Input
          readOnly={inputProps.readOnly}
          id={inputProps.id}
          myRef={inputProps.myRef}
          value={inputProps.value}
          style={inputProps.style}
          onChange={inputProps.onChange}
          onKeyDown={inputProps.onKeyDown}
          onBlur={inputProps.onBlur}
        />
      )}
    </div>
  );
}

const multiWrap = function(style) {
  style.flexWrap = "wrap";
  return style;
};
const multiSelectStyle = function(style, multiWrap) {
  if (multiWrap) {
    style = multiWrap(style);
  }
  return style;
};
const valueStyle = function(style, multiSelect, multiWrap) {
  if (multiSelect) {
    style = multiSelectStyle(style, multiWrap);
  } else {
    style.position = "absolute";
  }
  return style;
};
