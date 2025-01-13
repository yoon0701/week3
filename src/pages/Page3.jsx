import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Page3.css";

const Page3 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태
  const navigate = useNavigate();

  // 팝업 열기
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  // 팝업 닫기
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="page3-container">
      {/* 좌측 사이드바 */}
      <div className="sidebar">
        <h2>악보만들어줘</h2>
        <ol>
          <li onClick={() => navigate("/page1")} style={{ cursor: "pointer" }}>
            넘순이
          </li>
          <li onClick={() => navigate("/page2")} style={{ cursor: "pointer" }}>
            넘김이
          </li>
          <li style={{ cursor: "pointer", fontWeight: "bold" }}>악복이</li>
        </ol>
      </div>

      {/* 메인 영역 */}
      <div className="main-content">
        <button className="popup-button" onClick={handleOpenPopup}>
          +
        </button>
      </div>

      {/* 팝업 */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={handleClosePopup}>
              X
            </button>
            <p>악보명: 입력하세요</p>
            {/* 추가 입력 필드 및 동작 구현 가능 */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page3;
