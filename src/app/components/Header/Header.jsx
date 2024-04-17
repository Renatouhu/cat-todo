"use client";
import { Lobster } from "next/font/google";
import Image from "next/image";
import themeIcon from "../../../../public/images/theme-icon.png";
import styles from "../../../../styles/header.module.sass";
import { themes } from "../../../../public/themes/themes";
import { useContext } from "react";
import { ThemeContext } from "../../page";

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const Header = (props) => {
  const themeId = useContext(ThemeContext)["themeId"];
  const actualTheme = themes[themeId];
  const setThemeId = useContext(ThemeContext)["setThemeId"];

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
      className={`${styles.header} ${lobster.className}`}
      style={{
        color: actualTheme.colors.onSurface,
        backgroundColor: actualTheme.colors.surface,
      }}
    >
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          {props.withImage === "true" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.0"
              viewBox="0 0 151 128"
            >
              <path
                fillOpacity=".98"
                stroke={actualTheme.colors.onPrimaryContainer}
                strokeOpacity=".98"
                strokeWidth="1.1"
                d="M76.8 57.7c.7.3 1.6.2 1.9-.1.4-.3-.2-.6-1.3-.5-1.1 0-1.4.3-.6.6zm52 14c.7.3 1.6.2 1.9-.1.4-.3-.2-.6-1.3-.5-1.1 0-1.4.3-.6.6z"
              />
              <g
                stroke={actualTheme.colors.onPrimaryContainer}
                strokeWidth="1.1"
              >
                <path d="M92.2 44.7c-1.6 2.1-4.1 5.7-5.6 7.9-3.1 4.8-5.3 5.5-14.3 4.7-6.1-.6-6.2-.6-9.7-5.8-4.9-7.1-8-9.5-11.9-9.5-3.4 0-8.5 3.9-7 5.3.3.4.1.7-.5.7-1.3 0-5.7 8-4.5 8 .5 0 .3.4-.3.8s-2.1 2.8-3.2 5.4c-2.3 5.2-2.8 5.4-8.7 3.4-5.6-1.9-16.1-3-16.9-1.8-.7 1.2 1 1.8 8.3 2.7 7.2 1 12.1 3.1 12.1 5.3 0 3.4-1.3 4.1-6 3.1-5-.9-16-.1-16 1.2 0 .5 4 .9 8.8.9 5 0 9.3.5 9.9 1.1.8.8.3 2.8-1.7 7.2-1.5 3.4-3.4 8.1-4.1 10.5-.7 2.3-1.8 4.7-2.6 5.3-.7.6-1.3 2.2-1.3 3.6 0 1.3-.7 3.8-1.6 5.5-1.3 2.6-5.4 15.6-5.4 17.3 0 .3.5.5 1 .5.6 0 1-.9 1-2 0-1 1.6-4.8 3.5-8.3s3.5-7.2 3.5-8.3c0-1 .9-3.3 2-4.9 1.1-1.7 2-3.7 2-4.5 0-2.1 11.2-29.6 16.2-39.8 2.3-4.6 5.4-10.1 7-12.3L49 44l3.8 2c2.1 1.1 5.5 4.5 7.8 7.7l4.1 5.8h20.6l5.2-7.5c7.5-10.9 10.8-10.8 17.9.5 9.3 14.6 20.4 40.2 29.3 67.7 1.6 4.8 3.1 7.8 3.9 7.8s1.4-.2 1.4-.4c0-2-16.1-45.5-18.1-49-1.8-3.2 1.4-4.7 9-4.5 4 .2 6.6-.2 6.8-.8.6-1.8-4.7-2.4-11.5-1.5-6.2.9-6.7.7-8.6-2.6-1.2-2 5.9-4.5 14.4-5.1 4.3-.4 7.4-1 7.2-1.6-.4-1.5-13.5-.8-17.7.9-5.3 2.2-5.9 2.1-7.9-2.2-2.7-5.8-7.6-13.4-11-17-2.3-2.5-3.8-3.2-6.7-3.2-3.1 0-4.2.6-6.7 3.7z" />
                <path d="M74.7 69.7c-.4.3-.7 1.5-.7 2.5 0 2.3-3.6 2.4-4.9 0-.7-1.3-1.3-1.4-2.2-.5s-.4 2.3 2.1 6.2c5 7.7 7.6 7.7 12.9 0 3.5-5.1 3.5-7.3.1-5.1-2.6 1.6-4 1.5-4-.2s-2.4-3.8-3.3-2.9zm2.3 8.8c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5zm-25-6c-.6.8-1 2.2-.8 3.2.5 2.6 7.1 2.6 7.6 0 .8-3.9-4.2-6.3-6.8-3.2zm41 0c-1.3 1.6-.6 5.1 1.3 5.8 2.1.8 5.7-1.2 5.7-3.1 0-3.8-4.6-5.6-7-2.7z" />
              </g>
              <path
                fill="#FFF"
                fillOpacity=".01"
                stroke="#FFF"
                strokeOpacity=".01"
                strokeWidth="1.1"
                d="M122.7 70.1c.7.7 1.5 1 1.8.7s-.2-.9-1.2-1.2c-1.4-.6-1.5-.5-.6.5z"
              />
              <path
                fill="#554040"
                fillOpacity=".18"
                stroke="#554040"
                strokeOpacity=".18"
                strokeWidth="1.1"
                d="M17.8 77.7c.7.3 1.6.2 1.9-.1.4-.3-.2-.6-1.3-.5-1.1 0-1.4.3-.6.6z"
              />
              <path
                fill="#A00"
                stroke="#A00"
                strokeWidth="1.1"
                d="M74.8 79.7c.7.3 1.6.2 1.9-.1.4-.3-.2-.6-1.3-.5-1.1 0-1.4.3-.6.6z"
              />
              <path
                fill="red"
                stroke="red"
                strokeWidth="1.1"
                d="M74.5 78c-.3.5.1 1 1 1s1.3-.5 1-1c-.3-.6-.8-1-1-1s-.7.4-1 1z"
              />
            </svg>
          ) : (
            ""
          )}
          <div style={{ backgroundColor: actualTheme.colors.primary }}></div>
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
            backgroundColor: actualTheme.colors.onPrimaryContainer,
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
