import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { Button } from "react-bootstrap";

export default function MyComp() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Button variant={theme === "dark" ? "light" : "dark"}>
        {" "}
        exp theme button child
      </Button>
    </>
  );
}
