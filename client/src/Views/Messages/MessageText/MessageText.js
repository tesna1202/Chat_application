import React from 'react';
import './MessageText.css';

const MessageText = ({ message, username }) => {
  if (message.type === 'notification') {
    return (
      <div className="messageContainer justifyCenter">
        <p className="sentText">{message.text}</p>
      </div>
    );
  }
// Check if the message is sent by the current user
  const isMine = message.sender === username;

  return (
    <div className={`messageContainer ${isMine ? 'justifyEnd' : 'justifyStart'}`}>
      {isMine ? (
        // Current users messages appear on the right 
        <>
          <p className="sentText pr-10">{username}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{message.text}</p>
          </div>
        </>
      ) : (
        // Other users messages appear on the left
        <>
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{message.text}</p>
          </div>
          <p className="sentText pl-10">{message.sender}</p>
        </>
      )}
    </div>
  );
};

export default MessageText;