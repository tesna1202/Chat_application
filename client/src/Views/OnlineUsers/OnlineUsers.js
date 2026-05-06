import React from 'react';
import onlineIcon from '../../icons/onlineIcon.png';
import './OnlineUsers.css';

// Shows list of users currently in the same room
const OnlineUsers = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>Realtime Chat Application 💬</h1>
    </div>
    {users.length > 0 && (
      <div>
        <h1>People currently chatting:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ username }) => (
              <div key={username} className="activeItem">
                {username}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    )}
  </div>
);

export default OnlineUsers;