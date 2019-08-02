import React from "react";
import Item from "./Select_Item";
import ClickListener from "./ClickListener";

export default function Suggestions({
  idItem,
  suggestions,
  style,
  onClick,
  CLprops,
  itemProps
}) {
  return (
    <div id={`${idItem}_suggestions`} style={style} onClick={onClick}>
      <ClickListener
        onClick={CLprops.onClick}
        listenInside={CLprops.listenInside}
        idItem={idItem}
      >
        {suggestions.map((element, index) => {
          return (
            <Item
              value={element}
              id={`${idItem}_${element}_${index}`}
              key={index}
              index={index}
              itemHover={itemProps.itemHover}
              selection={itemProps.itemSelected}
              hover={itemProps.hover}
              input={itemProps.input}
              styleItem={itemProps.styleItem}
              styleItemSelected={itemProps.styleItemSelected}
              styleItemHover={itemProps.styleItemHover}
              onMouseEnterItem={itemProps.onMouseEnterItem}
              onMouseLeaveItem={itemProps.onMouseLeaveItem}
              onClick={itemProps.onClick}
            />
          );
        })}
      </ClickListener>
    </div>
  );
}
