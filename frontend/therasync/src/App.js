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
import DoctorIdContextProvider from "./Context/doctorIdContextProvider";
import CreateAppointment from "./Views/createAppointment";
import Appointments from "./Views/appointments";
import AppointmentDetails from "./Views/appointmentDetails";

function App() {
  return (
    <>
      <Router>
        <AccTokenContextProvider>
          <DoctorIdContextProvider>
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
                    path="/appointments/doctor/:doctorId"
                    exact
                    element={
                      <>
                        <TopBar />
                        <Appointments />
                      </>
                    }
                  />
                  <Route
                    path="/appointments/appointmentDetails/:appointmentId"
                    exact
                    element={
                      <>
                        <TopBar />
                        <AppointmentDetails />
                      </>
                    }
                  />
                  <Route
                    path="/appointments/new"
                    exact
                    element={
                      <>
                        <TopBar />
                        <CreateAppointment />
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
          </DoctorIdContextProvider>
        </AccTokenContextProvider>
      </Router>
    </>
  );
}

export default App;
