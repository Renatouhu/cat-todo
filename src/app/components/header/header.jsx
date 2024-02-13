"use client";
import Image from "next/image";
import Logo from "../../../../public/images/header-logo-teste-black.png";
import themeIcon from "../../../../public/images/theme-icon.png";
import styles from "../../../../styles/header.module.sass";
import { themes } from "../../../../public/themes/themes";
import { useContext } from "react";
import { ThemeContext } from "../../page";

export const Header = (props) => {
  const themeContext = useContext(ThemeContext);
  const themeId = themeContext["themeId"];
  const setThemeId = themeContext["setThemeId"];

  function onClickThemeIcon() {
    const themeContainer = document.getElementById("themeContainer");
    const isHidden = themeContainer.classList.contains(
      styles.hiddenThemeContainer
    );
    if (isHidden) {
      themeContainer.classList.remove(styles.hiddenThemeContainer);
      themeContainer.classList.add(styles.themeContainer);
      return;
    }
    themeContainer.classList.remove(styles.themeContainer);
    themeContainer.classList.add(styles.hiddenThemeContainer);
  }

  return (
    <header
      className={styles.header}
      style={{ color: themes[themeId].colors.onSurface }}
    >
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          {props.withimage === "true" ? (
            <Image
              src={Logo}
              alt="a draw of a cat"
              width={158}
              height={128}
              priority={true}
            />
          ) : (
            ""
          )}
          <div
            style={{ backgroundColor: themes[themeId].colors.primary }}
          ></div>
        </div>
        <h1>{props.title}</h1>
      </div>
      <div className={styles.themeHandler}>
        <div onClick={onClickThemeIcon}>
          <Image
            src={themeIcon}
            alt="a draw of a cat half black, half transparent"
            width={50}
            height={45}
            priority={true}
          />
        </div>
        <div
          id="themeContainer"
          className={styles.hiddenThemeContainer}
          style={{
            backgroundColor: themes[themeId].colors.surfaceContainerHighest,
            width: `calc( 70px * ${themes.length})`,
          }}
        >
          <div className={styles.backgroundSpecial}>
            {themes.map((theme, index) => {
              return (
                <button
                  key={crypto.randomUUID()}
                  style={{
                    background: `linear-gradient(to left, ${theme.colors.surface} 50%, ${theme.colors.primary} 50%)`,
                    color: theme.colors.onSurface,
                  }}
                  onClick={() => setThemeId(index)}
                >
                  {theme.themeName}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
