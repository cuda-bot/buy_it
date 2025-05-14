import { createContext, useContext, useState } from "react";

// Step 1
const SearchContext = createContext();

//Step 2
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({ keyword: "", results: [] });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

//Step 3-custom hook
const useSearchContext = () => useContext(SearchContext);

//Step 4
export { useSearchContext, SearchProvider };
