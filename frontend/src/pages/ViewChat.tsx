import React, { useState } from "react";

import { Card, Form, Button } from "react-bootstrap";

// Define the Message interface

interface Message {
  sender: string;

  content: string;
}

interface ViewChatProps {
  chatIndex: number; // The selected chat index

  handleBack: () => void; // Back function to go back to the message list
}

const ViewChat: React.FC<ViewChatProps> = ({ chatIndex, handleBack }) => {
  // Sample messages for each chat

  const chats = [
    {
      personaName: "Alice Johnson",

      messages: [
        { sender: "Alice Johnson", content: "Hey, how are you?" },

        { sender: "You", content: "I'm good, thanks for asking!" },
      ],
    },

    {
      personaName: "Bob Smith",

      messages: [
        {
          sender: "Bob Smith",
          content: "I reviewed the document. Let's discuss it next week.",
        },

        { sender: "You", content: "Okay, I will prepare the next version." },
      ],
    },

    {
      personaName: "Charlie Brown",

      messages: [
        {
          sender: "Charlie Brown",
          content: "Just finished the task, check it out when you have time.",
        },

        { sender: "You", content: "Great! I will review it shortly." },
      ],
    },
  ];

  // Retrieve messages for the selected chat

  const [messages, setMessages] = useState<Message[]>(
    chats[chatIndex].messages
  );

  const [newMessage, setNewMessage] = useState<string>("");

  // Handle sending a new message

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", content: newMessage }]);

      setNewMessage(""); // Clear the message input after sending
    }
  };

  return (
    <div>
      {/* Back button */}

      <Button variant="secondary" onClick={handleBack} className="mb-3">
        Back to Messages
      </Button>

      <Card className="my-3">
        <Card.Body>
          <Card.Title>Chat with {chats[chatIndex].personaName}</Card.Title>

          {/* Display messages */}

          <div
            style={{
              height: "300px",

              overflowY: "scroll",

              borderBottom: "1px solid #ccc",

              marginBottom: "15px",

              paddingRight: "10px",
            }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",

                  flexDirection:
                    message.sender === "You" ? "row-reverse" : "row",

                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    backgroundColor:
                      message.sender === "You" ? "#DCF8C6" : "#fff",

                    padding: "10px",

                    borderRadius: "10px",

                    maxWidth: "70%",

                    wordWrap: "break-word",
                  }}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input to send new message */}

          <Form>
            <Form.Control
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />

            <Button onClick={handleSendMessage} className="mt-2">
              Send
            </Button>
          </Form>

          <Button onClick={handleBack} className="mt-3">
            Back
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewChat;
