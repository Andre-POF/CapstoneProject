import React, { createContext } from "react";
import { useState } from "react";

export const AccTokenContext = createContext(null);

function AccTokenContextProvider({ children }) {
  const [accToken, setAccToken] = useState("");
  const value = { accToken, setAccToken };
  return (
    <>
      <AccTokenContext.Provider value={value}>
        {children}
      </AccTokenContext.Provider>
    </>
  );
}

export default AccTokenContextProvider;
