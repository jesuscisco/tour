import React from 'react';

interface RoomInfo {
  title: string;
  description: string;
  features: string[];
}

interface InfoPanelProps {
  roomInfo: RoomInfo;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ roomInfo }) => {
  return (
    <div className="info-panel">
      <h2 className="room-title">{roomInfo.title}</h2>
      <p className="room-description">{roomInfo.description}</p>
      <ul className="room-features">
        {roomInfo.features.map((feature, index) => (
          <li key={index} className="feature-item">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoPanel;
