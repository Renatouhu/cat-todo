"use client";
import { themes } from "../../../../public/themes/themes";
import { useContext } from "react";
import { ThemeContext } from "../../page";

export const InputAdd = ({ addTodo, handleInput, value }) => {
  const themeContext = useContext(ThemeContext)
  const themeId = themeContext['themeId']

  return (
    <>
      <input
        onChange={handleInput}
        placeholder="Add a Title to your List"
        value={value}
        style={{ color: themes[themeId].colors.onSurface }}
      />
      <button onClick={addTodo} style={{ color: themes[themeId].colors.onSurface }}>
        Add+
      </button>
    </>
  );
};
