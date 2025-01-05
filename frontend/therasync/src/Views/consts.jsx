import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContextProvider";
import React from "react";
import { Image } from "react-bootstrap";

export default function Consts() {
  const localStorageDoctorObj = window.localStorage.getItem("doctorObj");
  const doctor = JSON.parse(localStorageDoctorObj);

  const { theme } = useContext(ThemeContext);

  if (doctor.avatar) {
    return (
      <Image
        src={doctor.avatar}
        roundedCircle
        style={{ width: "60px", objectFit: "cover", height: "60px" }}
      />
    );
  } else {
    return (
      <svg
        fill={theme === "dark" ? "#F8F9FA" : "#212529"}
        className="p-1"
        width={"30px"}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
      </svg>
    );
  }
}
