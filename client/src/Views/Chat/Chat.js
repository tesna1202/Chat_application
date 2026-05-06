import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

import OnlineUsers from '../OnlineUsers/OnlineUsers';
import Messages from '../Messages/Messages';
import RoomInfo from '../RoomInfo/RoomInfo';
import Input from '../MessageInput/Input';

import './Chat.css';

const SERVER_URL = 'http://localhost:5000';

const Chat = () => {
  const socketRef = useRef(null);          // useRef keeps the instance without rerenders
  const location = useLocation();                   // Read username and room from URL query string
  const params = new URLSearchParams(location.search);
  const username = params.get('name');
  const room = params.get('room');

  const [messages, setMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);

  useEffect(() => {                                        // Connect to the socket server
    socketRef.current = io(SERVER_URL);
    const socket = socketRef.current;

    socket.emit('joinRoom', { username, room }, ({ error }) => {               // inform the server a user wants to join room
      if (error) alert(error);
    });

    socket.on('newMessage', (msg) =>
      setMessages((prev) => [...prev, { ...msg, type: 'message' }])            // Listen for new chat messages from server
    );
    socket.on('notification', (text) =>
      setMessages((prev) => [...prev, { text, type: 'notification' }])
    );
    socket.on('roomUsers', setRoomUsers);

    return () => socket.disconnect();
  }, [username, room]);

  const sendMessage = (text) => {
    socketRef.current?.emit('sendMessage', text, () => {});                // Sending message to the server
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <RoomInfo room={room} />
        <Messages messages={messages} username={username} />
        <Input sendMessage={sendMessage} />
      </div>
      <OnlineUsers users={roomUsers} />
    </div>
  );
};

export default Chat;