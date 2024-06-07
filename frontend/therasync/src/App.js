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
import Footer from "./Components/Footer";
import CreateProfile from "./Views/createProfile";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(isLoggedIn);
  }, []);
  return (
    <>
      <Router>
        <DoctorIdContextProvider>
          <Container>
            <ThemeContextProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/"
                  element={
                    loggedIn ? (
                      <>
                        <TopBar />
                        <Home />
                        <Footer />
                      </>
                    ) : (
                      <LoginPage />
                    )
                  }
                />
                <Route path="/profile/new" exact element={<CreateProfile />} />
                <Route
                  path="/home"
                  exact
                  element={
                    <>
                      <TopBar />
                      <Home />
                      <Footer />
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
                      <Footer />
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
                      <Footer />
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
                      <Footer />
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
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/patients/:id"
                  element={
                    <>
                      {" "}
                      <TopBar /> <Details /> <Footer />
                    </>
                  }
                />
                <Route
                  path="/patients/new"
                  element={
                    <>
                      <TopBar />
                      <CreatePatient />
                      <Footer />
                    </>
                  }
                />
              </Routes>
            </ThemeContextProvider>
          </Container>
        </DoctorIdContextProvider>
      </Router>
    </>
  );
}

export default App;
