import React, { useEffect, useState } from "react";

import { Button, Modal, Container, Row, Col } from "react-bootstrap";

import LoginPage from "../components/LoginPage";

import SignupPage from "../components/SignupPage";

import "./HomePage.css";

const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleOpenModal = (type: "login" | "signup") => {
    setModalType(type);

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    setModalType(null);
  };

  return (
    <div className="home-page">
      <Container fluid className="h-100">
        <Row className="h-100 align-items-center justify-content-center test-center">
          <Col xs={12} className="text-center">
            <div className="top-buttons d-flex justify-content-center mb-5">
              <Button
                variant="outline-primary"
                className="mx-2"
                onClick={() => handleOpenModal("login")}
              >
                Login
              </Button>

              <Button
                variant="outline-primary"
                onClick={() => handleOpenModal("signup")}
              >
                Signup
              </Button>
            </div>

            <div className="tagline-container ">
              <h1 className="tagline">
                Your Gateway to <span className="highlight">Connect</span>,
                Showcase, and Land Your Dream Job!
              </h1>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body>
          {modalType === "login" && (
            <LoginPage onSwitchToSign={() => handleOpenModal("signup")} />
          )}

          {modalType === "signup" && (
            <SignupPage onSwitchToLogin={() => handleOpenModal("login")} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HomePage;
