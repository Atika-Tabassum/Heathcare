import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../general/Header";
import "../homeComponent/homepage.css";
import "./chats.css";
import img from "./sendbutton.svg";
import img2 from "../general/user.svg";

const Chats = () => {
  const { userId, receiver } = useParams();
  const [chats, setChats] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef(null);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/${userId}/${receiver}/chats`
        );
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setChats(data.data);
        } else {
          console.error("Expected an array but received:", data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getChats();
  }, [userId, receiver]);

  useEffect(() => {
    socket.current = io("http://localhost:3001");
    socket.current.emit("joinChat", userId);

    socket.current.on("newMessage", (message) => {
      setChats((prevChats) => [...prevChats, message]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [userId]);

  const sendMessage = (e) => {
    e.preventDefault();
    const message = {
      sender_id: userId,
      receiver_id: receiver,
      message: newMessage,
      sent_at: new Date().toISOString(),
    };
    socket.current.emit("sendMessage", message);
    setNewMessage("");
    navigate(`/${userId}/${receiver}/chats`);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div>
      <Header />
      <div className="page-container">
        <div className="main-box">
          <div className="username_section">
            {chats.length > 0 && <h3>{chats[0].chat_name}</h3>}
          </div>
          <ul>
            {chats.map((chat) => (
              <li
                key={chat.message_id}
                className={
                  chat.sender_id == userId
                    ? "chat current-user"
                    : "chat other-user"
                }
              >
                {chat.sender_id != userId && (
                  <div className="profile_img">
                    <img src={img2} alt="account" className="account-icon" />
                  </div>
                )}
                <div className="chat-message">
                  {chat.message}
                  <span className="chat-time">
                    {new Date(chat.sent_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="send_messages">
            <div className="chat_form">
              <form onSubmit={sendMessage}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <div className="submit-button">
                  <button type="submit">
                    <img src={img} alt="send" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
