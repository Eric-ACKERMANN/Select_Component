import React from "react";
import Select from "./SELECT";
import Input from "./INPUT";
import { selectStyle, selectLogo } from "./SELECT/Select_Style";
import { inputStyle, inputLogo } from "./INPUT/Input_Style";

class App extends React.Component {
  state = {
    selectValue: "",
    selectValue2: "",
    inputValue: ""
  };

  // 1er SELECT avec ReadOnly
  setSelectValue = element => this.setState({ selectValue: element });
  handleChangeSelect1 = event => this.setState({ selectValue: event });

  // 2ème SELECT avec possibilité d'écrire
  setSelectValue2 = element => this.setState({ selectValue2: element });
  handleChangeSelect = event => this.setState({ selectValue2: event });

  // INPUT
  setInputValue = element => this.setState({ inputValue: element });
  handleChangeInput = event => this.setState({ inputValue: event });

  render() {
    let array = [];
    for (let i = 0; i < 40; i++) {
      array.push(`element ${i}`);
    }

    return (
      <div className="container">
        <div className="test">
          <div>
            <span>SELECT READ ONLY</span>
            <Select
              array={array}
              value={this.state.selectValue}
              onChange={this.handleChangeSelect1}
              itemClick={this.setSelectValue}
              style={selectStyle}
              listenInside={true}
              // readOnly={true}
              idItem={"SelectRewritable"}
              logo={selectLogo}
              clear={true}
              placeholder={"Select..."}
            />
          </div>
          <div>
            <span>SELECT</span>
            <Select
              array={array}
              value={this.state.selectValue2}
              onChange={this.handleChangeSelect}
              itemClick={this.setSelectValue2}
              style={selectStyle}
              idItem={"SelectReadOnly"}
              logo={selectLogo}
              multiSelect={true}
              multiWrap={true}
              clearable={true}
              multiDelete={true}
              placeholder={"Select..."}
            />
          </div>
        </div>
        <div className="test">
          <div>
            <span>INPUT</span>
            <Input
              array={array}
              value={this.state.inputValue}
              onChange={this.handleChangeInput}
              itemClick={this.setInputValue}
              style={inputStyle}
              itemSelected={false}
              idItem={"Input"}
              logo={inputLogo}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
