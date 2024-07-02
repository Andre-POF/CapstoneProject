import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContextProvider";
import "./createProfile.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  //   const [toggle, setToggle] = useState(true);
  const [placeholder, setPlaceholder] = useState("");

  const updatePlaceholder = () => {
    if (window.innerWidth < 992) {
      setPlaceholder(true);
    } else {
      setPlaceholder(false);
    }
  };

  useEffect(() => {
    updatePlaceholder();
    window.addEventListener("resize", updatePlaceholder);
  }, []);

  const payload = {
    username: username,
    password: password,
    name: name,
    surname: surname,
    specialization: specialization,
    email: email,
    avatar: avatar,
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const createDoctor = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER}/doctors`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        const data = await res.json();
      };
      await createDoctor();
      alert("Profile created successfully.");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
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
            Create your profile{" "}
          </h3>
          <Form>
            <FormGroup>
              <Row className="justify-content-center">
                <Col lg={3} className="d-flex flex-column label-col" style={{}}>
                  <FormLabel
                    className=" d-flex mb-4 justify-content-end"
                    style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
                  >
                    {" "}
                    Username
                  </FormLabel>
                  <FormLabel
                    className=" d-flex mb-4 justify-content-end"
                    style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
                  >
                    {" "}
                    Password{" "}
                  </FormLabel>
                  <FormLabel
                    className=" d-flex mb-4 justify-content-end"
                    style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
                  >
                    {" "}
                    Name
                  </FormLabel>
                  <FormLabel
                    className=" d-flex mb-4 justify-content-end"
                    style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
                  >
                    {" "}
                    Surname
                  </FormLabel>
                  <FormLabel
                    className=" d-flex mb-4 justify-content-end"
                    style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
                  >
                    {" "}
                    Specialization
                  </FormLabel>
                  <FormLabel
                    className=" d-flex mb-4 justify-content-end"
                    style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
                  >
                    {" "}
                    Email
                  </FormLabel>
                  <FormLabel
                    className=" d-flex mb-4 justify-content-end"
                    style={{ color: theme === "dark" ? "#F8F9FA" : "#212529" }}
                  >
                    {" "}
                    Avatar
                  </FormLabel>
                </Col>
                <Col lg={7}>
                  <FormControl
                    placeholder={placeholder ? "Username" : ""}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="mb-4 form-control-md create-control"
                  ></FormControl>
                  <FormControl
                    placeholder={placeholder ? "Password" : ""}
                    type="password"
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="mb-4 form-control-md create-control"
                  ></FormControl>
                  <FormControl
                    placeholder={placeholder ? "Name" : ""}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="mb-4 form-control-md create-control"
                  ></FormControl>
                  <FormControl
                    placeholder={placeholder ? "Surname" : ""}
                    onChange={(e) => {
                      setSurname(e.target.value);
                    }}
                    className="mb-4 form-control-md create-control"
                  ></FormControl>
                  <FormControl
                    placeholder={placeholder ? "Specialization" : ""}
                    onChange={(e) => {
                      setSpecialization(e.target.value);
                    }}
                    className="mb-4 form-control-md create-control"
                  ></FormControl>
                  <FormControl
                    placeholder={placeholder ? "Email" : ""}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="mb-4 form-control-md create-control"
                  ></FormControl>
                  <FormControl
                    placeholder={placeholder ? "Avatar" : ""}
                    onChange={(e) => {
                      setAvatar(e.target.value);
                    }}
                    className="mb-4 form-control-md create-control"
                  ></FormControl>
                </Col>
              </Row>
              <Row>
                <Col lg={7}>
                  <Button
                    style={{ width: "40vw" }}
                    variant={theme === "dark" ? "light" : "dark"}
                    type="button"
                    size="sm"
                    onClick={handleRegister}
                    className=""
                  >
                    Register
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>

          <div>
            <hr className="solid" />
          </div>
        </div>
      </Container>
    </body>
  );
}
