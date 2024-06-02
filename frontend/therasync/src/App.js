import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopBar from "./Components/Nav";
import Patients from "./Views/patients";
import ThemeContextProvider from "./Context/ThemeContextProvider";
import AccTokenContextProvider from "./Context/accTokenContextProvider";
import { Container } from "react-bootstrap";
import LoginPage from "./Views/login";
import Home from "./Views/home";
import Details from "./Views/details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePatient from "./Views/createPatient";

function App() {
  // const [theme, setTheme] = useState("light");
  // const [accToken, setAccToken] = useState("");
  // const [token, setToken] = useState("");
  return (
    <>
      <Router>
        <AccTokenContextProvider>
          <Container>
            <ThemeContextProvider>
              <Routes>
                <Route path="/" element={<LoginPage />}></Route>
                <Route
                  path="/home"
                  exact
                  element={
                    <>
                      <TopBar />
                      <Home />
                    </>
                  }
                />
                <Route
                  path="/patients"
                  exact
                  element={
                    <>
                      <TopBar />
                      <Patients />
                    </>
                  }
                />
                <Route
                  path="/patients/:id"
                  element={
                    <>
                      {" "}
                      <TopBar /> <Details />{" "}
                    </>
                  }
                />
                <Route
                  path="/patients/new"
                  element={
                    <>
                      <TopBar />
                      <CreatePatient />
                    </>
                  }
                />
              </Routes>
            </ThemeContextProvider>
          </Container>
        </AccTokenContextProvider>
      </Router>
    </>
  );
}

export default App;
