import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AccTokenContext } from "../Context/accTokenContextProvider";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import { ThemeContext } from "../Context/ThemeContextProvider";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const query = useQuery();
  const { accToken, setAccToken } = useContext(AccTokenContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const token = query.get("accessToken");
    if (token) {
      setAccToken(token);
    }
  }, [query, setAccToken]);
  console.log(accToken);

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Container
        className={
          theme === "dark" ? "homeContainer-dark" : "homeContainer-light"
        }
      >
        <h1 className="p-5">
          Manage patients and Schedule
          <br /> Review Appointments and Notes
        </h1>
        <Container>
          <Row>
            <Col
              xxl={{ span: 4, offset: 4 }}
              className="d-flex justify-content-center"
            >
              <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                  <div>
                    <img
                      id="carouselImg"
                      // style={{ height: "600px", width: "550px" }}
                      src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg"
                      text="First slide"
                    />
                  </div>
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <div>
                    <img
                      id="carouselImg"
                      // style={{ height: "600px", width: "550px" }}
                      src="https://media.istockphoto.com/id/1387958415/it/foto/valutazione-dello-sviluppo-mentale-dei-bambini-psicologa-donna-professionista-che-guarda-il.jpg?s=1024x1024&w=is&k=20&c=cyzDYfFkNlrWlohl6DJBswkATlk5k-FyvrFIACnxmp4="
                      text="Second slide"
                    />
                  </div>
                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <div>
                    <img
                      id="carouselImg"
                      // style={{ height: "600px", width: "550px" }}
                      src="https://images.pexels.com/photos/3036405/pexels-photo-3036405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      text="Third slide"
                    />
                  </div>
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <div>
                    <img
                      id="carouselImg"
                      // style={{ height: "600px", width: "550px" }}
                      src="https://as1.ftcdn.net/v2/jpg/02/78/30/78/1000_F_278307813_5os9Zy6mjt72lILNdH7zvEI6RDXuFfcB.jpg"
                      text="Third slide"
                    />
                  </div>
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
