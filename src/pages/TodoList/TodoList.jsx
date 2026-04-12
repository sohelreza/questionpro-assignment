import { useTodos } from "../../hooks/useTodos";
import { useUsers } from "../../hooks/useUsers";

function TodoList() {
  const {
    data: todos,
    isLoading: todosLoading,
    error: todosError,
  } = useTodos();
  const { data: users, isLoading: usersLoading } = useUsers();

  if (todosLoading || usersLoading) return <p>Loading...</p>;
  if (todosError) return <p>Error loading todos</p>;

  const getUserName = (userId) => {
    const user = users?.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}
          >
            <strong>{todo.title}</strong>
            <span
              style={{
                marginLeft: "10px",
                color: todo.completed ? "green" : "orange",
              }}
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>
            <span
              style={{ marginLeft: "10px", color: "#888", fontSize: "0.9em" }}
            >
              — {getUserName(todo.userId)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
