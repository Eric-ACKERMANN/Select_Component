import React from "react";
import Select from "./SELECT";
import { selectStyle } from "./SELECT/Select_Style";

class App extends React.Component {
  state = {
    selectValue: "",
    selectValue2: ""
  };

  // 1er SELECT avec ReadOnly
  setSelectValue = element => this.setState({ selectValue: element });

  // 2ème SELECT avec possibilité d'écrire
  setSelectValue2 = element => this.setState({ selectValue2: element });

  render() {
    let array = [
      "Blue",
      "Yellow",
      "Green",
      "Orange",
      "Grey",
      "Black",
      "White",
      "Cyan",
      "Purple",
      "Magenta",
      "Amaranth",
      "Amber",
      "Amethyst",
      "Apricot",
      "Aquamarine",
      "Chocolate",
      "Coffee",
      "Crimson",
      "Spring bud",
      "Salmon",
      "Srping green",
      "Salmon"
    ];

    return (
      <div className="container">
        <div className="test">
          <div>
            <span>SELECT READ ONLY</span>
            <Select
              searchable={true}
              options={array}
              value={this.state.selectValue}
              setValue={this.setSelectValue}
              style={selectStyle}
              listenInside={true}
              idItem={"SelectRewritable"}
              logo={{
                logo: false,
                position: 1,
                body: <i className="fas fa-search" />
              }}
              clear={true}
              placeholder={"Selectionner une valeur"}
            />
          </div>
          <div>
            <span>SELECT</span>
            <Select
              onChange={this.handleChangeSelect1}
              setValue={this.setSelectValue2}
              id={"Select2"}
              searchable={true}
              value={this.state.selectValue2}
              options={array}
              style={selectStyle}
              placeholder="Selectionnez"
              optionsTools={{
                disappearOnClick: true, // <=> listenInside
                hoverEffect: true,
                selectedEffect: true,
                selectedFilter: true,
                createOptions: true
              }}
              valueTools={{
                multi: true,
                wrap: false,
                itemDeletable: true,
                itemDeletableHover: true,
                clearable: true
              }}
              logo={{
                logo: false,
                position: 1,
                body: <i className="fas fa-search" />
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
