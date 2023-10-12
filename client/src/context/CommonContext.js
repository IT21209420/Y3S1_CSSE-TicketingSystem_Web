import { createContext, useState } from "react";
const CommonContext = createContext();
export const CommonContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isSearchPressed, setIsSearchPressed] = useState(false);
  return (
    <CommonContext.Provider value={{ data, setData,isSearchPressed ,setIsSearchPressed}}>
      {children}
    </CommonContext.Provider>
  );
};

export default CommonContext;
