import React, { useContext, useEffect, useState } from "react";
import Appointment from "../Components/Appointment";
import {
  Container,
  Row,
  Col,
  Image,
  Accordion,
  FormControl,
} from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { useNavigate } from "react-router-dom";

export default function Appointments() {
  const { theme } = useContext(ThemeContext);
  const localStorageToken = window.localStorage.getItem("accToken");
  const accToken = JSON.parse(localStorageToken);
  const [appointments, setAppointments] = useState([]);
  const [findValue, setFindValue] = useState("");
  const navigate = useNavigate();
  const localStorageDoctorObj = window.localStorage.getItem("doctorObj");
  const doctor = JSON.parse(localStorageDoctorObj);
  const localStorageDoctorId = window.localStorage.getItem("doctorId");
  const doctorId = JSON.parse(localStorageDoctorId);
  const handleAddAppointment = () => {
    navigate("/appointments/new");
  };

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/appointments/doctor/${doctorId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accToken}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setAppointments(data);
        } else {
          console.error(
            `Failed to fetch appointments: ${res.status} ${res.statusText}`
          );
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (doctorId) {
      getAppointments();
    } else {
      console.log("no accToken!");
    }
  }, [doctorId]);

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
            <div className="d-flex doctor">
              <div className="mx-2">
                <Image
                  src={doctor.avatar}
                  alt="avatar"
                  className="avatar"
                  roundedCircle
                  fluid
                  style={{ width: "60px", height: "60px" }}
                />
              </div>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <div style={{ color: "black" }}>
                    <h2 className="p-0 m-0">
                      Dr. {doctor.name} {doctor.surname}
                    </h2>
                    <p className="p-0 m-0">{doctor.specialization}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="p-2 pt-0 d-flex justify-content-center">
              Appointments
            </div>
          </div>
        </Container>
        <Container>
          <div>
            <Row className="justify-content-center align-items-center mt-4">
              <Col className="d-flex justify-content-center align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  style={{
                    width: "15px",
                    margin: "10px",
                    fill: theme === "dark" ? "#F8F9FA" : "#212529",
                  }}
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
                <FormControl
                  placeholder="Find date/schedule/patient"
                  size="sm"
                  style={{ maxWidth: "350px" }}
                  onChange={(e) => {
                    setFindValue(e.target.value);
                  }}
                ></FormControl>
              </Col>
            </Row>
            <Row className="patients d-flex justify-content-center">
              {appointments.length === 0 ? (
                <p>No appointments found.</p>
              ) : (
                appointments
                  .filter((appointment) => {
                    if (findValue === "") {
                      return appointment;
                    } else {
                      return (
                        appointment.date.includes(findValue.toLowerCase()) ||
                        appointment.schedule.includes(
                          findValue.toLowerCase()
                        ) ||
                        appointment.patient.firstName
                          .toLowerCase()
                          .includes(findValue.toLowerCase()) ||
                        appointment.patient.lastName
                          .toLowerCase()
                          .includes(findValue.toLowerCase())
                      );
                    }
                  })
                  .map((appointment) => (
                    <Col key={appointment.id} md={10} className="mt-3">
                      <div
                        style={{
                          backgroundColor:
                            theme === "dark" ? "#212529" : "#F8F9FA",
                        }}
                      >
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item
                            style={{ backgroundColor: "#e9ecef" }}
                            eventKey="0"
                          >
                            <Accordion.Header>
                              <div className="d-flex justify-content-center flex-column">
                                <div>
                                  <h4 className="m-0">
                                    {`${appointment.patient.firstName} ${appointment.patient.lastName} ${appointment.date}, ${appointment.schedule}`}
                                  </h4>
                                </div>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body>
                              <Appointment appointment={appointment} />
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </Col>
                  ))
              )}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}
