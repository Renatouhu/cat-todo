import stylesTodo from "../../../../styles/todo.module.sass";
import stylesMain from "../../../../styles/main.module.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { themes } from "../../../../public/themes/themes";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { ThemeContext } from "../../page";

export const Todo = ({
  listTodo,
  handleChangeItemStatus,
  handleEditTodo,
  handleDeleteTodo,
}) => {
  const themeId = useContext(ThemeContext)["themeId"];
  const actualTheme = themes[themeId];

  function toggleTodo(e) {
    let todoStatus = e.target.parentElement.attributes["status"].value;
    const todoItemId = e.target.parentElement.id;
    const todoListId =
      e.target.parentElement.parentElement.parentElement.parentElement.id;
    if (todoStatus == "false") {
      handleChangeItemStatus(todoListId, todoItemId, true);
    } else {
      handleChangeItemStatus(todoListId, todoItemId, false);
    }
  }

  let todos;
  if (listTodo.items != undefined && listTodo.items.length > 0) {
    todos = listTodo.items.map((item) => {
      const stylesTodoCheckbox =
        item.status === true
          ? `${stylesTodo.item} ${stylesTodo.itemChecked}`
          : stylesTodo.item;
      return (
        <li key={uuidv4()}>
          <div
            className={stylesMain.todoContent}
            status={item.status.toString()}
            id={item.id}
          >
            <div
              className={`${stylesTodoCheckbox}`}
              style={{ backgroundColor: actualTheme.colors.onPrimary }}
              id="check-todo"
              onClick={toggleTodo}
            />
            <p>{item.name}</p>
          </div>
          <FontAwesomeIcon
            icon={faPen}
            className={stylesMain.editIcon}
            onClick={(e) => handleEditTodo(e, item.name)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className={stylesMain.deleteIcon}
            onClick={handleDeleteTodo}
          />
        </li>
      );
    });
  }

  return <>{todos}</>;
};
