import React, { useEffect } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import axios from "axios";

interface LoginPageProps {
  onSwitchToSign: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToSign }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;

    const password = formData.get("password") as string;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email,

          password,
        }
      );

      console.log("Login response:", response.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col xs={12} md={8} lg={12} className="mx-auto">
          <h2 className="text-center mb-4">Welcome Back</h2>

          <Form onSubmit={handleSubmit} className="border p-4 rounded shadow">
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Login
            </Button>
          </Form>

          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Button variant="link" onClick={onSwitchToSign} className="p-0">
              Signup here
            </Button>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
