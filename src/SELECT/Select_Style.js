import React from "react";

export const selectStyle = {
  container: {
    position: "relative",
    backgroundColor: "none",
    width: "300px"
  },
  input_box: {
    display: "flex",
    alignItems: "center",
    outline: "none",
    border: "1px solid black",
    backgroundColor: "white",
    borderRadius: 5,
    padding: "5px 5px 5px 5px"
    // height: 100,
    // width: 100
  },
  input: {
    padding: 0,
    fontSize: 14,
    fontWeight: 500,
    outline: "none",
    border: "none",
    width: 0,
    backgroundColor: "white"
  },
  value: {
    display: "flex",
    padding: 0,
    top: 0,
    fontSize: 14,
    fontWeight: 500
  },
  placeholder: {
    color: "#808080",
    position: "absolute"
  },

  menu: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "100%",
    width: "100%",
    padding: 0,
    backgroundColor: "white",
    boxShadow:
      "0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
    zIndex: 2,
    height: 200,
    overflow: "scroll"
  },
  item: {
    fontSize: 14,
    color: "black",
    padding: "5px 10px"
  },
  itemHover: {
    fontSize: 16,
    color: "black",
    backgroundColor: "cyan"
  },
  itemSelected: {
    fontSize: 18,
    fontWeight: 600,
    color: "black",
    backgroundColor: "#DDD"
  },
  multipleItem: {
    padding: "5px",
    backgroundColor: "#DDD",
    borderRadius: "3px",
    margin: "5px 5px"
  },
  logo: {
    padding: "0px 0px 0px 5px",
    margin: "0px 0px 0px 0px",
    borderLeft: "solid 1px black",
    marginLeft: "auto",
    height: "100%"
  }
};

export const selectLogo = {
  name: "searchLogo",
  body: (
    <i
      onMouseEnter={e => {
        console.log("hello");
      }}
      className="fas fa-search"
    />
  ),
  position: 1
};
