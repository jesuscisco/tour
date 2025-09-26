import React from 'react';

const InfoPanel = ({ roomInfo }) => {
  return (
    <div className="info-panel">
      <h2 className="room-title">{roomInfo.title}</h2>
      <p className="room-description">{roomInfo.description}</p>
      <ul className="room-features">
        {roomInfo.features.map((feature, index) => (
          <li key={index} className="feature-item">{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default InfoPanel;