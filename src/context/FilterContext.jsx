import PropTypes from "prop-types";
import { createContext, useMemo, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    selectedUser: "",
    statusFilter: "",
    searchQuery: "",
    currentPage: 1,
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== "currentPage" ? { currentPage: 1 } : {}),
    }));
  };

  const value = useMemo(() => ({ filters, updateFilter }), [filters]);

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FilterContext;
