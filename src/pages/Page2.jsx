import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Page2.css";

const Page2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUrl } = location.state || {}; // 전달받은 이미지 URL

  if (!imageUrl) {
    return (
      <div className="page2-container">
        <h2>이미지가 없습니다.</h2>
        <button onClick={() => navigate("/")}>돌아가기</button>
      </div>
    );
  }

  return (
    <div className="page2-container">
      {/* 좌측 사이드바 */}
      <div className="sidebar">
        <h2>Sidebar</h2>
      </div>

      {/* 클릭된 이미지 표시 */}
      <div className="image-container">
        <img src={imageUrl} alt="확대된 악보" className="full-image" />
        <button className="back-button" onClick={() => navigate("/")}>
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default Page2;
