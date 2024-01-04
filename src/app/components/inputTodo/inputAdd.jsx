export const InputAdd = (props) => {
  return (
    <>
      <input onChange={props.handleInput} placeholder="Add a Title to your List" />
      <button onClick={props.addTodo} className="">
        Add+
      </button>
    </>
  );
};