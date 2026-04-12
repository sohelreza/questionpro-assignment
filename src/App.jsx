import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import FormBuilder from "./pages/FormBuilder/FormBuilder";
import FormPreview from "./pages/FormPreview/FormPreview";
import TodoList from "./pages/TodoList/TodoList";

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/todos" element={<TodoList />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/form-preview" element={<FormPreview />} />
          <Route path="*" element={<Navigate to="/todos" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
