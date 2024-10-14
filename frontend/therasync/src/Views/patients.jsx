import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Accordion,
  FormControl,
} from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContextProvider";
import Patient from "../Components/Patient";
import { useNavigate } from "react-router-dom";

export default function Patients() {
  const { theme } = useContext(ThemeContext);
  const [patients, setPatients] = useState([]);
  const [findValue, setFindValue] = useState("");
  const navigate = useNavigate();
  const localStorageToken = window.localStorage.getItem("accToken");
  const accToken = JSON.parse(localStorageToken);
  const localStorageDoctorId = window.localStorage.getItem("doctorId");
  const doctorId = JSON.parse(localStorageDoctorId);
  const localStorageDoctorObj = window.localStorage.getItem("doctorObj");
  const doctor = JSON.parse(localStorageDoctorObj);

  const handleAddPatient = () => {
    navigate("/patients/new");
  };

  useEffect(() => {
    const getPatients = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_SERVER}/patients/user/${doctorId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accToken}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setPatients(data);
        } else {
          console.error(
            `Failed to fetch patients: ${res.status} ${res.statusText}`
          );
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    if (accToken) {
      getPatients();
    } else {
      alert("You must login again.");
    }
  }, [accToken]);

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
            className="p-5 pb-0"
            style={{
              borderBottom: "solid 1px",
              borderBottomColor: theme === "dark" ? "#F8F9FA" : "#212529",
            }}
          >
            <div className="d-flex align-items-center doctor p-1">
              <div className="mx-2">
                <Image
                  src={doctor.avatar}
                  alt=""
                  className="avatar"
                  roundedCircle
                  fluid
                  style={{ width: "60px", objectFit: "cover", height: "60px" }}
                />
              </div>
              <div style={{ color: "black" }}>
                <h3 className="p-0 m-0">
                  Dr. {doctor.name} {doctor.surname}
                </h3>
                <p className="p-0 m-0">{doctor.specialization}</p>
              </div>
              <div className="addBtn ms-auto d-flex justify-content-center align-items-center">
                <a
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                  }}
                  onClick={handleAddPatient}
                >
                  <div
                    style={{
                      border: "solid 1px black",
                      borderRadius: "5px",
                    }}
                    className="d-flex justify-content-center align-items-center me-3 p-2"
                  >
                    <svg
                      style={{
                        width: "15px",
                        margin: "10px",
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>{" "}
                    <span>Add Patient</span>
                  </div>
                </a>
              </div>
            </div>
            <div className="p-4  d-flex justify-content-center">
              <h4>Patients</h4>
            </div>
          </div>
        </Container>
        <Container>
          <div>
            <Row className="justify-content-center align-items-center mt-4">
              <Col className="d-flex justify-content-center align-items-center p-3">
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
                  placeholder="  Find patient..."
                  size="sm"
                  style={{
                    maxWidth: "350px",
                    borderRadius: "0.7rem",
                    border: "1px solid black",
                  }}
                  onChange={(e) => {
                    setFindValue(e.target.value);
                  }}
                ></FormControl>
              </Col>
            </Row>
            <Row className="patients d-flex justify-content-center">
              {patients.length === 0 ? (
                <p>No patients found.</p>
              ) : (
                patients
                  .filter((patient) => {
                    if (findValue === "") {
                      return patient;
                    } else {
                      return (
                        patient.firstName
                          .toLowerCase()
                          .includes(findValue.toLowerCase()) ||
                        patient.lastName
                          .toLowerCase()
                          .includes(findValue.toLowerCase())
                      );
                    }
                  })
                  .map((patient) => (
                    <Col key={patient.id} md={10} className="mt-3">
                      <div
                        style={{
                          backgroundColor:
                            theme === "dark" ? "#212529" : "#F8F9FA",
                        }}
                      >
                        <Accordion>
                          <Accordion.Item
                            style={{
                              backgroundColor: "#e9ecef",
                              padding: "1rem",
                            }}
                            eventKey="0"
                          >
                            <Accordion.Header>
                              <div className="d-flex justify-content-center flex-column">
                                <div>
                                  <p className="m-0">
                                    {`${patient.lastName}, ${patient.firstName}`}
                                  </p>
                                </div>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body>
                              <Patient patient={patient} />
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
