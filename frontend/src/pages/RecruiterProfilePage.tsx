import React, { useState } from "react";

import { Button, Form, Col, Row, Image } from "react-bootstrap";

const RecruiterProfile: React.FC = () => {
  // States for storing the profile information

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [companyLogo, setCompanyLogo] = useState<File | null>(null);

  const [companyName, setCompanyName] = useState("");

  const [companyDescription, setCompanyDescription] = useState("");

  // Handle form submission

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("username", username);

    formData.append("email", email);

    formData.append("password", password);

    formData.append("companyName", companyName);

    formData.append("companyDescription", companyDescription);

    if (companyLogo) {
      formData.append("companyLogo", companyLogo);
    }

    // Handle the form submission logic here, e.g., API call to update profile

    console.log("Form data submitted:", formData);
  };

  // Handle file input change for company logo

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCompanyLogo(e.target.files[0]);
    }
  };

  return (
    <div className="recruiter-profile-container">
      <h3>Recruiter Profile</h3>

      <Form onSubmit={handleSubmit}>
        {/* Username */}

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        {/* Email */}

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>

          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        {/* Password */}

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* Company Logo */}

        <Form.Group controlId="companyLogo">
          <Form.Label>Company Logo</Form.Label>

          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
          />

          {companyLogo && (
            <div className="mt-2">
              <h6>Preview:</h6>

              <Image
                src={URL.createObjectURL(companyLogo)}
                alt="Company Logo"
                rounded
                width={100}
              />
            </div>
          )}
        </Form.Group>

        {/* Company Name */}

        <Form.Group controlId="companyName">
          <Form.Label>Company Name</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </Form.Group>

        {/* Company Description */}

        <Form.Group controlId="companyDescription">
          <Form.Label>Company Description</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter company description"
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            required
          />
        </Form.Group>

        {/* Submit Button */}

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default RecruiterProfile;
