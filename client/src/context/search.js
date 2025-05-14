import { createContext, useContext, useState } from "react";

// Step 1
const SearchContext = createContext();

//Step 2
const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({ keyword: "", results: [] });

  return (
    <SearchContext.Provider value={[values, setValues]}>
      {children}
    </SearchContext.Provider>
  );
};

//Step 3-custom hook
const useSearchContext = () => useContext(SearchContext);

//Step 4
export { useSearchContext, SearchProvider };
