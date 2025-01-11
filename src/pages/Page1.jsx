import React, { useState } from "react";
import Popup from "../components/Popup";
import "./Page1.css";

const Page1 = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleButtonClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
    <div className="page1-container">
      {/* 좌측 텍스트 */}
      <div className="sidebar">
        <h2>Welcome Yoon</h2>
        <ol>
          <li>넘순이</li>
          <li>넘김이</li>
        </ol>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="main-content">
        <p>악보를 추가하려면 하단 버튼을 클릭하세요.</p>
      </div>

        <div className="sheet-list">
          {/* 여기에 악보가 추가될 예정 */}
        </div>

      {/* 우측 하단 버튼 */}
      <button className="add-button" onClick={handleButtonClick}>
        +
      </button>

      {/* 팝업 */}
      {isPopupOpen && <Popup onClose={handleClosePopup} />}
    </div>
  );
};

export default Page1;