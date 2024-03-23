import styles from "../../../../styles/todo.module.sass";
import { themes } from "../../../../public/themes/themes";
import { v4 as uuid } from "uuid";
export const Todo = ({ listTodo, handleChangeItemStatus }) => {
  function toggleTodo(e) {
    let todoStatus = e.target.parentElement.attributes["status"].value;
    const todoItemId = e.target.parentElement.id;
    const todoListId = e.target.parentElement.parentElement.parentElement.id;
    if (todoStatus == "false") {
      handleChangeItemStatus(todoListId, todoItemId, true);
    } else {
      handleChangeItemStatus(todoListId, todoItemId, false);
    }
  }

  const listItems = listTodo.items === undefined ? [] : listTodo.items;
  const todos =
    listItems.length > 0 ? (
      listItems.map((item) => {
        const stylesCheckbox =
          item.status === true
            ? `${styles.item} ${styles.itemChecked}`
            : styles.item;
        return (
          <li key={uuid()} id={item.id} status={item.status.toString()}>
            <div
              className={stylesCheckbox}
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
