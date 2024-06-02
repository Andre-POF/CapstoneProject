import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "./createPatient.css";
import { AccTokenContext } from "../Context/accTokenContextProvider";

export default function CreatePatient() {
  const { theme } = useContext(ThemeContext);
  const { accToken } = useContext(AccTokenContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [degree, setDegree] = useState("");
  const [job, setJob] = useState("");
  const [contact, setContact] = useState("");
  const [intervention, setIntervention] = useState("");
  const [reason, setReason] = useState("");

  let newPatient = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    gender: "M",
    degree: degree,
    job: job,
    contact: contact,
    family: "wife and 3 kids",
    interventionType: intervention,
    reasonForConsultation: reason,
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const savePatient = async () => {
        const res = await fetch("http://localhost:3001/patients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accToken}`,
          },
          body: JSON.stringify(newPatient),
        });
        const data = await res.json();
      };
      await savePatient();
      alert("patient saved!!!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: theme === "dark" ? "#212529" : "#F8F9FA",
          color: theme === "dark" ? "#F8F9FA" : "#212529",
        }}
      >
        <Container className="p-5 pb-1">
          <div
            className="p-5"
            style={{
              borderBottom: "solid 1px",
              borderBottomColor: theme === "dark" ? "#F8F9FA" : "#212529",
            }}
          >
            <div className="d-flex align-items-center doctor">
              <div className="mx-2">
                <svg
                  style={{
                    width: "60px",
                    height: "60px",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </div>
              <div style={{ color: "black" }}>
                <h2 className="p-0 m-0">New Patient</h2>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div
        style={{
          backgroundColor: theme === "dark" ? "#212529" : "#F8F9FA",
          color: theme === "dark" ? "#F8F9FA" : "#212529",
        }}
      >
        <Container className="new-blog-container p-5">
          <Row>
            <Col md={{ offset: 1 }}>
              <Form className="">
                <Form.Group controlId="blog-form" className="">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    size="sm"
                    placeholder="First Name"
                    className="mb-4"
                  />
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    size="sm"
                    placeholder="Last Name"
                    className="mb-4"
                  />
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    size="sm"
                    placeholder="Age"
                    className="mb-4"
                  />
                  <Form.Label>Degree</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setDegree(e.target.value);
                    }}
                    size="sm"
                    placeholder="Degree"
                    className="mb-4"
                  />
                  <Form.Label>Job</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setJob(e.target.value);
                    }}
                    size="sm"
                    placeholder="Job"
                    className="mb-4"
                  />
                  <Form.Label>Intervention Type</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setIntervention(e.target.value);
                    }}
                    size="sm"
                    placeholder="Intervention Type"
                    className="mb-4"
                  />
                  <Form.Label>Reason for Consultation</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                    size="sm"
                    placeholder="Reason for Consultation"
                    className="mb-4"
                  />
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                    size="sm"
                    placeholder="Contact"
                    className="mb-4"
                  />
                </Form.Group>
                <Button type="reset" size="sm" variant="outline-dark">
                  Reset
                </Button>
                <Button
                  onClick={handleSave}
                  type="submit"
                  size="sm"
                  className="ms-2"
                  variant="dark"
                >
                  Save
                </Button>
                <Button
                  variant="success"
                  className="ms-2"
                  size="sm"
                  //   onClick={handleHome}
                >
                  {" "}
                  Home{" "}
                </Button>
              </Form>
            </Col>
            <Col className="d-flex justify-content-center">
              <Card
                className="mt-5"
                border={theme === "dark" ? "light" : "dark"}
              >
                <Card.Header>New Patient</Card.Header>
                <Card.Body>
                  <Card.Title>
                    {" "}
                    {firstName} {lastName} {age}
                  </Card.Title>
                  <Card.Text>
                    <p className="p-1"> {degree}</p>
                    <p className="p-1"> {job}</p>
                    <p className="p-1"> {intervention}</p>
                    <p className="p-1"> {reason}</p>
                    <p className="p-1"> {contact}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
