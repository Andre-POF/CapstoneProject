import React, { createContext } from "react";
import { useState } from "react";

export const DoctorIdContext = createContext(null);

function DoctorIdContextProvider({ children }) {
  const [doctorId, setDoctorId] = useState("");
  const value = { doctorId, setDoctorId };
  return (
    <>
      <DoctorIdContext.Provider value={value}>
        {children}
      </DoctorIdContext.Provider>
    </>
  );
}

export default DoctorIdContextProvider;
