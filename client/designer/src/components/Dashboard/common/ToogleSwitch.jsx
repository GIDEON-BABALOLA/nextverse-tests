import React, { useState } from "react";
import Switch from "react-switch";
import { useThemeContext } from "../../../hooks/useThemeContext";
const ToggleSwitch = ({ id, checked, handleChange }) => {
  const { colorMode } = useThemeContext();
  return (
    <label id={id}>
      <Switch 
      onChange={(e) =>  handleChange(e, id)}
      checked={checked}
      checkedIcon={false}
      uncheckedIcon={false}
      offColor={ colorMode == "light-mode" ? "#888":"#4b5563"}
      onColor={ colorMode == "light-mode" ?  "#7380ec" :"#4f46e5"}
      />
    </label>
  );
};

export default ToggleSwitch;
