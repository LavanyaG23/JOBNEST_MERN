import React from "react";

import { Card, Button, Row, Col } from "react-bootstrap";

// Sample post data structure (this can be fetched from an API or passed down as props)

const posts = [
  {
    companyName: "Tech Innovators Inc.",

    companyDescription:
      "A leading tech company focused on innovation and growth.",

    jobTitle: "Software Developer",

    jobDescription: "Develop and maintain software solutions for clients.",

    skillsRequired: "JavaScript, React, Node.js",

    jobType: "Full-time",

    companyCulture: "Collaborative, innovative, and inclusive.",

    salaryRange: "$70,000 - $90,000",

    createdAt: "2024-12-01T10:00:00Z",

    createdBy: "John Doe",
  },

  {
    companyName: "Creative Solutions Ltd.",

    companyDescription:
      "A creative agency specializing in marketing and branding.",

    jobTitle: "UI/UX Designer",

    jobDescription:
      "Design and create user-friendly interfaces and experiences.",

    skillsRequired: "Adobe XD, Figma, HTML/CSS",

    jobType: "Part-time",

    companyCulture: "Creative, open-minded, and result-driven.",

    salaryRange: "$50,000 - $65,000",

    createdAt: "2024-12-02T11:30:00Z",

    createdBy: "Jane Smith",
  },

  // Add more posts as needed
];

const Posts = () => {
  return (
    <div className="posts-container">
      <h3>Job Posts</h3>

      <Row>
        {posts.map((post, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{post.jobTitle}</Card.Title>

                <Card.Subtitle className="mb-2 text-muted">
                  {post.companyName}
                </Card.Subtitle>

                <Card.Text>
                  <strong>Company Description:</strong>{" "}
                  {post.companyDescription}
                </Card.Text>

                <Card.Text>
                  <strong>Job Description:</strong> {post.jobDescription}
                </Card.Text>

                <Card.Text>
                  <strong>Skills Required:</strong> {post.skillsRequired}
                </Card.Text>

                <Card.Text>
                  <strong>Job Type:</strong> {post.jobType}
                </Card.Text>

                <Card.Text>
                  <strong>Company Culture:</strong> {post.companyCulture}
                </Card.Text>

                <Card.Text>
                  <strong>Salary Range:</strong> {post.salaryRange}
                </Card.Text>

                <Card.Text>
                  <small>
                    <strong>Created At:</strong>{" "}
                    {new Date(post.createdAt).toLocaleString()}
                  </small>

                  <br />

                  <small>
                    <strong>Created By:</strong> {post.createdBy}
                  </small>
                </Card.Text>

                <Button variant="primary">Apply Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Posts;
