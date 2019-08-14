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
      "Srping green"
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
              id="Select2"
              setValue={this.setSelectValue}
              placeholder="Selectionnez une valeur...."
              optionsTools={{
                disappearOnClick: true,
                hoverEffect: true,
                selectedEffect: false,
                selectedFilter: true,
                createOptions: true
              }}
              valueTools={{
                multi: true,
                wrap: true,
                valueDeletable: true,
                valueDeletableHover: true,
                clearable: <i className="fas fa-times" />
              }}
              logo={{
                logo: false,
                position: 1,
                body: <i className="fas fa-search" />
              }}
              style={selectStyle}
            />
          </div>
          <div>
            <span>SELECT</span>
            <Select
              searchable={true}
              options={array}
              value={this.state.selectValue2}
              id="Select2"
              setValue={this.setSelectValue2}
              placeholder="Selectionnez une valeur...."
              optionsTools={{
                disappearOnClick: true,
                hoverEffect: true,
                selectedEffect: false,
                selectedFilter: true,
                createOptions: true
              }}
              valueTools={{
                multi: true,
                wrap: false,
                valueDeletable: true,
                valueDeletableHover: true,
                clearable: <i className="fas fa-times" />
              }}
              logo={{
                logo: false,
                position: 1,
                body: <i className="fas fa-search" />
              }}
              style={selectStyle}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
