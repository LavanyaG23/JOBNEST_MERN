import React, { useState } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import Select from "react-select";

interface ProfileData {
  username: string;

  email: string;

  password: string;

  skills: { value: string; label: string }[];

  experience: string;

  jobPreferences: { value: string; label: string }[];

  resume: File | null;

  coverLetter: File | null;

  socialLinks: string;
}

const skillOptions = [
  { value: "JavaScript", label: "JavaScript" },

  { value: "React", label: "React" },

  { value: "Node.js", label: "Node.js" },

  { value: "Python", label: "Python" },

  { value: "Java", label: "Java" },

  { value: "C++", label: "C++" },

  { value: "SQL", label: "SQL" },

  { value: "HTML", label: "HTML" },

  { value: "CSS", label: "CSS" },
];

const jobPreferenceOptions = [
  { value: "Software Developer", label: "Software Developer" },

  { value: "Frontend Developer", label: "Frontend Developer" },

  { value: "Backend Developer", label: "Backend Developer" },

  { value: "UI/UX", label: "UI/UX" },

  { value: "Sales", label: "Sales" },

  { value: "Marketing", label: "Marketing" },

  { value: "Testing", label: "Testing" },

  { value: "Accounting", label: "Accounting" },

  { value: "Project Manager", label: "Project Manager" },

  { value: "Product Manager", label: "Product Manager" },
];

const SeekerProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    username: "",

    email: "",

    password: "",

    skills: [],

    experience: "",

    jobPreferences: [],

    resume: null,

    coverLetter: null,

    socialLinks: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;

    if (files && files.length > 0) {
      setProfile((prevProfile) => ({ ...prevProfile, [name]: files[0] }));
    }
  };

  const handleSkillsChange = (selectedOptions: any) => {
    setProfile((prevProfile) => ({ ...prevProfile, skills: selectedOptions }));
  };

  const handleJobPreferencesChange = (selectedOptions: any) => {
    setProfile((prevProfile) => ({
      ...prevProfile,

      jobPreferences: selectedOptions,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(profile);
  };

  return (
    <Container>
      <h2>Profile</h2>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>

              <Form.Control
                type="text"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                name="password"
                value={profile.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Experience</Form.Label>

              <Form.Control
                type="text"
                name="experience"
                value={profile.experience}
                onChange={handleInputChange}
                placeholder="Enter your experience"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Skills</Form.Label>

              <Select
                isMulti
                options={skillOptions}
                value={profile.skills}
                onChange={handleSkillsChange}
                placeholder="Select your skills"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Job Preferences</Form.Label>

              <Select
                isMulti
                options={jobPreferenceOptions}
                value={profile.jobPreferences}
                onChange={handleJobPreferencesChange}
                placeholder="Select your job preferences"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Resume</Form.Label>

              <Form.Control
                type="file"
                name="resume"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cover Letter</Form.Label>

              <Form.Control
                type="file"
                name="coverLetter"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Social Media Links</Form.Label>

          <Form.Control
            type="text"
            name="socialLinks"
            value={profile.socialLinks}
            onChange={handleInputChange}
            placeholder="Enter your social media links"
          />
        </Form.Group>

        <Button type="submit">Save Profile</Button>
      </Form>
    </Container>
  );
};

export default SeekerProfilePage;
