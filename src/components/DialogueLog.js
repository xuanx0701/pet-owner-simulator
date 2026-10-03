// src/components/DialogueLog.js
import React from "react";
import "./logStyle/dialogueLog.css";

const DialogueLog = ({ logData, onClose }) => {
  return (
    <div className="log-overlay">
      <div className="log-container">
        <button className="close-button" onClick={onClose}>
          關閉
        </button>
        <div className="log-content">
          {logData.map((entry, index) => (
            <div key={index} className="log-entry">
              <span className="log-speaker">【{entry.speaker}】</span>{" "}
              {entry.text.slice(1) || entry.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DialogueLog;
