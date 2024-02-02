import { Todo } from "../Todo/Todo.jsx";
import { InputAdd } from "../inputAdd/inputAdd.jsx";
import styles from "../../../../styles/main.module.sass";
import { v4 as uuidv4 } from "uuid";

export function ListsTodo({ listsProp, addTodo, handleInput }) {
  const listsToRender = [...listsProp];
  return (
    <>
      {listsToRender.map((list) => {
        const keyId = uuidv4()
        return (
          <div className={styles.listName} key={keyId}>
            <InputAdd
              addTodo={addTodo}
              handleInput={handleInput}
              value={list.name}
            />
            <ul className={styles.listTodos}>
              <Todo listTodo={list} />
            </ul>
          </div>
        );
      })}
    </>
  );
}
