import React from "react";
import { SwitchStyle } from "./style";

export default function Switch({ value, onChange, checked }) {
  return (
    <SwitchStyle>
      <label class="switch">
        <input type="checkbox" value={value} checked={checked} onChange={onChange} />
        <span class="slider round" />
      </label>
    </SwitchStyle>
  );
}
