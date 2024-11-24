import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("Guest");
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openNewChatDialog, setOpenNewChatDialog] = useState(false); // State for new chat dialog
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail");
    if (userEmail) {
      const fetchUserName = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/chatbot/name`, {
            params: { email: userEmail },
            withCredentials: true,
          });
          setUserName(response.data);
        } catch (error) {
          console.error("Error fetching user name:", error);
          setUserName("Guest");
        }
      };
      fetchUserName();
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatResponse = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/##(.*?)##/g, "<span style='text-transform: uppercase;'>$1</span>")
      .replace(/(?:\r\n|\r|\n)/g, "<br>");
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");

      try {
        const response = await axios.post("http://localhost:8080/api/chatbot/send", {
          prompt: input,
        }, { withCredentials: true });

        const botResponse = response.data.candidates
          ? response.data.candidates[0].content.parts[0].text
          : "No response";

        const formattedResponse = formatResponse(botResponse);

        setMessages([...newMessages, { text: formattedResponse, sender: "bot" }]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const newChat = () => {
    setMessages([]);
    setInput("");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/signin');
  };

  const handleLogoutDialogOpen = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutDialogClose = (confirm) => {
    setOpenLogoutDialog(false);
    if (confirm) {
      handleLogout();
    }
  };

  const handleNewChatDialogOpen = () => {
    setOpenNewChatDialog(true);
  };

  const handleNewChatDialogClose = (confirm) => {
    setOpenNewChatDialog(false);
    if (confirm) {
      newChat();
    }
  };

  return (
    <Box className="container-fluid vh-100 d-flex" sx={{ backgroundColor: '#f0f0f0', color: '#333' }}>
      {/* Sidebar */}
      <div className="bg-primary text-white p-3" style={{ width: "250px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h5>Welcome, {userName}</h5>
          <Button variant="contained" color="error" className="mt-3" onClick={handleLogoutDialogOpen}>Logout</Button>
          <Button variant="contained" color="secondary" className="mt-3" onClick={handleNewChatDialogOpen}>New Chat</Button>
        </div>
        <div className="mt-4">
          <h5>Explore the Future of AI-Chatbots</h5>
          <p>Dive into the evolution of AI with Google Bard vs ChatGPT!</p>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => window.open("https://medium.com/@sukumarm111/the-rise-of-ai-chatbot-key-features-and-benefits-160a1432e62d", "_blank")}
          >
            Feature
          </Button>
        </div>
      </div>

      {/* Main Chat Section */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="card shadow-lg">
              <div className="card-body">
                <h4 className="card-title text-center mb-4">AI Chatbot</h4>
                <div className="border p-3 mb-3" style={{ height: "400px", overflowY: "scroll", backgroundColor: "#ffffff" }}>
                  {messages.map((message, index) => (
                    <div key={index}>
                      <div
                        className={`mb-3 p-2 rounded ${message.sender === "user" ? "text-end bg-light" : "text-start bg-success text-white"}`}
                        dangerouslySetInnerHTML={{ __html: message.text }}
                      ></div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button variant="contained" color="primary" onClick={sendMessage}>Send</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={() => handleLogoutDialogClose(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to logout?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleLogoutDialogClose(false)} color="primary">Cancel</Button>
          <Button onClick={() => handleLogoutDialogClose(true)} color="error">Logout</Button>
        </DialogActions>
      </Dialog>

      {/* New Chat Confirmation Dialog */}
      <Dialog open={openNewChatDialog} onClose={() => handleNewChatDialogClose(false)}>
        <DialogTitle>Confirm New Chat</DialogTitle>
        <DialogContent>
          <DialogContentText>This will clear all existing chats. Are you sure you want to start a new chat?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleNewChatDialogClose(false)} color="primary">Cancel</Button>
          <Button onClick={() => handleNewChatDialogClose(true)} color="secondary">New Chat</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Chatbot;
