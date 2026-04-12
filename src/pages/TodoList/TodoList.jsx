import { useTodos } from "../../hooks/useTodos";

function TodoList() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) return <p>Loading todos...</p>;
  if (error) return <p>Error loading todos</p>;

  return (
    <div>
      <h2>Todo List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}
          >
            <span>{todo.title}</span>
            <span
              style={{
                marginLeft: "10px",
                color: todo.completed ? "green" : "orange",
              }}
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
