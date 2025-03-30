import React, { useState } from "react";
import Switch from "react-switch";
import { useThemeContext } from "../../../hooks/useThemeContext";
const SwitchExample = () => {
  const [checked, setChecked] = useState(false);
  const { colorMode } = useThemeContext();
  const handleChange = (checked) => {
    setChecked(checked);
  };

  return (
    <label>
      <Switch 
      onChange={handleChange}
      checked={checked}
      checkedIcon={false}
      uncheckedIcon={false}
      offColor={ colorMode == "light-mode" ? "#888":"#4b5563"}
      onColor={ colorMode == "light-mode" ?  "#7380ec" :"#4f46e5"}
      />
    </label>
  );
};

export default SwitchExample;
