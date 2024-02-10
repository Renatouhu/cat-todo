"use client";
import Image from "next/image";
import Logo from "../../../../public/images/header-logo-teste-black.png";
import themeIcon from "../../../../public/images/theme-icon.png";
import styles from "../../../../styles/header.module.sass";
import { currentTheme } from "../../../../public/themes/themes";

export const Header = (props) => {
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
      style={{ color: currentTheme.colors.onSurface }}
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
        <div
          id="themeContainer"
          className={styles.hiddenThemeContainer}
          style={{ backgroundColor: currentTheme.colors.primaryContainer }}
        >
          <div className={styles.backgroundSpecial}>
            <button
              style={{
                background: "linear-gradient(to left, #fef7ff 50%, #6750A4 50%)",
                color: "black",
              }}
            >
              Light
            </button>
            <button
              style={{
                background: "linear-gradient(to left, #1d1b20 50%, #49454f 50%)",
                color: "white",
              }}
            >
              Dark
            </button>
            <button
              style={{
                background: "linear-gradient(to left, #330F18 50%, #E6A4B4 50%)",
                color: "white",
              }}
            >
              Red Pastel
            </button>
            <button
              style={{
                background: "linear-gradient(to left, #3D2661 50%, #705794 50%)",
                color: "white",
              }}
            >
              Purple Pastel
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
