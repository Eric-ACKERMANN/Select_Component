import React, { Component } from "react";

import PropTypes from "prop-types";

import ClickListener from "./ClickListener";
import { clearLogo } from "./Select_Style";

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

export default class Select extends Component {
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

      menu: {
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
      },
      multipleItem: {
        padding: "5px",
        backgroundColor: "grey"
      }
    },
    listenInside: false,
    itemHover: true,
    itemSelected: true,
    placeholder: true,
    logo: false,
    multiSelect: false,
    multiWrap: false,
    clear: false
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
    logo: PropTypes.object,
    multiSelect: PropTypes.bool,
    multiWrap: PropTypes.bool,
    clear: PropTypes.bool,
    multiDelete: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      dropdownVisible: false,
      itemHover: 0,
      placeholder: "Select...",
      valueInput: "",
      mounted: false
    };
  }

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

  placeholder = style => {
    if (this.props.placeholder) {
      let styleValue = { ...style };
      let stylePlaceholder = { ...this.props.style.placeholder };

      // On récupère la liste des keys de Selected
      const keysPlaceholder = Object.keys(stylePlaceholder);
      keysPlaceholder.forEach(key => {
        styleValue[key] = stylePlaceholder[key];
      });
      return styleValue;
    }
    return this.props.style.value;
  };

  onKeyDownInput = e => {
    // BACKSPACE
    if (e.keyCode === 8) {
      if (this.props.readOnly || this.state.valueInput === "") {
        if (this.props.multiSelect && this.props.value) {
          let value = [...this.props.value];
          value.pop();
          if (value.length === 0) {
            this.props.itemClick("");
          } else {
            this.props.itemClick(value);
          }
        } else {
          this.props.itemClick("");
        }
        return;
      }
      return;
    }
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

      newPosition = setPosition(
        position,
        direction,
        this.createAnswer(this.filterArray(this.props.array))
      );

      // Set the view to auto-scroll if element is out of viewport.
      let item = document.getElementById(
        `${this.props.idItem}_${
          this.createAnswer(this.filterArray(this.props.array))[newPosition]
        }_${newPosition}`
      );

      let menu = document.getElementById(`${this.props.idItem}_menu`);
      setView(item, menu, direction);

      this.setState({ itemHover: newPosition });
    }

    // ENTER
    if (e.keyCode === 13) {
      let value = this.createAnswer(this.filterArray(this.props.array))[
        this.state.itemHover
      ];
      if (value) {
        this.itemClick(value);
        this.setState({ dropdownVisible: false, itemHover: false });
      }
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

  handleChangeInput = e => {
    this.setState({ valueInput: e.target.value, dropdownVisible: true });
  };

  filterArray = array => {
    if (this.props.multiSelect && this.props.value) {
      this.props.value.forEach(e => {
        let position = array.indexOf(e);
        if (position !== -1) {
          array.splice(position, 1);
        }
      });
      return array;
    } else {
      let position = array.indexOf(this.props.value);
      if (position !== -1) {
        array.splice(position, 1);
      }
      return array;
    }
  };

  itemClick = (element, index) => {
    if (index && index === this.props.array.length) {
      console.log(element);
      element = element.substr(8, element.length - 1 - 8);
      console.log(element);
    }
    if (this.props.multiSelect) {
      if (typeof this.props.value !== "object") {
        let value = [element];
        this.props.itemClick(value);
      } else {
        let value = [...this.props.value];
        value.push(element);
        this.props.itemClick(value);
      }
      this.input.focus();
    } else {
      this.props.itemClick(element);
    }
    this.setState({ valueInput: "" });
  };

  multipleStyle = () => {
    if (this.props.multiSelect) {
      let styleValue = { ...this.props.style.value };
      let styleMultipleValue = { ...this.props.style.multipleValue };

      // On récupère la liste des keys de Selected
      const keysValueSelected = Object.keys(styleMultipleValue);
      keysValueSelected.forEach(key => {
        styleValue[key] = styleMultipleValue[key];
      });
      return styleValue;
    }
    return this.props.style.value;
  };

  multipleStyleDelete = () => {
    if (this.props.multiSelect) {
      let styleValue = { ...this.props.style.value };
      let styleMultipleValueDelete = {
        ...this.props.style.multipleValueDelete
      };

      // On récupère la liste des keys de Selected
      const keysValueSelected = Object.keys(styleMultipleValueDelete);
      keysValueSelected.forEach(key => {
        styleValue[key] = styleMultipleValueDelete[key];
      });
      return styleValue;
    }
    return this.props.style.value;
  };

  componentDidMount = () => {
    this.setState({ mounted: true });
  };

  inputStyle = () => {
    let inputStyle = { ...this.props.style.input };
    let element = document.getElementById(`${this.props.idItem}_sL`);
    if (element) {
      let elementBounding = element.getBoundingClientRect();
      if (!this.props.readOnly) {
        let inputWidth = elementBounding.width + 15;
        inputStyle.width = inputWidth;
      }
    }

    return inputStyle;
  };

  multiWrap = styleValue => {
    let wrapStyleValue = { ...styleValue };
    if (this.props.multiWrap) {
      wrapStyleValue.flexWrap = "wrap";
    }
    return wrapStyleValue;
  };

  createAnswer = array => {
    let newArray = [...array];
    if (!this.props.readOnly) {
      let inputValue = this.state.valueInput.trim().toLowerCase();

      newArray.forEach(function(e, index) {
        return (array[index] = e.toLowerCase());
      });

      let position = array.indexOf(inputValue);

      if (position === -1 && this.state.valueInput) {
        newArray.push(`Create "${this.state.valueInput}"`);
      }
    }

    return newArray;
  };

  monoAnswer = style => {
    let styleValue = { ...style };

    styleValue.position = "absolute";

    return styleValue;
  };

  multiValueDelete = element => {
    let value = [...this.props.value];
    let position = value.indexOf(element);
    value.splice(position, 1);
    this.props.itemClick(value);
  };

  render() {
    return (
      <div style={this.props.style.container}>
        <div
          style={{
            visibility: "hidden",
            position: "absolute"
          }}
          id={`${this.props.idItem}_sL`}
        >
          {this.state.valueInput}
        </div>
        <div
          style={this.props.style.input_box}
          onClick={() => this.handleClickInputBox()}
        >
          {/* DIV DU LOGO */}
          {this.props.logo && this.props.logo.position === -1 && (
            <div style={this.props.style.logo}>{this.props.logo.body} </div>
          )}

          <div
            style={{
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              overflow: "scroll",
              flex: 1
            }}
          >
            {/* DIV COMPRENANT INPUT ,PLACEHOLDER ET VALUE*/}

            {/*VALUE */}
            <div
              style={
                this.props.multiSelect
                  ? this.multiWrap(this.props.style.value)
                  : this.state.valueInput
                  ? { display: "none" }
                  : this.monoAnswer(this.props.style.value)
              }
            >
              {this.props.multiSelect
                ? this.props.value &&
                  this.props.value.map(e => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          margin: "5px",
                          borderRadius: "3px 3px 3px 3px",
                          overflow: "hidden"
                        }}
                      >
                        {/* VALUE - VALUE */}
                        <div style={this.multipleStyle(this.props.style.value)}>
                          {e}
                        </div>

                        {/* VALUE - Boutton delete */}
                        {this.props.multiDelete && (
                          <div
                            onClick={() => {
                              this.multiValueDelete(e);
                            }}
                            style={this.multipleStyleDelete(
                              this.props.style.value
                            )}
                          >
                            <i class="fas fa-times" />
                          </div>
                        )}
                      </div>
                    );
                  })
                : this.props.value}
            </div>
            {/* INPUT */}

            {this.props.readOnly ? (
              <input
                readOnly
                ref={ref => (this.input = ref)}
                value={""}
                style={this.inputStyle()}
                onKeyDown={this.onKeyDownInput}
              />
            ) : (
              <input
                style={this.inputStyle()}
                ref={ref => (this.input = ref)}
                value={this.state.valueInput}
                onChange={e => this.handleChangeInput(e)}
                onKeyDown={this.onKeyDownInput}
                // onBlur={() => {
                //   this.setState({ valueInput: "" });
                // }}
              />
            )}

            {/* PLACEHOLDER */}
            {this.props.placeholder &&
              !this.props.value &&
              !this.state.valueInput && (
                <div style={this.placeholder(this.props.style.value)}>
                  {this.state.placeholder}
                </div>
              )}
          </div>
          {/* DIV DU CLEARABLE */}
          {this.props.clearable && (
            <div
              onClick={() => {
                this.props.itemClick("");
              }}
              style={this.props.style.clear}
            >
              {clearLogo.body}
            </div>
          )}

          {/* DIV DU LOGO */}
          {this.props.logo && this.props.logo.position === 1 && (
            <div style={this.props.style.logo}>{this.props.logo.body}</div>
          )}
        </div>

        {this.state.dropdownVisible && (
          <ClickListener
            onClick={() => this.setState({ dropdownVisible: false })}
            listenInside={this.props.listenInside}
          >
            <div
              id={`${this.props.idItem}_menu`}
              style={this.props.style.menu}
              onClick={this.handleBodyClick}
            >
              {this.createAnswer(this.filterArray(this.props.array)).map(
                (element, index) => {
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
                      onClick={() => this.itemClick(element, index)}
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
                }
              )}
            </div>
          </ClickListener>
        )}
      </div>
    );
  }
}

// style={
//   this.props.multiSelect
//     ? this.multiWrap(this.props.style.value)
//     : this.state.valueInput
//     ? { display: "none" }
//     : this.props.style.value
// }
