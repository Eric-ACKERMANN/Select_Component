import React from "react";

export const inputStyle = {
  container: {
    position: "relative",
    backgroundColor: "none"
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
    border: "none"
  },
  value: {
    padding: 0,
    position: "absolute",
    top: 0,
    fontSize: 14,
    fontWeight: 500
  },
  placeholder: {
    color: "#808080"
  },

  box: {
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
    color: "red",
    padding: "5px 10px"
  },
  itemHover: {
    fontSize: 16,
    color: "blue",
    backgroundColor: "green"
  },
  itemSelected: {
    fontSize: 18,
    fontWeight: 600,
    color: "black",
    backgroundColor: "#DDD"
  },
  logo: {
    padding: "0px 0px 0px 5px",
    margin: "0px 0px 0px 0px",
    borderLeft: "solid 1px black"
  }
};

export const inputLogo = {
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
