import React, { useState } from "react";

import { Button, Row, Col, Card } from "react-bootstrap";

// Define the structure of a ConnectionRequest

interface ConnectionRequest {
  id: number;

  senderName: string;

  status: "pending" | "accepted"; // Status can be "pending" or “accepted”
}

const Connection: React.FC = () => {
  // Sample data for connection requests (you can replace this with real data)

  const [connectionRequests, setConnectionRequests] = useState<
    ConnectionRequest[]
  >([
    { id: 1, senderName: "Alice Johnson", status: "pending" },

    { id: 2, senderName: "Bob Smith", status: "accepted" },

    { id: 3, senderName: "Charlie Brown", status: "pending" },
  ]);

  // Handle accepting a connection request

  const handleAccept = (id: number) => {
    setConnectionRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: "accepted" } : request
      )
    );
  };

  // Handle rejecting a connection request

  const handleReject = (id: number) => {
    setConnectionRequests(
      (prevRequests) => prevRequests.filter((request) => request.id !== id) // Remove rejected request
    );
  };

  return (
    <div className="connection-container">
      <h3>Connection Requests</h3>

      {connectionRequests.map((request) => (
        <Row key={request.id} className="mb-3">
          <Col>
            <Card>
              <Card.Body>
                <Row className="d-flex align-items-center">
                  <Col md={8}>
                    <Card.Title>{request.senderName}</Card.Title>

                    <Card.Text>
                      {request.status === "pending"
                        ? "Pending connection request"
                        : "Connection accepted"}
                    </Card.Text>
                  </Col>

                  <Col md={4} className="text-right">
                    {request.status === "pending" ? (
                      <>
                        <Button
                          variant="success"
                          className="mr-2"
                          onClick={() => handleAccept(request.id)}
                        >
                          Accept
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() => handleReject(request.id)}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <span>Accepted</span> // No buttons for accepted connections
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default Connection;
