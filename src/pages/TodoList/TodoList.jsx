import { useFilters } from "../../hooks/useFilters";
import { useTodos } from "../../hooks/useTodos";
import { useUsers } from "../../hooks/useUsers";
import styles from "./TodoList.module.css";

const ITEMS_PER_PAGE = 10;

function TodoList() {
  const {
    data: todos,
    isLoading: todosLoading,
    error: todosError,
  } = useTodos();
  const { data: users, isLoading: usersLoading } = useUsers();
  const { filters, updateFilter } = useFilters();
  const { selectedUser, statusFilter, searchQuery, currentPage } = filters;

  if (todosLoading || usersLoading) return <p>Loading...</p>;
  if (todosError) return <p>Error loading todos</p>;

  const getUserName = (userId) => {
    const user = users?.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };

  const filteredTodos = todos.filter((todo) => {
    if (selectedUser && todo.userId !== Number(selectedUser)) return false;
    if (statusFilter === "completed" && !todo.completed) return false;
    if (statusFilter === "pending" && todo.completed) return false;
    if (
      searchQuery &&
      !todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTodos = filteredTodos.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Todo List</h2>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search todos..."
          value={searchQuery}
          onChange={(e) => updateFilter("searchQuery", e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={selectedUser}
          onChange={(e) => updateFilter("selectedUser", e.target.value)}
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => updateFilter("statusFilter", e.target.value)}
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      {paginatedTodos.length > 0 ? (
        <>
          <ul className={styles.todoList}>
            {paginatedTodos.map((todo) => (
              <li key={todo.id} className={styles.todoItem}>
                <span className={styles.todoTitle}>{todo.title}</span>
                <span
                  className={`${styles.badge} ${todo.completed ? styles.completed : styles.pending}`}
                >
                  {todo.completed ? "Completed" : "Pending"}
                </span>
                <span className={styles.userName}>
                  {getUserName(todo.userId)}
                </span>
              </li>
            ))}
          </ul>
          <div className={styles.pagination}>
            <button
              onClick={() => updateFilter("currentPage", currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => updateFilter("currentPage", currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          <p>No todos found matching your filters.</p>
        </div>
      )}
    </div>
  );
}

export default TodoList;
