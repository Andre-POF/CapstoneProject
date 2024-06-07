import React from "react";
import { useState, useContext } from "react";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { Button, Dropdown, Image } from "react-bootstrap";
import "./LogoutDrop.css";
import { useNavigate } from "react-router-dom";

export default function LogoutDrop() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const localStorageDoctorObj = window.localStorage.getItem("doctorObj");
  const doctor = JSON.parse(localStorageDoctorObj);

  const handleSignOut = () => {
    window.localStorage.removeItem("accToken");
    window.localStorage.removeItem("doctorId");
    window.localStorage.removeItem("doctorObj");
    window.localStorage.setItem("isLoggedIn", false);
    navigate("/login");
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link" id="dropdown-basic" className="user-icon">
        <svg
          fill={theme === "dark" ? "#F8F9FA" : "#212529"}
          className="p-1"
          width={"30px"}
          style={{ padding: "4px" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>
          <Image
            className="me-2"
            src={doctor.avatar}
            alt=""
            roundedCircle
            style={{ width: "40px", height: "40px" }}
          />
          Dr.{doctor.name} {doctor.surname}
        </Dropdown.Header>
        {/* <hr />
        <Dropdown.Item>Account Settings</Dropdown.Item> */}
        <hr />
        <Dropdown.Item className="p-2 d-flex justify-content-center">
          <Button variant="warning" onClick={handleSignOut}>
            {" "}
            Logout{" "}
          </Button>{" "}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
