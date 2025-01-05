import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "./createPatient.css";

export default function CreatePatient() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const localStorageToken = window.localStorage.getItem("accToken");
  const accToken = JSON.parse(localStorageToken);
  const localStorageDoctorId = window.localStorage.getItem("doctorId");
  const doctorId = JSON.parse(localStorageDoctorId);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [degree, setDegree] = useState("");
  const [job, setJob] = useState("");
  const [contact, setContact] = useState("");
  const [intervention, setIntervention] = useState("");
  const [reason, setReason] = useState("");
  const localStorageDoctorObj = window.localStorage.getItem("doctorObj");
  const doctor = JSON.parse(localStorageDoctorObj);

  let newPatient = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    degree: degree,
    job: job,
    contact: contact,
    interventionType: intervention,
    reasonForConsultation: reason,
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const savePatient = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER}/patients/${doctorId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accToken}`,
            },
            body: JSON.stringify(newPatient),
          }
        );
        const data = await res.json();
      };
      await savePatient();
      alert("New patient created.");
      navigate("/patients");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    if (id) {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER}/patients/${id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPatient),
          }
        );

        if (res.ok) {
          alert("Changes saved successfully.");
          navigate("/patients");
        } else {
          alert("Failed to update patient:", res.statusText);
        }
      } catch (error) {
        console.error("An error occurred while updating patient:", error);
      }
    } else {
      alert("You need to create the patient first.");
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
            <div className="d-flex align-items-center create-patient-div px-2">
              <div
                className="mx-2 ms-3 d-flex align-items-center"
                style={{
                  height: "60px",
                }}
              >
                <svg
                  style={{
                    width: "16px",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </div>
              <div
                style={{
                  color: "black",
                }}
              >
                <h2 className="create-patient-title p-0 m-0 ">
                  Add/Edit Patient
                </h2>
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
                  <Row className=" complete-name d-flex justify-content-between">
                    <Col sm={5} className="first-name">
                      <Form.Label> First Name </Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        size="sm"
                        placeholder="Ex. Alice"
                        className="mb-4"
                      />
                    </Col>
                    <Col sm={5} className="last-name">
                      <Form.Label> Last Name </Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        size="sm"
                        placeholder="Ex. Smith"
                        className="mb-4"
                      />
                    </Col>
                    <Col sm={2} className="age">
                      <Form.Label> Age </Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                        size="sm"
                        placeholder="Ex. 34"
                        className="mb-4"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label> Degree</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setDegree(e.target.value);
                        }}
                        size="sm"
                        placeholder="Ex. Bachelor"
                        className="mb-4"
                      />
                    </Col>
                    <Col>
                      <Form.Label> Profession </Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setJob(e.target.value);
                        }}
                        size="sm"
                        placeholder="Ex. Painter"
                        className="mb-4"
                      />
                    </Col>
                  </Row>
                  <Row></Row>
                  <Form.Label> Intervention Type </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setIntervention(e.target.value);
                    }}
                    size="sm"
                    placeholder="Ex. Family Therapy"
                    className="mb-4"
                  />
                  <Form.Label> What brings you here? </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                    size="sm"
                    placeholder="Ex. Uncontrolled Anger"
                    className="mb-4"
                  />
                  <Form.Label> Contact </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                    size="sm"
                    placeholder="Ex. 990-222-333  "
                    className="mb-4"
                  />
                </Form.Group>
                <div className="d-flex justify-content-around">
                  <Button
                    className="resetBtn"
                    type="reset"
                    size="sm"
                    variant={
                      theme === "dark" ? "outline-light" : "outline-dark"
                    }
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleSave}
                    type="submit"
                    size="sm"
                    className="ms-2 saveBtn"
                    variant="outline-primary"
                  >
                    Create
                  </Button>
                  <Button
                    variant="outline-success"
                    className="ms-2 editBtn"
                    size="sm"
                    onClick={handleEdit}
                  >
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Col>
            <Col className="d-flex justify-content-center">
              <Card
                className="mt-5"
                border={theme === "dark" ? "light" : "dark"}
              >
                <Card.Header>Patient</Card.Header>
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
