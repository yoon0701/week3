import React from "react";
import "./Popup.css";

const Popup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>악보 추가</h2>
        <input type="text" placeholder="악보명 입력" />
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Popup;
