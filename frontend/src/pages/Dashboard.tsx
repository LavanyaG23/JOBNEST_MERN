import React, { useState, useEffect } from "react";

import { Container, Row, Col, Card, Tab, Nav, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

import PersonalityAssessment from "../components/PersonalityAssessment";

import JobPosts from "./JobPosts";

import Messages from "./Messages";

import ViewChat from "./ViewChat";

import CreateJob from "./CreateJob";

import SeekerProfilePage from "./SeekerProfilePage";

import RecruiterProfilePage from "./RecruiterProfilePage";
import Connection from "./Connection";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState<string>("");

  const [showPersonalityAssessment, setShowPersonalityAssessment] =
    useState<boolean>(false);

  const [cultureFit, setCultureFit] = useState<string[]>([]);

  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(
    null
  );

  const handleBack = () => {
    setSelectedChatIndex(null);
  };

  const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            localStorage.removeItem('token'); // Clear stored token
            navigate('/'); // Redirect to homepage/login
        } else {
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error during logout', error);
    }
};

  const handleCultureFitUpdate = (cultureFit: string[]) => {
    setCultureFit(cultureFit);
  };

  useEffect(() => {
    // Get the user role from localStorage

    const userRole = localStorage.getItem("userRole");

    if (userRole) {
      setRole(userRole);
    }
  }, []);

  const jobseekerTabs = [
    "Personality Assessment",

    "Profile",

    "Jobs",

    "Messages",

    "Connections",

    "Logout",
  ];

  const recruiterTabs = [
    "Your Profile",

    "Create Job",

    "Jobs",

    "Connections",

    "Messages",

    "Logout",
  ];

  const [activeTab, setActiveTab] = useState<string>("Personality Assessment");

  // Correct onSelect function to handle tab selection

  const handleTabSelect = (key: string | null) => {
    if (key) setActiveTab(key);
  };

  const redirectToPersonalityAssessment = () => {
    setShowPersonalityAssessment(true); // Show Personality Assessment on the same page

    setActiveTab("Personality Assessment"); // Update the active tab to Personality Assessment
  };

  return (
    <Container fluid className="dashboard-container">
      <Row>
        <Col xs={3} className="sidebar">
          <h4>Dashboard</h4>

          <Nav
            variant="pills"
            className="flex-column"
            activeKey={activeTab}
            onSelect={handleTabSelect}
          >
            {(role === "jobseeker" ? jobseekerTabs : recruiterTabs).map(
              (tab) => (
                <Nav.Item key={tab}>
                  <Nav.Link eventKey={tab}>{tab}</Nav.Link>
                </Nav.Item>
              )
            )}
          </Nav>
        </Col>

        <Col xs={9} className="right-panel">
          <Tab.Container
            id="left-tabs-example"
            activeKey={activeTab}
            onSelect={handleTabSelect} // Correctly handle tab selection here
          >
            <Tab.Content>
              {/* Profile Tab */}

              <Tab.Pane eventKey="Personality Assessment">
                <Card>
                  <Card.Body>
                    <Card.Title>Personality Assessment</Card.Title>

                    <Card.Text>
                      To start your job search, please complete the personality
                      assessment.
                    </Card.Text>

                    {role === "jobseeker" && !showPersonalityAssessment && (
                      <Button onClick={redirectToPersonalityAssessment}>
                        Take Personality Assessment
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="Profile">
                <Card>
                  <Card.Body>
                    <Card.Title></Card.Title>

                    <Card.Text>
                      <SeekerProfilePage />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              <Tab.Pane eventKey="Your Profile">
                <Card>
                  <Card.Body>
                    <Card.Title></Card.Title>

                    <Card.Text>
                      <RecruiterProfilePage />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Posts Tab */}

              <Tab.Pane eventKey="Jobs">
                <Card>
                  <Card.Body>
                    <Card.Title></Card.Title>

                    <Card.Text>
                      <JobPosts />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Create Job Tab (For Recruiters) */}

              <Tab.Pane eventKey="Create Job">
                <Card>
                  <Card.Body>
                    <Card.Title></Card.Title>

                    <Card.Text>
                      <CreateJob />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Messages Tab */}

              <Tab.Pane eventKey="Messages">
                <Card>
                  <Card.Body>
                    <Card.Title></Card.Title>

                    <Card.Text>
                      {/* <Messages setSelectedChatIndex = {setSelectedChatIndex}/>

                        {selectedChatIndex !== null && <ViewChat chatIndex={selectedChatIndex}/>}     */}

                      {selectedChatIndex === null ? (
                        <Messages setSelectedChatIndex={setSelectedChatIndex} />
                      ) : (
                        <ViewChat
                          chatIndex={selectedChatIndex}
                          handleBack={handleBack}
                        />
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Connections Tab */}

              <Tab.Pane eventKey="Connections">
                <Card>
                  <Card.Body>
                    <Card.Title>Connections</Card.Title>

                    <Card.Text>
                      <Connection />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Personality Assessment Section */}

              {showPersonalityAssessment && (
                <Tab.Pane eventKey="Personality Assessment">
                  <PersonalityAssessment />
                </Tab.Pane>
              )}

              {/* Logout Tab */}

              <Tab.Pane eventKey="Logout">
                <Card>
                  <Card.Body>
                    <Card.Title>Logout</Card.Title>

                    <Card.Text>You can logout from here.</Card.Text>
                    <button onClick={handleLogout} className="btn btn-danger">
                        Logout
                    </button>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
