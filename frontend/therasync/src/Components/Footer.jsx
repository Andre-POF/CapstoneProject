import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <>
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex flex-column justify-content-start justify-content-lg-between p-4 border-bottom">
          <div className="d-flex justify-content-start ">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="twitter" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="google" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="instagram" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon icon="gem" className="me-3" />
                  Company name
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Angular
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    React
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Pricing
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Settings
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon icon="home" className="me-2" />
                  New York, NY 10012, US
                </p>
                <p>
                  <MDBIcon icon="envelope" className="me-3" />
                  info@example.com
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </MDBFooter>
    </>
  );
}
