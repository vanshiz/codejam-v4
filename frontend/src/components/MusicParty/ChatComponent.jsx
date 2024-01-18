import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styles from './ChatComponent.module.css';
import moment from 'moment';

const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const ChatComponent = ({ username, room }) => {
  const [socket, setSocket] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socketInstance = io('http://localhost:3001');
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  function userJoin(id, username, room) {
    const uniqueId = generateUniqueId();
    const user = { id: uniqueId, username, room };
    setUsers((prevUsers) => [...prevUsers, user]);
    return user;
  }

  const getCurrentUser = (id) => {
    return users.find((user) => user.id === id) || { username: 'Unknown' };
  };

  const userLeave = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const getRoomUsers = (room) => {
    return users.filter((user) => user.room === room);
  };

  useEffect(() => {
    if (socket) {
      const user = userJoin(socket.id, username, room);

      socket.emit('joinRoom', { username: user.username, room: user.room });

      socket.on('message', (message) => {
        setChatMessages((prevMessages) => [
          ...prevMessages,
          { ...message, time: moment().format('h:mm A') },
        ]);
      });

      socket.on('roomUsers', ({ users }) => {
        setUsers(users);
      });
    }
  }, [socket, username, room]);

  const sendMessage = (e) => {
    e.preventDefault();

    const currentUser = getCurrentUser(socket.id);

    socket.emit('chatMessage', inputMessage);

    setChatMessages((prevMessages) => [
      ...prevMessages,
      {
        username: currentUser.username,
        text: inputMessage,
        time: moment().format('h:mm A'),
      },
    ]);

    setInputMessage('');
  };


  return (
    <>
      <div className={styles.chatcontainer}>
        <header className={styles.chatheader}>
          <h1 className={styles.heading}>Rhythm Realm</h1>
          <a id="leave-btn" className={styles.btnchat}>
            Leave Room
          </a>
        </header>
        <main className={styles.chatmain}>
          <div className={styles.chatsidebar}>
            <h3>
              <i className="fas fa-comments"></i> Room Name:
            </h3>
            <h2 id="room-name"></h2>
            <h3>
              <i className="fas fa-users"></i> Users
            </h3>
            <ul id="users">
              {users.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>
          <div className={styles.chatmessages}>
            {chatMessages.map((message, index) => (
              <div key={index} className={styles.message}>
                <span className={styles.username}>{message.username}:</span>
                <span className={styles.text}>{message.text}</span>
                <span className={styles.time}>{message.time}</span>
              </div>
            ))}
          </div>

          <div className={styles.chatsidebar}>
            Music Playing:
            <br />
            <br />
            <img
              src="./asset/am.jpg"
              height="100%"
              width="100%"
              alt="Album Cover"
            />
          </div>
        </main>
        <div className={styles.chatformcontainer}>
          <form id={styles.chatform} onSubmit={sendMessage}>
            <div className={styles.footerdiv}>
              <input
                className={styles.msgin}
                id="msg"
                type="text"
                placeholder="Enter Message"
                required
                autoComplete="off"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button className={styles.btnchatsend} type="submit">
                <i className="fas fa-paper-plane"></i> Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
