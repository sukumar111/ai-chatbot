import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './AssetsChatbot.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (text) => {
    const messageToSend = text || input.trim();
    if (messageToSend) {
      const newMessages = [...messages, { text: messageToSend, sender: "user" }];
      setMessages(newMessages);
      setInput("");

      try {
        const response = await axios.post("http://localhost:8080/api/chatbot/send", {
          prompt: messageToSend,
        }, { withCredentials: true });

        const botResponse = response.data.candidates
          ? response.data.candidates[0].content.parts[0].text
          : "No response";
        
        setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const renderMessage = (message) => {
    const isCodeBlock = message.text.startsWith("```") && message.text.endsWith("```");
    const paragraphs = message.text.split("\n");

    return (
      <div className={`mb-3 p-3 rounded ${message.sender === "user" ? "userMessage" : "botMessage"}`}>
        {isCodeBlock ? (
          <pre className="m-0 codeBlock">
            {paragraphs.join("\n").replace(/```/g, "")}
          </pre>
        ) : (
          paragraphs.map((para, index) => (
            <span key={index}>
              {parseMessage(para)}
              {index < paragraphs.length - 1 && <br />}
            </span>
          ))
        )}
      </div>
    );
  };

  const parseMessage = (text) => {
    return text.split("##").flatMap((part, i) => 
      part.split("**").map((subPart, j) => 
        j % 2 === 1 ? <strong key={`${i}-${j}`}>{subPart}</strong> : subPart
      )
    );
  };

  const handlePredefinedMessage = (message) => {
    sendMessage(message);
  };

  return (
    <div className="root">
      <div className="AssetsChatbot">
        <div className="sideBar">
          <div className="upperSide"> 
            <div className="upperSideTop">
              <img src={gptLogo} alt="Logo" className="logo"/>
              <span className="brand">ChatGPT</span> 
            </div>
            <button className="midBtn" onClick={() => window.location.reload()}>
              <img src={addBtn} alt="new chat" className="addBtn" />New Chat
            </button>
            <div className="upperSidebottom">
              <button className="query" onClick={() => handlePredefinedMessage("History of SRM University?")}><img src={msgIcon} alt="Query" /> History of SRM University?</button>
              <button className="query" onClick={() => handlePredefinedMessage("Who is Dr.A.P.J.Abdul Kalam ?")}><img src={msgIcon} alt="Query" /> Who is Dr.A.P.J.Abdul Kalam ?</button>
              
            </div>
          </div>
          <div className="lowerSide">
            <div className="listItems"><img src={home} alt="Home" className="listItemsImg" /> Home </div>
            <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg" /> Saved </div>
            <div className="listItems"><img src={rocket} alt="Upgrade" className="listItemsImg" /> Upgrade to pro </div>
          </div>
        </div>
        
        <div className="main">
          <div className="chats">
            {messages.map((message, index) => (
              <div key={index} className={`chat ${message.sender === "bot" ? "bot" : ""}`}>
                <img className='chatImage' src={message.sender === "user" ? userIcon : gptImgLogo} alt='' />
                {renderMessage(message)}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatFooter">
            <div className="inp">
              <input
                type="text"
                placeholder="Send a message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="Send" onClick={() => sendMessage()}>
                <img src={sendBtn} alt="Send" />
              </button>
            </div>
            <p>ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT August 20 Version.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
