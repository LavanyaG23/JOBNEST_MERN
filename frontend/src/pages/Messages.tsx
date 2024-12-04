import React, { useState } from "react";

import { Card, Button, Row, Col } from "react-bootstrap";

interface MessagesProps {
  setSelectedChatIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const chats = [
  {
    personaName: "Alice Johnson",

    lastMessage: "Hey, are you free for a quick chat tomorrow?",

    lastMessageTime: "2024-12-01T14:30:00Z",

    unreadMessages: 2, // Number of unread messages
  },

  {
    personaName: "Bob Smith",

    lastMessage: "I reviewed the document. Let's discuss it next week.",

    lastMessageTime: "2024-12-02T10:15:00Z",

    unreadMessages: 0,
  },

  {
    personaName: "Charlie Brown",

    lastMessage: "Just finished the task. Check it out when you have time.",

    lastMessageTime: "2024-12-03T16:45:00Z",

    unreadMessages: 1,
  },

  // Add more chat data as needed
];

const Messages: React.FC<MessagesProps> = ({ setSelectedChatIndex }) => {
  const handleChatSelect = (index: number) => {
    setSelectedChatIndex(index);
  };

  return (
    <div className="messages-container">
      <h3>Chats</h3>

      <Row>
        {chats.map((chat, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{chat.personaName}</Card.Title>

                <Card.Text>
                  <strong>Last Message:</strong> {chat.lastMessage}
                </Card.Text>

                <Card.Text>
                  <small>
                    <strong>Last Activity:</strong>{" "}
                    {new Date(chat.lastMessageTime).toLocaleString()}
                  </small>
                </Card.Text>

                {chat.unreadMessages > 0 && (
                  <div className="unread-messages">
                    <span className="badge bg-danger">
                      {chat.unreadMessages} Unread Messages
                    </span>
                  </div>
                )}

                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={() => handleChatSelect(index)}
                >
                  Open Chat
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Messages;
