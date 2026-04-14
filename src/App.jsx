import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { FilterProvider } from "./context/FilterContext";
import FormBuilder from "./pages/FormBuilder/FormBuilder";
import FormPreview from "./pages/FormPreview/FormPreview";
import TodoList from "./pages/TodoList/TodoList";

function App() {
  return (
    <FilterProvider>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/todos" element={<TodoList />} />
            <Route path="/form-builder" element={<FormBuilder />} />
            <Route path="/form-preview" element={<FormPreview />} />
            <Route path="*" element={<Navigate to="/todos" />} />
          </Routes>
        </main>
      </div>
    </FilterProvider>
  );
}

export default App;
