import React from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../Context/ThemeContextProvider";
import "./createAppointment.css";

export default function CreateAppointment() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  const { theme } = useContext(ThemeContext);
  const localStorageToken = window.localStorage.getItem("accToken");
  const accToken = JSON.parse(localStorageToken);
  const localStorageDoctorId = window.localStorage.getItem("doctorId");
  const doctorId = JSON.parse(localStorageDoctorId);
  const [date, setDate] = useState("");
  const [meetingPurpose, setMeetingPurpose] = useState("");
  const [patient, setPatient] = useState("");
  const [patientObj, setPatientObj] = useState();
  const [schedule, setSchedule] = useState("");
  const [intervention, setIntervention] = useState("");
  const [meetId, setMeetId] = useState();
  const localStorageDoctorObj = window.localStorage.getItem("doctorObj");
  const doctor = JSON.parse(localStorageDoctorObj);

  let newAppointment = {
    date: date,
    schedule: schedule,
    reason: meetingPurpose,
    intervention: intervention,
    doctor: doctorId,
    patient: patient,
  };

  useEffect(() => {
    const getAppointmentPatient = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/appointments/patient/${patient}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const json = await res.json();
          setPatientObj(json);
        } else {
          console.error(
            "Failed to fetch patient data:",
            res.status,
            res.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    if (patient) {
      getAppointmentPatient();
    }
  }, [patient]);

  useEffect(() => {
    const appointmentId = query.get("appointmentId");
    const patientId = query.get("patientId");

    if (appointmentId) setMeetId(appointmentId);
    if (patientId) setPatient(patientId);
  }, [location.search]);

  const handleEdit = async (e) => {
    if (meetId) {
      try {
        const res = await fetch(
          `http://localhost:3001/appointments/edit/${meetId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newAppointment),
          }
        );

        if (res.ok) {
          alert("Changes saved successfully.");
          navigate(`/appointments/doctor/${doctorId}`);
        } else {
          alert("Failed to update patient:", res.statusText);
        }
      } catch (error) {
        console.error("An error occurred while updating patient:", error);
      }
    } else {
      alert("You need to add the patient first.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3001/appointments/${doctorId}/patient/${patient}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accToken}`,
          },
          body: JSON.stringify(newAppointment),
        }
      );

      if (res.ok) {
        const data = await res.json();
        alert("New Appointment created.");
        navigate(`/appointments/doctor/${doctorId}`);
      } else {
        const errorData = await res.json();
        alert(`Failed to create appointment: ${errorData.message}`);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while creating the appointment.");
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
              <div
                className="mx-2 p-2 d-flex align-items-center"
                style={{
                  height: "60px",
                }}
              >
                <svg
                  style={{
                    width: "25px",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z" />
                </svg>
              </div>
              <div style={{ color: "black" }}>
                <h2 className="p-0 m-0">Add/Edit Appointment</h2>
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
                <Form.Group
                  controlId="blog-form"
                  className="align-items-around d-flex flex-column"
                >
                  <div className="date-hour d-flex my-5">
                    <Form.Control
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                      size="sm"
                      placeholder="Date"
                      // className="mb-4"
                    />
                    <DropdownButton
                      size="sm"
                      className="ms-2"
                      id="dropdown-item-button"
                      title="Schedule"
                      variant="outline-primary"
                      onSelect={(eventKey, e) => {
                        e.preventDefault();
                        setSchedule(eventKey);
                      }}
                    >
                      <Dropdown.ItemText>
                        Schedule availability
                      </Dropdown.ItemText>
                      <Dropdown.Item eventKey={"10:00"} as="button">
                        10:00
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={"11:00"} as="button">
                        11:00
                      </Dropdown.Item>
                      <Dropdown.Item eventKey={"12:00"} as="button">
                        12:00
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>

                  <Form.Control
                    onChange={(e) => {
                      setMeetingPurpose(e.target.value);
                    }}
                    size="sm"
                    placeholder="Reason for Consultation"
                    className="my-5"
                  />
                  <Form.Control
                    onChange={(e) => {
                      setIntervention(e.target.value);
                    }}
                    size="sm"
                    placeholder="Intervention Type"
                    className="my-5"
                  />
                </Form.Group>
                <div className="d-flex justify-content-around my-4">
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
                    onClick={(e) => {
                      handleSave(e);
                    }}
                    type="submit"
                    size="sm"
                    className="ms-2 saveBtn"
                    variant="outline-primary"
                  >
                    Add
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
                <Card.Header>Appointment</Card.Header>
                <Card.Body>
                  <Card.Title>Appointment Details</Card.Title>
                  <Card.Text>
                    <p className="p-1">
                      {" "}
                      {date} {`${schedule}`}
                    </p>
                    <p className="p-1"> {meetingPurpose}</p>
                    <p className="p-1"> {intervention}</p>
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
