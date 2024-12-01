import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Container,
  Image,
  FormLabel,
} from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { useNavigate } from "react-router-dom";
import bgImg from "../images/bg-ttk2.png";
import logo from "../images/therapistAppointment.webp";

export default function LoginPage() {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    const str = `${process.env.REACT_APP_BACKEND_SERVER}/googleLogin`;
    window.open(str, "_self");
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (res.ok) {
        const { userFound, accessToken } = await res.json();
        window.localStorage.setItem("accToken", JSON.stringify(accessToken));
        window.localStorage.setItem("isLoggedIn", true);
        window.localStorage.setItem("doctorId", JSON.stringify(userFound._id));
        window.localStorage.setItem("doctorObj", JSON.stringify(userFound));
        window.location.href = `${process.env.REACT_APP_FRONTEND_SERVER}/home`;
      } else {
        alert("Wrong username or password.");
        console.error("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <body
      style={{
        minHeight: "100vh",
        background: theme === "dark" ? "#212529" : "#F8F9FA",
      }}
    >
      <Container
        className="fluid"
        style={{
          background: theme === "dark" ? "#212529" : "#F8F9FA",
        }}
      >
        <div className="d-flex flex-column  align-items-center">
          <Image
            src={logo}
            className="rounded-circle m-5 mb-3"
            style={{ width: "8vw" }}
          />
          <div>
            <h4
              className="mt-3"
              style={{
                fontFamily: "Montserrat,sans-serif",
                letterSpacing: "0.2rem",
              }}
            >
              Login to
            </h4>
            <h4
              className="mb-4"
              style={{
                fontFamily: "Montserrat,sans-serif",
                letterSpacing: "0.2rem",
              }}
            >
              TheraTimeKeeper
            </h4>
          </div>
          <div
            style={{
              backgroundColor: "#7BC76F",
              padding: "1.8rem",
              height: "300px",
            }}
            className="d-flex flex-column rounded-2"
          >
            <div className="mb-auto">
              <Form className="">
                <FormGroup className="">
                  <FormLabel
                    className="mb-1"
                    style={{
                      border: "none",
                      backgroundColor: "#7BC76F",
                      fontSize: "small",
                    }}
                  >
                    Username
                  </FormLabel>
                  <FormControl
                    style={{
                      width: "20vw",
                      backgroundColor: "#F8F9FA",
                      border: "1px solid black",
                      padding: "0.5rem 1rem",
                    }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="mb-3 form-control-sm rounded-2"
                  ></FormControl>
                  <FormLabel
                    className="mb-1"
                    style={{
                      border: "none",
                      backgroundColor: "#7BC76F",
                      fontSize: "small",
                    }}
                  >
                    Password
                  </FormLabel>
                  <FormControl
                    type="password"
                    style={{
                      width: "20vw",
                      backgroundColor: "#F8F9FA",
                      border: "1px solid black",
                      padding: "0.5rem 1rem",
                    }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="mb-3 form-control-sm rounded-2"
                  ></FormControl>
                </FormGroup>
              </Form>
            </div>
            <div className="d-flex justify-content-between ">
              <Button
                style={{ width: "8vw", fontSize: "small" }}
                // variant={theme === "dark" ? "light" : "dark"}
                type="submit"
                size="sm"
                className="login-btn"
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                className="login-btn"
                style={{ width: "8vw", fontSize: "small" }}
                // variant={theme === "dark" ? "light" : "dark"}
                type="button"
                size="sm"
                onClick={() => {
                  navigate("/profile/new");
                }}
              >
                Register
              </Button>
            </div>
          </div>

          {/* <div>
            <hr className="solid" />
          </div>
          <Button
            style={{ width: "30vw" }}
            variant="light"
            className="d-flex align-items-center justify-content-center border border-dark rounded-pill"
            onClick={handleGoogleAuth}
          >
            <svg
              className="m-2"
              height={"1rem"}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
            <p className="p-0 m-0 ms-2"> Login with Google </p>
          </Button>  */}
        </div>
      </Container>
    </body>
  );
}
