import styles from "../../../../styles/todo.module.sass";
import { themes } from "../../../../public/themes/themes";
import { useContext } from "react";

export const Todo = ({ listTodo }) => {
  function toggleTodo(e) {
    let ischecked = e.target.className === styles.item;
    if (ischecked) {
      e.target.className += ` ${styles.itemChecked}`;
    } else {
      e.target.className = styles.item;
    }
  }

  const listItems = listTodo.items === undefined ? [] : listTodo.items;
  const todos =
    listItems.length > 0 ? (
      listItems.map((item) => {
        return (
          <li key={item.id}>
            <div
              className={styles.item}
              style={{ backgroundColor: themes[3].colors.onPrimary }}
              id="check-todo"
              onClick={toggleTodo}
            />
            <p>{item.name}</p>
          </li>
        );
      })
    ) : (
      <div className={styles.todosNull}>Add todos uphere!</div>
    );

  return <>{todos}</>;
};
