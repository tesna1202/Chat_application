import React from 'react';
import MessageText from './MessageText/MessageText';
import './Messages.css';

// Renders the full list of messages
const Messages = ({ messages, username }) => (
  <div className="messages">
    {messages.map((msg, i) => (
      <MessageText key={i} message={msg} username={username} />
    ))}
  </div>
);

export default Messages;