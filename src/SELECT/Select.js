import React, { Component } from "react";

import PropTypes from "prop-types";
import { clearLogo } from "./Select_Style";
import Input from "./Select_input";
import Placeholder from "./Select_placeholder";
import ClearLogo from "./Select_ClearLogo";
import Logo from "./Select_Logo";
import Suggestions from "./Select_Suggestions";
import ValueBlock from "./Select_ValueBlock";

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

      suggestions: {
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
      suggestions: false,
      itemHover: 0,
      valueHover: false,
      valueSelected: false,
      placeholder: "Select...",
      valueInput: "",
      mounted: false
    };
  }

  onBlurInput = () => {
    this.setState({ valueInput: "" });
  };

  onKeyDownInput = e => {
    // BACKSPACE
    if (e.keyCode === 8) {
      if (this.props.readOnly || this.state.valueInput === "") {
        if (this.props.multiSelect && this.props.value) {
          let value = [...this.props.value];
          if (this.state.valueSelected !== false) {
            value.splice(this.state.valueSelected, 1);
            if (this.state.valueSelected > value.length - 1) {
              this.setState({ valueSelected: false });
            }
          } else {
            value.pop();
          }
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

      // Si le suggestion est fermé
      if (!this.state.suggestions || this.state.itemHover === false) {
        newPosition = 0;
        this.setState({ suggestions: true, itemHover: newPosition });
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

      let suggestions = document.getElementById(
        `${this.props.idItem}_suggestions`
      );
      setView(item, suggestions, direction);

      this.setState({ itemHover: newPosition });
    }

    // ENTER
    if (e.keyCode === 13) {
      let value = this.createAnswer(this.filterArray(this.props.array))[
        this.state.itemHover
      ];
      if (value) {
        this.itemClick(value);
        this.setState({ suggestions: false, itemHover: false });
      }
    }
    //ESCAPE
    if (e.keyCode === 27) {
      this.setState({ itemHover: false, suggestions: false });
    }

    // LEFT Arrow / RIGHT Arrow
    if (e.keyCode === 37) {
      console.log("détecté");
      // Left Arrow
      if (this.state.valueSelected === false) {
        this.setState({ valueSelected: this.props.value.length - 1 });
      } else if (this.state.valueSelected > 0) {
        this.setState({ valueSelected: this.state.valueSelected - 1 });
      }
    }

    if (e.keyCode === 39) {
      console.log("détecté");
      // Right Arrow
      if (this.state.valueSelected === this.props.value.length - 1) {
        this.setState({ valueSelected: false });
      } else if (this.state.valueSelected !== false) {
        this.setState({ valueSelected: this.state.valueSelected + 1 });
      }
    }
  };

  handleClickInputBox = e => {
    this.input.focus();
    if (
      e.target.id.includes(`${this.props.idItem}multiDeleteBox`) ||
      e.target.id.includes(`${this.props.idItem}multiDelete`)
    ) {
      return;
    } else {
      this.setState({
        suggestions: true,
        itemHover: 0
      });
    }
  };

  handleChangeInput = e => {
    this.setState({ valueInput: e.target.value, suggestions: true });
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
      element = element.substr(8, element.length - 1 - 8);
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

  createAnswer = array => {
    const inputValue = this.state.valueInput.trim().toLowerCase();
    array.forEach(function(e, index) {
      return (array[index] = e.toLowerCase());
    });

    const position = array.indexOf(inputValue);

    if (position === -1 && this.state.valueInput) {
      array.push(`Create "${this.state.valueInput}"`);
    }

    return array;
  };

  multiValueDelete = element => {
    let value = [...this.props.value];
    let position = value.indexOf(element);
    value.splice(position, 1);
    this.props.itemClick(value);
  };

  onClickClearLogo = () => {
    this.props.itemClick("");
  };

  handleMouseEnterItem = index => {
    this.setState({ itemHover: index });
  };

  handleMouseLeaveItem = () => {
    this.setState({ itemHover: false });
  };

  handleMouseEnterValue = index => {
    this.setState({ valueHover: index });
  };

  handleMouseLeaveValue = () => {
    this.setState({ valueHover: false });
  };

  render() {
    return (
      <div style={this.props.style.container}>
        <div
          style={this.props.style.input_box}
          onClick={e => this.handleClickInputBox(e)}
        >
          {/* DIV DU LOGO */}
          {this.props.logo && this.props.logo.position === -1 && (
            <Logo style={this.props.style.logo} value={this.props.logo.body} />
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
            <ValueBlock
              style={{ ...this.props.style.value }}
              valueInput={this.state.valueInput}
              multiSelect={this.props.multiSelect}
              value={this.props.value}
              inputProps={{
                readOnly: this.props.readOnly ? true : false,
                id: `${this.props.idItem_input}`,
                myRef: ref => (this.input = ref),
                value: this.props.readOnly ? "" : this.state.valueInput,
                style: this.props.style.input,
                onChange: this.props.readOnly ? false : this.handleChangeInput,
                onKeyDown: this.onKeyDownInput,
                onBlur: this.props.readOnly ? undefined : this.onBlurInput
              }}
              multiValueProps={{
                onMouseEnter: this.handleMouseEnterValue,
                onMouseLeave: this.handleMouseLeaveValue,
                idItem: this.props.idItem,
                styleMultiValue: {
                  multiValue: this.props.style.multipleValue,
                  delete: this.props.style.multipleValueDelete,
                  hover: this.props.style.multipleValueDeleteHover,
                  selected: this.props.style.multipleValueDeleteSelected
                },
                multiDelete: this.multiValueDelete,
                valueHover: this.state.valueHover,
                valueSelected: this.state.valueSelected
              }}
            />

            {!this.props.multiSelect && (
              <Input
                readOnly={this.props.readOnly ? true : false}
                id={`${this.props.idItem}_input`}
                myRef={ref => (this.input = ref)}
                value={this.props.readOnly ? "" : this.state.valueInput}
                style={this.props.style.input}
                onChange={this.props.readOnly ? false : this.handleChangeInput}
                onKeyDown={this.onKeyDownInput}
                onBlur={this.props.readOnly ? undefined : this.onBlurInput}
              />
            )}

            {/* PLACEHOLDER */}
            {this.props.placeholder &&
              !this.props.value &&
              !this.state.valueInput && (
                <Placeholder
                  style={{
                    value: this.props.style.value,
                    placeholder: this.props.style.placeholder
                  }}
                  value={this.props.placeholder}
                />
              )}
          </div>

          {/* DIV DU CLEARABLE */}
          {this.props.clearable && (
            <ClearLogo
              onClick={this.onClickClearLogo}
              style={this.props.style.clearLogo}
              value={clearLogo.body}
            />
          )}

          {/* DIV DU LOGO */}
          {this.props.logo && this.props.logo.position === 1 && (
            <Logo style={this.props.style.logo} value={this.props.logo.body} />
          )}
        </div>

        {this.state.suggestions && (
          <Suggestions
            suggestions={this.createAnswer(
              this.filterArray([...this.props.array])
            )}
            idItem={this.props.idItem}
            style={this.props.style.suggestions}
            onClick={this.handleBodyClick}
            CLprops={{
              onClick: () => this.setState({ suggestions: false }),
              listenInside: this.props.listenInside
            }}
            itemProps={{
              itemHover: this.state.itemHover,
              selection: this.props.itemSelected,
              hover: this.props.itemHover,
              input: this.props.value,
              styleItem: this.props.style.item,
              styleItemSelected: this.props.style.itemSelected,
              styleItemHover: this.props.style.itemHover,
              onMouseEnterItem: index => this.handleMouseEnterItem(index),
              onMouseLeaveItem: () => this.handleMouseLeaveItem,
              onClick: (element, index) => this.itemClick(element, index)
            }}
          />
        )}
      </div>
    );
  }
}
