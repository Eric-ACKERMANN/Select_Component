import React from "react";

export default function ValueMulti({ value, style, multiValueProps }) {
  const {
    onMouseEnter,
    onMouseLeave,
    idItem,
    styleMultiValue,
    multiDelete,
    valueHover,
    valueSelected
  } = multiValueProps;

  return (
    value &&
    value.map((element, index) => {
      return (
        <div
          key={index}
          style={{
            display: "flex",
            margin: "5px",
            borderRadius: "3px 3px 3px 3px",
            overflow: "hidden"
          }}
        >
          {/* VALUE - VALUE */}
          <div
            style={styleChange({ ...style }, { ...styleMultiValue.multiValue })}
          >
            {element}
          </div>

          {/* VALUE - Boutton delete */}
          {multiDelete && (
            <div
              onMouseEnter={() => onMouseEnter(index)}
              onMouseLeave={onMouseLeave}
              id={`${idItem}multiDeleteBox${index}`}
              onClick={() => {
                multiDelete(element);
              }}
              style={styleDelete(
                { ...style },
                { ...styleMultiValue },
                valueHover,
                valueSelected,
                index
              )}
            >
              <i
                id={`${idItem}multiDeleteLogo${index}`}
                className="fas fa-times"
              />
            </div>
          )}
        </div>
      );
    })
  );
}

const styleChange = function(style, styleChange) {
  const keysValueSelected = Object.keys(styleChange);
  keysValueSelected.forEach(key => {
    style[key] = styleChange[key];
  });
  return style;
};

const styleDelete = function(
  style,
  styleMultiValue,
  valueHover,
  valueSelected,
  index
) {
  style = styleChange(style, styleMultiValue.delete);
  if (valueSelected === index) {
    style = styleChange(style, styleMultiValue.selected);
  }
  if (valueHover === index) {
    style = styleChange(style, styleMultiValue.hover);
  }
  return style;
};
