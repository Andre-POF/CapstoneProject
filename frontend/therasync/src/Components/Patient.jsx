import React, { useContext } from "react";
import "./patient.css";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContextProvider";
import { useNavigate } from "react-router-dom";

export default function Patient({ patient }) {
  const { theme } = useContext(ThemeContext);
  const id = patient._id;
  const navigate = useNavigate();

  const handleDetails = () => {
    console.log(patient._id);
    navigate(`/patients/${id}`);
  };
  return (
    <>
      <div className="d-flex flex-column mb-3">
        <div className="d-flex flex-column mb-3 ms-3">
          <div className="mb-2">
            <h6 className="m-0">Reason for consultation:</h6>{" "}
            <span className="ms-3">{patient.reasonForConsultation}</span>
          </div>
          <div>
            <h6 className="m-0">Intervention type:</h6>{" "}
            <span className="ms-3">{patient.interventionType}</span>
          </div>
        </div>
        <Button className="details-btn" onClick={handleDetails} size="lg">
          Details
        </Button>
      </div>
    </>
  );
}
