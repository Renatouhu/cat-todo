import styles from "../../../../styles/main.module.sass";
import { ListsTodo } from "../ListsTodo/ListsTodo";
import { themes } from "../../../../public/themes/themes";
import { useContext } from "react";
import { ThemeContext } from "../../page";

export const Main = () => {
  const themeId = useContext(ThemeContext)["themeId"];
  const actualTheme = themes[themeId];
  return (
    <>
      <main
        className={styles.main}
        style={{ backgroundColor: actualTheme.colors.onPrimaryContainer }}
      >
        <section className={styles.lists}>
          <ListsTodo></ListsTodo>
        </section>
      </main>
    </>
  );
};
