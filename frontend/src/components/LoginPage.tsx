import React, { useState } from "react";

import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import axios from "axios";

import { useNavigate } from "react-router-dom";


 

interface LoginPageProps {

 onSwitchToSign: () => void;

}


 

const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToSign }) => {

 const [email, setEmail] = useState<string>("");

 const [password, setPassword] = useState<string>("");

 const [error, setError] = useState<string | null>(null);


 

 const navigate = useNavigate();


 

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

   e.preventDefault();

   try {

     const response = await axios.post("http://localhost:5000/api/v1/auth/login", {

       email,

       password,

     });


 

     if (response.status === 200) {

       const { token, role } = response.data;

       localStorage.setItem("authToken", token); // Store JWT token

       setError(null);


 

       if (role === "recruiter") {

         navigate("/dashboard");

       } else {

         navigate("/dashboard");

       }

     }

   } catch (err: any) {

     setError(err.response?.data?.error || "Invalid credentials");

   }

 };


 

 return (

   <Container className="d-flex justify-content-center align-items-center vh-100">

     <Row className="w-100">

       <Col xs={12} md={8} lg={12} className="mx-auto">

         <h2 className="text-center mb-4">Welcome Back!</h2>

         <Form onSubmit={handleSubmit} className="border p-4 rounded shadow">

           {error && <Alert variant="danger">{error}</Alert>}

           <Form.Group className="mb-3" controlId="email">

             <Form.Label>Email</Form.Label>

             <Form.Control

               type="email"

               value={email}

               onChange={(e) => setEmail(e.target.value)}

               placeholder="Enter email"

               required

             />

           </Form.Group>

           <Form.Group className="mb-3" controlId="password">

             <Form.Label>Password</Form.Label>

             <Form.Control

               type="password"

               value={password}

               onChange={(e) => setPassword(e.target.value)}

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

