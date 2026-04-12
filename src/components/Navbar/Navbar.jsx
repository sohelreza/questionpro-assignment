import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "1rem",
        borderBottom: "1px solid #ddd",
        display: "flex",
        gap: "1rem",
      }}
    >
      <Link to="/todos">Todos</Link>
      <Link to="/form-builder">Form Builder</Link>
      <Link to="/form-preview">Form Preview</Link>
    </nav>
  );
}

export default Navbar;
