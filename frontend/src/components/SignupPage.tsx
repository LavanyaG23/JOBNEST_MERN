import React, { useState } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import axios from "axios";

import { useNavigate } from "react-router-dom";

interface SignupPageProps {
  onSwitchToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSwitchToLogin }) => {
  const [role, setRole] = useState<string>("jobseeker");

  const navigate = useNavigate();

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

  //  e.preventDefault();

  //  const formData = new FormData(e.currentTarget);

  //  const email = formData.get("email") as string;

  //  const password = formData.get("password") as string;

  //  if (!role) {

  //    alert("Please select a role (Jobseeker or Recruiter).");

  //    return;

  //  }

  //  try {

  //    const response = await axios.post("http://localhost:5000/api/v1/auth/signup", {

  //      email,

  //      password,

  //      role,

  //    });

  //    if(response.data.success){

  //     navigate("/jobpost", {state: {role}});

  //    }

  //    else{

  //     alert("Signup failed! Please try again")

  //    }

  //    console.log("Signup response:", response.data);

  //  } catch (error) {

  //    console.error("Error signing up:", error);

  //  }

  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem("userRole", role);

    navigate("/dashboard", { state: { role } });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col xs={12} md={8} lg={12} className="mx-auto">
          <h2 className="text-center mb-4">Let's get started!</h2>

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

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>

              <div>
                <Form.Check
                  type="radio"
                  id="jobseeker"
                  name="role"
                  label="Jobseeker"
                  value="jobseeker"
                  onChange={(e) => setRole(e.target.value)}
                  inline
                />

                <Form.Check
                  type="radio"
                  id="recruiter"
                  name="role"
                  label="Recruiter"
                  value="recruiter"
                  onChange={(e) => setRole(e.target.value)}
                  inline
                />
              </div>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Signup
            </Button>
          </Form>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Button variant="link" onClick={onSwitchToLogin} className="p-0">
              Login here
            </Button>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
