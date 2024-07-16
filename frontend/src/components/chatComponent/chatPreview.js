import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../general/Header";
import "../homeComponent/homepage.css";

const ChatPreview = ({ chat }) => {
  const userId = useParams().userId;
  const [chats, setChats] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/${userId}/chats`
        );
        const data = await response.json();
        if (Array.isArray(data.data)) {
          const uniqueChats = filterUniqueChats(data.data);
          setChats(uniqueChats);
        } else {
          console.error("Expected an array but received:", data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getChats();
  }, [userId]);

  useEffect(() => {
    const getOtherUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/users/${userId}/otherUsers`
        );
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setOtherUsers(data.data);
        } else {
          console.error("Expected an array but received:", data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getOtherUsers();
  }, [userId]);

  const filterUniqueChats = (chats) => {
    const uniqueChats = [];
    const map = new Map();
    for (const chat of chats) {
      if (!map.has(chat.chat_name)) {
        map.set(chat.chat_name, true);
        uniqueChats.push(chat);
      }
    }
    return uniqueChats;
  };

  return (
    <Fragment>
      <Header />
      <div>
        <div className="page-container">
          <h3 align="center">
            <i>Unread Messages</i>
          </h3>
          <table>
            <thead>
              <tr>
                <th>Sender</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {chats.map((chat) => (
                <tr
                  key={chat.chat_name}
                  onClick={() => navigate(`/${userId}/${chat.user1}/chats`)}
                >
                  <td>{chat.chat_name}</td>
                  <td>{new Date(chat.sent_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 align="center">
            <i>Start a new chat</i>
          </h3>
          <div className="new-chat">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {otherUsers.map((user) => (
                  <tr
                    key={user.user_id}
                    onClick={() => navigate(`/${userId}/${user.user_id}/chats`)}
                    style={{ textAlign: "left" }}
                  >
                    <td textAlign="Left">{user.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatPreview;
