import React from "react";

export default function Item({
  value,
  id,
  itemHover,
  index,
  hover,
  selection,
  input,
  styleItem,
  styleItemSelected,
  styleItemHover,
  onMouseEnterItem,
  onMouseLeaveItem,
  onClick
}) {
  const item = function(styleI, styleIS, styleIH) {
    if (selection && input.indexOf(value) !== -1) {
      return itemSelected(styleI, styleIS);
    } else if (hover && itemHover === index) {
      return hoverI(styleI, styleIH);
    } else {
      return styleI;
    }
  };

  return (
    <div
      id={id}
      style={item(
        { ...styleItem },
        { ...styleItemSelected },
        { ...styleItemHover }
      )}
      onClick={() => onClick(value, index)}
      onMouseEnter={() => onMouseEnterItem(index)}
      onMouseLeave={onMouseLeaveItem}
    >
      {value}
    </div>
  );
}

const hoverI = function(styleI, styleIH) {
  const keysIH = Object.keys(styleIH);
  keysIH.forEach(key => {
    styleI[key] = styleIH[key];
  });
  return styleI;
};

const itemSelected = function(styleI, styleIS) {
  const keysIS = Object.keys(styleIS);
  keysIS.forEach(key => {
    styleI[key] = styleIS[key];
  });
  return styleI;
};
