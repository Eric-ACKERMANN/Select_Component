import React, { Component } from "react";
import PropTypes from "prop-types";

import ClickListener from "./ClickListener";

const setView = function(item, container, direction) {
  let itemBounding = item.getBoundingClientRect();
  let itemBottom = itemBounding.bottom;
  let itemTop = itemBounding.top;
  let containerBounding = container.getBoundingClientRect();
  let containerBottom = containerBounding.bottom;
  let containerTop = containerBounding.top;
  if (direction === 1 && (containerBottom < itemBottom || itemTop < 0)) {
    item.scrollIntoView(false);
  }

  if (direction === -1 && containerTop > itemTop) {
    item.scrollIntoView(true);
  }
  if (direction === -1 && itemTop > containerBottom) {
    item.scrollIntoView(false);
  }
  return;
};

const setPosition = function(position, direction, array) {
  let newPosition = null;
  if (direction === 1 && position === array.length - 1) {
    newPosition = 0;
  } else if (direction === -1 && position === 0) {
    newPosition = array.length - 1;
  } else {
    newPosition = position + direction;
  }
  return newPosition;
};

export default class Input extends Component {
  static defaultProps = {
    style: {
      container: {
        position: "relative",
        backgroundColor: "none"
      },
      input: {
        outline: "true",
        backgroundColor: "white",
        borderRadius: 5,
        padding: "5px 5px 5px 5px"
      },

      box: {
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        top: "100%",
        width: "100%",
        padding: 0,
        backgroundColor: "white",
        boxShadow: "1px 1px 1px 1px #888888",
        zIndex: 2,
        height: 200,
        overflow: "scroll"
      },
      item: {
        padding: "5px 10px"
      }
    },
    listenInside: false,
    itemHover: true,
    itemSelected: true,
    type: "input",
    placeholder: true,
    logo: false
  };

  static propsType = {
    readOnly: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    array: PropTypes.array,
    itemClick: PropTypes.func,
    style: PropTypes.style,
    listenInside: PropTypes.bool,
    itemHover: PropTypes.bool,
    itemSelected: PropTypes.bool,
    idItem: PropTypes.string,
    placeholder: PropTypes.bool,
    logo: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      dropdownVisible: false,
      itemHover: 0,
      inputClick: false
    };
  }
  handleClickInput = () => {
    this.setState({ dropdownVisible: true });
    if (this.props.type === "select") {
      this.input.setSelectionRange(0, 0);
      this.setState({ inputClick: true });
    }
    this.setState({ dropdownVisible: true });
  };

  handleChange = event => {
    if (this.state.inputClick) {
      this.setState({ inputClick: false });
      return;
    }
    if (this.props.type === "select" && this.state.inputClick) {
      this.props.itemClick("");
      this.setState({ inputClick: false });
    }

    this.props.onChange(event.target.value);
  };

  hover = () => {
    if (this.props.itemHover) {
      let styleItem = { ...this.props.style.item };
      let styleItemHover = { ...this.props.style.itemHover };

      // On récupère la liste des keys de hover
      const keysItemHover = Object.keys(styleItemHover);
      keysItemHover.forEach(key => {
        styleItem[key] = styleItemHover[key];
      });
      return styleItem;
    }
    return this.props.style.item;
  };

  itemSelected = () => {
    if (this.props.itemSelected) {
      let styleItem = { ...this.props.style.item };
      let styleItemSelected = { ...this.props.style.itemSelected };

      // On récupère la liste des keys de Selected
      const keysItemSelected = Object.keys(styleItemSelected);
      keysItemSelected.forEach(key => {
        styleItem[key] = styleItemSelected[key];
      });
      return styleItem;
    }
    return this.props.style.item;
  };

  onKeyDownInput = e => {
    // UP ARROW / DOWN ARROW
    if (e.keyCode === 40 || e.keyCode === 38) {
      let direction = "";
      let position = this.state.itemHover;
      let newPosition = null;

      if (e.keyCode === 40) {
        direction = 1;
      } else {
        direction = -1;
      }

      // Si le menu est fermé
      if (!this.state.dropdownVisible || this.state.itemHover === false) {
        newPosition = 0;
        this.setState({ dropdownVisible: true, itemHover: newPosition });
        return;
      }

      newPosition = setPosition(position, direction, this.props.array);
      // Set the view to auto-scroll if element is out of viewport.
      let item = document.getElementById(
        `${this.props.idItem}_${this.props.array[newPosition]}_${newPosition}`
      );

      let menu = document.getElementById(`${this.props.idItem}_menu`);
      setView(item, menu, direction);

      this.setState({ itemHover: newPosition });
    }

    // ENTER
    if (e.keyCode === 13) {
      let value = this.props.array[this.state.itemHover];
      this.props.itemClick(value);
      this.setState({ dropdownVisible: false });
    }
    //ESCAPE
    if (e.keyCode === 27) {
      this.setState({ itemHover: false, dropdownVisible: false });
    }
  };

  handleClickInputBox = () => {
    this.input.focus();
    this.setState({ dropdownVisible: true, itemHover: 0 });
  };

  filterArray = array => {
    let position = array.indexOf(this.props.value);
    if (position !== -1) {
      array.splice(position, 1);
    }
    return array;
  };

  render() {
    return (
      <div style={this.props.style.container}>
        <div
          style={this.props.style.input_box}
          onClick={() => this.handleClickInputBox()}
        >
          {/* DIV DU LOGO */}
          {this.props.logo && this.props.logo.position === -1 && (
            <div style={this.props.style.logo}>{this.props.logo.body} </div>
          )}
          <input
            ref={ref => (this.input = ref)}
            value={this.props.value}
            onChange={event => this.handleChange(event)}
            onClick={() => this.handleClickInput()}
            style={this.props.style.input}
            onKeyDown={this.onKeyDownInput}
          />
          {/* DIV DU LOGO */}
          {this.props.logo && this.props.logo.position === 1 && (
            <div style={this.props.style.logo}>{this.props.logo.body} </div>
          )}
        </div>

        {this.state.dropdownVisible && (
          <ClickListener
            onClick={() => this.setState({ dropdownVisible: false })}
            listenInside={this.props.listenInside}
          >
            <div
              id={`${this.props.idItem}_menu`}
              style={this.props.style.box}
              onClick={this.handleBodyClick}
            >
              {this.filterArray(this.props.array).map((element, index) => {
                return (
                  <div
                    id={`${this.props.idItem}_${element}_${index}`}
                    key={index}
                    style={
                      this.props.value === element
                        ? this.itemSelected(this.props.style.item)
                        : this.state.itemHover === index
                        ? this.hover(this.props.style.item)
                        : this.props.style.item
                    }
                    onClick={() => this.props.itemClick(element)}
                    onMouseEnter={() => {
                      this.setState({ itemHover: index });
                    }}
                    onMouseLeave={() => {
                      this.setState({ itemHover: false });
                    }}
                  >
                    {element}
                  </div>
                );
              })}
            </div>
          </ClickListener>
        )}
      </div>
    );
  }
}
