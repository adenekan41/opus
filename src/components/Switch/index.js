import React from "react";
import { SwitchStyle } from "./style";

export default function Switch({ value, onChange }) {
  return (
    <SwitchStyle>
      <label class="switch">
        <input type="checkbox" value={value} onChange={onChange} />
        <span class="slider round" />
      </label>
    </SwitchStyle>
  );
}
