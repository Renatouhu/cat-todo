import styles from "../../../../styles/todo.module.sass";

export const Todo = (props) => {
  function changeCheckbox(e) {
    let ischecked = e.target.className === styles.item;
    if (ischecked) {
      e.target.className += ` ${styles.itemChecked}`;
    } else {
      e.target.className = styles.item;
    }
  }

  return (
    <>
      {props.listTodo.items.map((item, index) => {
        return (
          <li key={index}>
            <div
              className={styles.item}
              id="check-todo"
              onClick={changeCheckbox}
            />
            <p>{item.name}</p>
          </li>
        );
      })}
    </>
  );
};
