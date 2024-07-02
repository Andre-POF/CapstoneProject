import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Container,
} from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { useNavigate } from "react-router-dom";
import { BACKEND_SERVER } from "../constants";

export default function LoginPage() {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    const str = `${BACKEND_SERVER}/googleLogin`;
    window.open(str, "_self");
  };

  //   const handleRegister = () => {
  //     navigate("/register");
  //   };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_SERVER}/login`, {
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
        window.location.href = `http://localhost:3000/home`;
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
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h3
            className="my-5"
            style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
          >
            {" "}
            Log in to Thera Time Keeper{" "}
          </h3>
          <Form>
            <FormGroup>
              <FormControl
                style={{ width: "40vw" }}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="mb-3 form-control-sm"
                placeholder="Email or Username"
              ></FormControl>
              <FormControl
                type="password"
                style={{ width: "40vw" }}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="mb-3 form-control-sm"
                placeholder="Password"
              ></FormControl>
            </FormGroup>
            <div className="d-flex justify-content-around ">
              <Button
                style={{ width: "150px" }}
                variant={theme === "dark" ? "light" : "dark"}
                type="submit"
                size="sm"
                className=""
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                style={{ width: "150px" }}
                variant={theme === "dark" ? "light" : "dark"}
                type="button"
                size="sm"
                onClick={() => {
                  navigate("/profile/new");
                }}
                className=""
              >
                Register
              </Button>
            </div>
          </Form>

          <div>
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
          </Button>
        </div>
      </Container>
    </body>
  );
}
