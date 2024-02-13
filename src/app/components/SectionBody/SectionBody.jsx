"use client";
import { useContext } from "react";
import { themes } from "../../../../public/themes/themes";
import { ThemeContext } from "../../page";

export function SectionBody({ children }) {
  const themeContext = useContext(ThemeContext);
  const themeId = themeContext["themeId"]
  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: themes[themeId].colors.surface,
      }}
    >
      {children}
    </section>
  );
}
