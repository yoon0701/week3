import React from "react";
import "./Page1.css"; // 스타일 파일 추가

const Page1 = () => {
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

      {/* 중앙 악보 리스트 */}
      <div className="main-content">
        <div className="sheet-list">
          {/* 여기에 악보가 추가될 예정 */}
        </div>
      </div>

      {/* 우측 하단 추가 버튼 */}
      <button className="add-button">+</button>
    </div>
  );
};

export default Page1;
