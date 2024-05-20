import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Components/Nav";
import { useState } from "react";
import ThemeContextProvider from "./Context/ThemeContextProvider";
import { Container } from "react-bootstrap";

function App() {
  const [theme, setTheme] = useState("light");
  // const [token, setToken] = useState("");
  return (
    <>
      <Container>
        <ThemeContextProvider>
          <div className="App">
            <Nav></Nav>
          </div>
        </ThemeContextProvider>
      </Container>
    </>
  );
}

export default App;
