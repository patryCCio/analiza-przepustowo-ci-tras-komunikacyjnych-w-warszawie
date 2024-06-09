import { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [type, setType] = useState(null);

  return (
    <AppContext.Provider value={{ type, setType }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
