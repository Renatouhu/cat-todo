export const Todo = (props) => {
  const [listTodos, setListTodos] = useState([]);
  
  return listTodos.items.map((item, index) => {
    <li key={index}>
      <div className={classCheckbox} id="check-todo" onClick={changeCheckbox} />
      <p>{item.name}</p>
    </li>;
  });
};
