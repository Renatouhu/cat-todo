import { Todo } from "../Todo/Todo.jsx";
import { InputAdd } from "../inputAdd/inputAdd.jsx";
import styles from "../../../../styles/main.module.sass";
import { currentTheme } from "../../../../public/themes/themes.js";
import { v4 as uuidv4 } from "uuid";

export function ListsTodo({ listsProp, addTodo, handleInput }) {
  const listsToRender = [...listsProp];
  return (
    <>
      {listsToRender.map((list) => {
        const keyId = uuidv4();
        return (
          <div
            className={styles.listName}
            key={keyId}
            style={{ backgroundColor: currentTheme.colors.surfaceContainer }}
          >
            <InputAdd
              addTodo={addTodo}
              handleInput={handleInput}
              value={list.name}
            />
            <ul
              className={styles.listTodos}
              style={{
                backgroundColor: currentTheme.colors.surfaceContainerHighest,
                color: currentTheme.colors.onSurfaceAlt,
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
