import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// Step 1
const AuthContext = createContext();

//Step 2
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });

  //deafult axios settings
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("authinfo");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({ ...auth, user: parsedData.user, token: parsedData.token });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//Step 3-custom hook
const useAuthContext = () => useContext(AuthContext);

//Step 4
export { useAuthContext, AuthProvider };
