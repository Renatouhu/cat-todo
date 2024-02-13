"use client";
import { Todo } from "../Todo/Todo.jsx";
import styles from "../../../../styles/main.module.sass";
import { themes } from "../../../../public/themes/themes.js";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { InputAdd } from "../InputAdd/inputAdd.jsx";
import { ThemeContext } from "../../page.js";

export function ListsTodo({ listsProp, addTodo, handleInput }) {
  const themeContext = useContext(ThemeContext);
  const themeId = themeContext["themeId"];

  const listsToRender = [...listsProp];

  return (
    <>
      {listsToRender.map((list) => {
        const keyId = uuidv4();
        return (
          <div
            className={styles.listName}
            key={keyId}
            style={{ backgroundColor: themes[themeId].colors.surfaceContainer }}
          >
            <InputAdd
              addTodo={addTodo}
              handleInput={handleInput}
              value={list.name}
            />
            <ul
              className={styles.listTodos}
              style={{
                backgroundColor: themes[themeId].colors.surfaceContainerHighest,
                color: themes[themeId].colors.onSurfaceAlt,
              }}
            >
              <Todo listTodo={list} />
            </ul>
          </div>
        );
      })}
    </>
  );
}
