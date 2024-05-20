import React from "react";
import { Navbar, NavbarBrand, Button } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContextProvider";

const Nav = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <Navbar bg={theme}>
        <NavbarBrand>
          <img
            style={{ width: "100px" }}
            src="https://plus.unsplash.com/premium_photo-1678112180202-cd950dbe5a35?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </NavbarBrand>
        <Button
          variant={theme === "dark" ? "light" : "dark"}
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          {" "}
          click me{" "}
        </Button>
      </Navbar>
    </>
  );
};

export default Nav;
