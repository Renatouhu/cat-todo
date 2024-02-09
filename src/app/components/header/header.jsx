"use client";
import Image from "next/image";
import Logo from "../../../../public/images/header-logo-teste-black.png";
import themeIcon from "../../../../public/images/theme-icon.png";
import styles from "../../../../styles/header.module.sass";
import { currentTheme } from "../../../../public/themes/themes";

export const Header = (props) => {
  function onClickThemeIcon(e) {
    e.currentTarget.parentElement.innerHTML += `
      <div class=${styles.changeThemeContainer} style="background-color: ${currentTheme.colors.primary}">
        <button style="background-color: ${currentTheme.colors}">tema escuro</button>
        <button style="background-color: ${currentTheme.colors}">tema roxo pastel</button>
      </div>
    `;
  }

  return (
    <header
      className={styles.header}
      style={{ color: currentTheme.colors.onSurface }}
    >
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          {props.withimage === "true" ? (
            <Image src={Logo} alt="a draw of a cat" width={158} height={128} />
          ) : (
            ""
          )}
          <div style={{ backgroundColor: currentTheme.colors.primary }}></div>
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
          />
        </div>
      </div>
    </header>
  );
};
