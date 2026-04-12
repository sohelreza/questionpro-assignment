import { useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import { useUsers } from "../../hooks/useUsers";
import styles from "./TodoList.module.css";

function TodoList() {
  const {
    data: todos,
    isLoading: todosLoading,
    error: todosError,
  } = useTodos();
  const { data: users, isLoading: usersLoading } = useUsers();
  const [selectedUser, setSelectedUser] = useState("");

  if (todosLoading || usersLoading) return <p>Loading...</p>;
  if (todosError) return <p>Error loading todos</p>;

  const getUserName = (userId) => {
    const user = users?.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };

  const filteredTodos = todos.filter((todo) => {
    return !selectedUser || todo.userId === Number(selectedUser);
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Todo List</h2>
      <div className={styles.filters}>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <ul className={styles.todoList}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={styles.todoItem}>
            <span className={styles.todoTitle}>{todo.title}</span>
            <span
              className={`${styles.badge} ${todo.completed ? styles.completed : styles.pending}`}
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>
            <span className={styles.userName}>{getUserName(todo.userId)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
