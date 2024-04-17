import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../page";
import { themes } from "../../../../public/themes/themes";

export function Button({ children, styleOffButton, styleOnButton, onClickFn }) {
  const [isOnHover, setIsOnHover] = useState(false);
  const themeId = useContext(ThemeContext)["themeId"];
  const actualTheme = themes[themeId];

  useEffect(() => setIsOnHover(false), [actualTheme]);

  let styleHoverButton = isOnHover ? styleOnButton : styleOffButton;
  return (
    <button
      style={styleHoverButton}
      onClick={onClickFn}
      onMouseEnter={() => setIsOnHover(true)}
      onMouseLeave={() => setIsOnHover(false)}
    >
      {children}
    </button>
  );
}
