import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AccTokenContext } from "../Context/accTokenContextProvider";
import { ThemeContext } from "../Context/ThemeContextProvider";
import "./details.css";
import { useNavigate } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const localStorageToken = window.localStorage.getItem("accToken");
  const accToken = JSON.parse(localStorageToken);
  const localStorageDoctorObj = window.localStorage.getItem("doctorObj");
  const doctor = JSON.parse(localStorageDoctorObj);
  const [patient, setPatient] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch(`http://localhost:3001/patients/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setPatient(data);
        } else {
          setError(`Failed to fetch patient: ${res.status} ${res.statusText}`);
        }
      } catch (error) {
        setError("Error fetching patient:", error);
      } finally {
        setLoading(false);
      }
    };
    if (accToken) {
      fetchPatient();
    }
  }, [id, accToken]);

  const handleEdit = async () => {
    navigate(`/patients/new?id=${id}`);
  };
  const handleDelete = async () => {
    const deletePatient = async () => {
      try {
        const res = await fetch(`http://localhost:3001/patients/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accToken}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
      } catch (error) {
        console.log(error);
      }
    };
    await deletePatient();
    alert("Patient Deleted!");
    navigate("/patients");
  };

  if (loading) {
    return <p>Loading patient data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!patient) {
    return <p>Patient not found</p>;
  }

  const handleBook = async () => {
    navigate(`/appointments/new?patientId=${id}`);
  };
  return (
    <>
      <Container
        className={
          theme === "dark"
            ? "viewContainer-dark p-5 pb-1 "
            : "viewContainer-light p-5 pb-1"
        }
      >
        <div
          className="p-5"
          style={{
            borderBottom: "solid 1px",
            borderBottomColor: theme === "dark" ? "#F8F9FA" : "#212529",
          }}
        >
          <div className="patients-details d-flex align-items-center">
            <div className="info mx-4">
              <svg
                style={{ width: "20px" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
              </svg>
            </div>
            <div className="h-details">
              <h2 className="m-0 p-3 ps-0">Patient's Details </h2>{" "}
            </div>
          </div>
        </div>
        <Container className="">
          <div className="info p-5">
            <h4 className="p-3">
              {patient.firstName} {patient.lastName}, {patient.age}
            </h4>
            <Container className="">
              <div className="contact attribute p-2 my-2">
                <Row>
                  <Col lg={3} className="lineTitle">
                    Age:
                  </Col>
                  <Col>
                    <p>{patient.age}</p>
                  </Col>
                </Row>
              </div>
              {/* <div className="gender attribute p-2 my-3">
                <Row>
                  <Col lg={3} className="lineTitle">
                    Gender:
                  </Col>
                  <Col>
                    <p>{patient.gender}</p>
                  </Col>
                </Row>
              </div> */}
              <div className="degree attribute p-2 my-2">
                <Row>
                  <Col lg={3} className="lineTitle">
                    Degree:
                  </Col>
                  <Col>
                    <p>{patient.degree}</p>
                  </Col>
                </Row>
              </div>
              <div className="job attribute p-2 my-2">
                <Row>
                  <Col lg={3} className="lineTitle">
                    Job:
                  </Col>
                  <Col>
                    <p>{patient.job}</p>
                  </Col>
                </Row>
              </div>

              {/* <div className="contact attribute p-2 my-2">
                <Row>
                  <Col lg={3} className="lineTitle">
                    Family:
                  </Col>
                  <Col>
                    <p>{patient.family}</p>
                  </Col>
                </Row>
              </div> */}
              <div className="contact attribute p-2 my-2">
                <Row>
                  <Col lg={3} className="lineTitle">
                    Intervention Type:
                  </Col>
                  <Col>
                    <p>{patient.interventionType}</p>
                  </Col>
                </Row>
              </div>
              <div className="contact attribute p-2 my-2">
                <Row>
                  <Col lg={3} className="lineTitle">
                    Reason for Consultation:
                  </Col>
                  <Col>
                    <p>{patient.reasonForConsultation}</p>
                  </Col>
                </Row>
              </div>
              <div className="contact attribute p-2 my-2">
                <Row>
                  <Col lg={3} className="lineTitle">
                    Contact:
                  </Col>
                  <Col>
                    <p>{patient.contact}</p>
                  </Col>
                </Row>
              </div>

              <Button
                onClick={handleEdit}
                className="m-2"
                variant={theme === "dark" ? "light" : "dark"}
              >
                <svg
                  fill={theme === "dark" ? "#212529" : "#F8F9FA"}
                  style={{ width: "15px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                </svg>
              </Button>

              <Button
                onClick={handleDelete}
                className="m-2"
                variant={theme === "dark" ? "light" : "dark"}
              >
                {" "}
                <svg
                  fill={theme === "dark" ? "#212529" : "#F8F9FA"}
                  style={{ width: "15px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                </svg>
              </Button>
              <Button
                onClick={handleBook}
                className="m-2"
                variant={theme === "dark" ? "light" : "dark"}
              >
                {" "}
                <svg
                  fill={theme === "dark" ? "#212529" : "#F8F9FA"}
                  style={{ width: "15px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192zm176 40c-13.3 0-24 10.7-24 24v48H152c-13.3 0-24 10.7-24 24s10.7 24 24 24h48v48c0 13.3 10.7 24 24 24s24-10.7 24-24V352h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V256c0-13.3-10.7-24-24-24z" />
                </svg>
              </Button>
            </Container>
          </div>
        </Container>
      </Container>
    </>
  );
}
