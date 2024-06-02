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

export default function LoginPage() {
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //   const navigate = useNavigate();
  //   // const { token, setToken } = useContext(TokenContext);
  //   const [token, setToken] = useState("");

  // const handleSubmitLogin = async (e) => {
  //   e.preventDefault();

  //   await handleLogin(username, password);
  //   navigate("/home");
  //   console.log(`${username} and ${password}`);
  // };

  // const handlePassword = async (e) => {
  //   await setPassword(e.target.value);
  // };

  // const handleUsername = async (e) => {
  //   await setUsername(e.target.value);
  // };

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    const str = "http://localhost:3001/googleLogin";
    window.open(str, "_self");
  };

  //   const handleRegister = () => {
  //     navigate("/register");
  //   };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (res.redirected) {
        // localStorage.setItem("jwtToken", accessToken);
        window.location.href = res.url;
      } else if (res.ok) {
        const { accessToken } = await res.json();
      } else {
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
              <FormLabel
                style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
              >
                {" "}
                Email or Username
              </FormLabel>
              <FormControl
                style={{ width: "40vw" }}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="mb-3 form-control-sm"
                placeholder="Email or Username"
              ></FormControl>
              <FormLabel
                style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
              >
                {" "}
                Password{" "}
              </FormLabel>
              <FormControl
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
                //onClick={handleRegister}
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
