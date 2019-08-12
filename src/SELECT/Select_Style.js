import React from "react";

export const selectStyle = {
  container: {
    position: "relative",
    backgroundColor: "none",
    width: "315px"
  },
  input_box: {
    display: "flex",
    alignItems: "center",
    border: "1px solid black", // INPUT BORDER COLOR
    backgroundColor: "white", // INPUT BACKGROUND COLOR
    borderRadius: 5, // INPUT BORDER RADIUS
    padding: "5px 5px 5px 5px" // INPUT PADDING
    // INPUT OUTLINE
  },
  input: {
    padding: 0,
    fontSize: 14, // INPUT FONT SIZE
    fontWeight: 500, // INPUT FONT WEIGHT
    outline: "none",
    border: "none",
    width: 0,
    backgroundColor: "white" // INPUT BAKCGROUND COLOR
  },

  value: {
    single: {
      display: "flex",
      padding: 0,
      top: 0,
      fontSize: 14, // VALUE FONT SIZE
      fontWeight: 500 // VALUE FONT WEIGHT
    },
    multi: {
      padding: "5px",
      display: "flex",
      backgroundColor: "#DDD",
      justifyContent: "center",
      alignItems: "center"
    }
  },
  valueDelete: {
    normal: {
      fontSize: 10,
      padding: 5,
      display: "flex",
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center"
    },
    hover: {
      backgroundColor: "blue",
      color: "cyan"
    },
    focus: {
      backgroundColor: "yellow",
      color: "orange"
    }
  },

  placeholder: {
    color: "#808080",
    position: "absolute"
  },
  options: {
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
    maxHeight: 200,
    overflow: "scroll"
  },
  item: {
    normal: { fontSize: 14, color: "black", padding: "5px 10px" },
    hover: { fontSize: 16, color: "black", backgroundColor: "cyan" },
    selected: {
      fontSize: 18,
      fontWeight: 600,
      color: "black",
      backgroundColor: "#DDD"
    }
  },

  logo: {
    padding: "0px 0px 0px 5px",
    margin: "0px 0px 0px 0px",
    borderLeft: "solid 1px black",
    marginLeft: "auto",
    height: "100%"
  },
  clearLogo: {
    padding: "0px 0px 0px 5px",
    margin: "0px 5px 0px 0px",
    marginLeft: "auto",
    height: "100%"
  }
};

export const selectLogo = {
  name: "searchLogo",
  body: <i className="fas fa-search" />,
  position: 1
};

export const clearLogo = {
  name: "clearLogo",
  body: <i className="fas fa-times" />
};
