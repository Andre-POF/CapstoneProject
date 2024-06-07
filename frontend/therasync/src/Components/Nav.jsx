import React from "react";
import {
  Navbar,
  Nav,
  Button,
  Image,
  Container,
  NavDropdown,
  Dropdown,
  NavbarOffcanvas,
  Offcanvas,
} from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { useNavigate } from "react-router-dom";
import LogoutDrop from "./LogoutDrop";

const TopBar = () => {
  const localStorageDoctorId = window.localStorage.getItem("doctorId");
  const doctorId = JSON.parse(localStorageDoctorId);
  const navigate = useNavigate();
  const handleSignOut = () => {
    window.localStorage.removeItem("accToken");
    window.localStorage.removeItem("isLoggedIn");
  };
  const navPatient = () => {
    navigate("/patients");
  };
  const navAppointments = () => {
    navigate(`/appointments/doctor/${doctorId}`);
  };
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <Navbar expand="xl" bg={theme} className="d-flex align-items-center">
        <Navbar.Brand
          href="/"
          style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
        >
          <div
            style={{ backgroundColor: "#7BC76F" }}
            className="d-flex align-items-center p-1"
          >
            <Image
              className="fluid"
              roundedCircle
              style={{ width: "70px", height: "70px" }}
              src="http://localhost:3000/6.jpeg"
              alt=""
            />
            <div className=" mx-2">
              {" "}
              <span>
                <h2 style={{ fontWeight: "300", color: "black" }}>
                  THERA TIME KEEPER{" "}
                </h2>{" "}
              </span>{" "}
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle
          id="toggleBtn"
          className={theme === "dark" ? "lightBtn me-2" : "darkBtn me-2"}
          aria-controls="side-menu"
        />
        <Navbar.Offcanvas
          className={theme === "dark" ? "darkOffcanvas" : "lightOffcanvas"}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvas-title">Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body
            style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
          >
            <Nav
              className="d-flex align-items-center nav-links"
              variant="underline"
              id="side-menu"
            >
              <Nav.Link
                style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
              >
                T.T.Keeper Product
              </Nav.Link>
              <Nav.Link
                onClick={navAppointments}
                style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
              >
                Appointments
              </Nav.Link>
              <Nav.Link
                onClick={navPatient}
                style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
              >
                Patients
              </Nav.Link>
              <Nav.Link
                style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
              >
                Notifications
              </Nav.Link>
              <Nav.Link
                style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
              >
                Profile
              </Nav.Link>
            </Nav>
            <hr></hr>
            <div className="ms-auto me-2 d-flex align-items-center justify-content-around">
              <Button
                size="sm"
                variant={theme === "dark" ? "light" : "dark"}
                onClick={() => {
                  setTheme(theme === "light" ? "dark" : "light");
                }}
              >
                {" "}
                {theme === "light" ? (
                  <svg
                    height={"20px"}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="#F8F9FA"
                      d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
                    />
                  </svg>
                ) : (
                  <svg
                    style={{ padding: "4px" }}
                    height={"25px"}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
                  </svg>
                )}
              </Button>
              {/* <Button onClick={handleSignOut}>Sign OUT</Button> */}
              <LogoutDrop></LogoutDrop>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </>
  );
};

export default TopBar;
