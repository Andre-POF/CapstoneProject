import React from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";

const Navbar = () => {
  const [myVar, setMyVar] = useState([]);
  // const [theme, setTheme] = useState("dark");

  const handleClick = () => {
    fetchTest();
  };

  async function fetchTest() {
    try {
      const res = await fetch("http://localhost:3001/test", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      console.log(json);
      setMyVar(json);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* <Navbar bg={theme} variant={theme}>
        <Container>
          <Navbar.Brand>
            <img
              src="https://plus.unsplash.com/premium_photo-1678112180202-cd950dbe5a35?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="sdgdf"
            />
          </Navbar.Brand>
        </Container>
      </Navbar> */}
      <p>Hello</p>
      <Button onClick={handleClick}>Test </Button>
      {/* <Button onClick={() => setTheme(theme === "dark" ? "Light" : "dark")}>
        {" "}
        Theme{" "}
      </Button> */}
      <div>
        {myVar.map((test, i) => {
          return (
            <>
              <p>{test.name}</p>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
