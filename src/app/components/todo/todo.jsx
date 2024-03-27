import stylesTodo from "../../../../styles/todo.module.sass";
import stylesMain from "../../../../styles/main.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { themes } from "../../../../public/themes/themes";
import { v4 as uuid } from "uuid";
export const Todo = ({
  listTodo,
  handleChangeItemStatus,
  handleEditTodo,
  handleDeleteTodo,
}) => {
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
        const stylesTodoCheckbox =
          item.status === true
            ? `${stylesTodo.item} ${stylesTodo.itemChecked}`
            : stylesTodo.item;
        return (
          <li key={uuid()} id={item.id}>
            <div
              className={`${stylesTodoCheckbox} ${stylesMain.checkbox}`}
              style={{ backgroundColor: themes[3].colors.onPrimary }}
              id="check-todo"
              onClick={toggleTodo}
            />
            <p className={stylesMain.todoText}>{item.name}</p>
            <FontAwesomeIcon
              icon={faPen}
              className={stylesMain.editIcon}
              onClick={handleEditTodo}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className={stylesMain.deleteIcon}
              onClick={handleDeleteTodo}
            />
          </li>
        );
      })
    ) : (
      <div className={stylesTodo.todosNull}>Add todos uphere!</div>
    );

  return <>{todos}</>;
};
