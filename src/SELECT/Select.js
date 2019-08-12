import React, { Component } from "react";
import PropTypes from "prop-types";
import { clearLogo } from "./Select_Style";
import Input from "./Select_input";
import Placeholder from "./Select_Placeholder";
import ClearLogo from "./Select_ClearLogo";
import Logo from "./Select_Logo";
import Options from "./Select_Options";
import ValueBlock from "./Select_ValueBlock";

const setView = function(item, container, direction) {
  let itemBounding = item.getBoundingClientRect();
  let itemBottom = itemBounding.bottom;
  let itemTop = itemBounding.top;
  let containerBounding = container.getBoundingClientRect();
  let containerBottom = containerBounding.bottom;
  let containerTop = containerBounding.top;
  if (
    direction === 1 &&
    (containerBottom < itemBottom || itemTop < containerTop)
  ) {
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
  constructor(props) {
    super(props);
    this.state = {
      options: false,
      itemHover: 0,
      valueHover: false,
      valueFocus: false,
      placeholder: "Select...",
      valueInput: "",
      mounted: false
    };
  }

  onKeyDownInput = e => {
    // BACKSPACE
    if (e.keyCode === 8) {
      if (!this.props.searchable || this.state.valueInput === "") {
        if (this.props.valueTools.multi && this.props.value) {
          let value = [...this.props.value];
          if (this.state.valueFocus !== false) {
            value.splice(this.state.valueFocus, 1);
            if (this.state.valueFocus > value.length - 1) {
              this.setState({ valueFocus: false });
            }
          } else {
            value.pop();
          }
          if (value.length === 0) {
            this.props.setValue("");
          } else {
            this.props.setValue(value);
          }
        } else {
          this.props.setValue("");
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
      if (!this.state.options || this.state.itemHover === false) {
        newPosition = 0;
        this.setState({ options: true, itemHover: newPosition });
        return;
      }

      newPosition = setPosition(
        position,
        direction,
        this.createAnswer(this.filterArray([...this.props.options]))
      );

      // Set the view to auto-scroll if element is out of viewport.
      let item = document.getElementById(
        `${this.props.id}_${
          this.createAnswer(this.filterArray([...this.props.options]))[
            newPosition
          ]
        }_${newPosition}`
      );

      let options = document.getElementById(`${this.props.id}_options`);
      setView(item, options, direction);

      this.setState({ itemHover: newPosition });
    }

    // ENTER
    if (e.keyCode === 13) {
      let value = this.createAnswer(this.filterArray([...this.props.options]))[
        this.state.itemHover
      ];
      if (value) {
        this.setValue(value, this.state.itemHover);
        this.setState({ options: false, itemHover: false });
      }
    }
    //ESCAPE
    if (e.keyCode === 27) {
      this.setState({ itemHover: false, options: false });
    }

    // LEFT Arrow / RIGHT Arrow
    if (e.keyCode === 37) {
      // Left Arrow
      if (!this.state.valueInput && this.state.valueFocus === false) {
        this.setState({ valueFocus: this.props.value.length - 1 });
      } else if (this.state.valueFocus > 0) {
        this.setState({ valueFocus: this.state.valueFocus - 1 });
      }
    }

    if (e.keyCode === 39) {
      // Right Arrow
      if (this.state.valueFocus === this.props.value.length - 1) {
        this.setState({ valueFocus: false });
      } else if (this.state.valueFocus !== false) {
        this.setState({ valueFocus: this.state.valueFocus + 1 });
      }
    }
  };

  handleClickInputBox = e => {
    this.input.focus();
    if (
      e.target.id.includes(`${this.props.id}multiDeleteBox`) ||
      e.target.id.includes(`${this.props.id}multiDelete`)
    ) {
      return;
    } else {
      this.setState({
        options: true,
        itemHover: 0
      });
    }
  };

  handleChangeInput = e => {
    this.setState({ valueInput: e.target.value, options: true });
  };

  // Removes the values (multi) selected from options
  filterValueMulti = array => {
    this.props.value.forEach(e => {
      let position = array.indexOf(e);
      if (position !== -1) {
        array.splice(position, 1);
      }
    });
  };

  // Removes the value selected (mono) from options
  filterValueMono = array => {
    let position = array.indexOf(this.props.value);
    if (position !== -1) {
      array.splice(position, 1);
    }
  };

  // Filter options with the value of the input
  filterInput = array => {
    let newArray = array.filter(e =>
      e.toLowerCase().includes(this.state.valueInput.toLowerCase())
    );
    return newArray;
  };

  // Apply all filters
  filterArray = array => {
    if (this.props.valueTools.multi && this.props.value) {
      this.filterValueMulti(array);
    } else {
      this.filterValueMono(array);
    }
    array = this.filterInput(array);
    return array;
  };

  setValue = async (element, index) => {
    if (
      index !== undefined &&
      index === this.filterArray(this.props.options).length
    ) {
      element = element.substr(8, element.length - 1 - 8);
    }
    if (this.props.valueTools.multi) {
      if (typeof this.props.value !== "object") {
        let value = [element];
        this.props.setValue(value);
      } else {
        let value = [...this.props.value];
        value.push(element);
        this.props.setValue(value);
      }
      this.input.focus();
    } else {
      this.props.setValue(element);
    }
    await this.setState({ valueInput: "" });
  };

  createAnswer = arrayP => {
    let array = [...arrayP];
    const inputValue = this.state.valueInput.trim().toLowerCase();
    array.forEach(function(e, index) {
      return (array[index] = e.toLowerCase());
    });

    const position = array.indexOf(inputValue);

    if (position === -1 && this.state.valueInput) {
      arrayP.push(`Create "${this.state.valueInput}"`);
    }

    return arrayP;
  };

  multiValueDelete = element => {
    let value = [...this.props.value];
    let position = value.indexOf(element);
    value.splice(position, 1);
    this.props.setValue(value);
  };

  onClickClearLogo = () => {
    this.props.setValue("");
  };

  handleMouseMoveItem = index => {
    this.setState({ itemHover: index });
  };

  handleMouseEnterValue = index => {
    this.setState({ valueHover: index });
  };

  handleMouseLeaveValue = () => {
    this.setState({ valueHover: false });
  };

  handleClickDocument = () => {
    this.setState({ options: false });
  };

  // onBlurInput = async () => {
  //   await this.setState({ valueInput: "" });
  // };

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
              style={{ ...this.props.style.value.single }}
              valueInput={this.state.valueInput}
              multiSelect={this.props.valueTools.multi}
              value={this.props.value}
              inputProps={{
                readOnly: this.props.searchable ? false : true,
                id: `${this.props.id}_input`,
                myRef: ref => (this.input = ref),
                value: this.props.searchable ? this.state.valueInput : "",
                style: this.props.style.input,
                onChange: this.props.searchable
                  ? this.handleChangeInput
                  : false,
                onKeyDown: this.onKeyDownInput,
                onBlur: this.props.searchable ? this.onBlurInput : undefined
              }}
              multiValueProps={{
                onMouseEnter: this.handleMouseEnterValue,
                onMouseLeave: this.handleMouseLeaveValue,
                idItem: this.props.id,
                styleMultiValue: {
                  multiValue: this.props.style.value.multi,
                  delete: this.props.style.valueDelete.normal,
                  deleteHover: this.props.style.valueDelete.hover,
                  deleteFocus: this.props.style.valueDelete.focus
                },
                multiDelete: this.multiValueDelete,
                valueHover: this.state.valueHover,
                valueFocus: this.state.valueFocus
              }}
            />

            {!this.props.valueTools.multi && (
              <Input
                readOnly={this.props.searchable ? false : true}
                id={`${this.props.id}_input`}
                myRef={ref => (this.input = ref)}
                value={this.props.searchable ? this.state.valueInput : ""}
                style={this.props.style.input}
                onChange={
                  this.props.searchable ? this.handleChangeInput : false
                }
                onKeyDown={this.onKeyDownInput}
                onBlur={this.props.searchable ? this.onBlurInput : undefined}
              />
            )}

            {/* PLACEHOLDER */}
            {!this.props.value && !this.state.valueInput && (
              <Placeholder
                style={{
                  value: this.props.style.value.single,
                  placeholder: this.props.style.placeholder
                }}
                value={this.props.placeholder}
              />
            )}
          </div>

          {/* DIV DU CLEARABLE */}
          {this.props.valueTools.clearable && (
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

        {this.state.options && (
          <Options
            options={this.createAnswer(
              this.filterArray([...this.props.options])
            )}
            idItem={this.props.id}
            style={this.props.style.options}
            onClick={this.handleBodyClick}
            CLprops={{
              onClick: this.handleClickDocument,
              listenInside: this.props.optionsTools.disappearOnClick
            }}
            itemProps={{
              itemHover: this.state.itemHover,
              selection: this.props.optionsTools.selectedEffect,
              hover: this.props.optionsTools.hoverEffect,
              input: this.props.value,
              styleItem: this.props.style.item.normal,
              styleItemSelected: this.props.style.item.selected,
              styleItemHover: this.props.style.item.hover,
              onMouseMoveItem: index => this.handleMouseMoveItem(index),
              onClick: (element, index) => this.setValue(element, index)
            }}
          />
        )}
      </div>
    );
  }
}

Select.defaultProps = {
  searchable: false,
  value: "",
  options: [],
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
    options: {
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
  placeholder: "Select",
  optionsTools: {
    disappearOnClick: true, // <=> listenInside
    hoverEffect: true,
    SelectedEffect: true,
    SelectedFilter: true,
    CreateOptions: true
  },
  valueTools: {
    multi: false,
    wrap: false,
    itemDeletable: true,
    itemDeletableHover: true
  },
  logo: {
    logo: false,
    position: 1
  }
};

Select.propsTypes = {
  searchable: PropTypes.bool,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.array,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  optionsTool: PropTypes.shape({
    disappearOnClick: PropTypes.bool,
    hoverEffect: PropTypes.bool,
    SelectedEffect: PropTypes.bool,
    SelectedFilter: PropTypes.bool,
    CreateOptions: PropTypes.bool
  }),
  valueTool: PropTypes.shape({
    multi: PropTypes.bool,
    wrap: PropTypes.bool,
    itemDeletable: PropTypes.bool,
    itemDeletableHover: PropTypes.bool
  }),
  logo: PropTypes.shape({
    logo: PropTypes.bool,
    position: PropTypes.oneOf([-1, 1])
  })
};
