import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./Page2.css";

const Page2 = () => {
  const { lastViewedImages } = useContext(AppContext); // Context에서 데이터 가져오기
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스 관리
  const navigate = useNavigate();

  // "1. 넘순이" 클릭 시 Page1으로 이동
  const handleGoToPage1 = () => {
    navigate("/page1"); // Page1으로 이동
  };

  // 다음 이미지로 이동
  const handleNextImage = () => {
    if (lastViewedImages && currentIndex < lastViewedImages.length - 1) {
      const currentImage = document.querySelector(".center-image");
      currentImage.classList.add("image-hidden"); // 현재 이미지를 숨김
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1); // 다음 이미지로 이동
      }, 500); // CSS 애니메이션 시간과 일치
    }
  };
  
  const handlePrevImage = () => {
    if (lastViewedImages && currentIndex > 0) {
      const currentImage = document.querySelector(".center-image");
      currentImage.classList.add("image-hidden"); // 현재 이미지를 숨김
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1); // 이전 이미지로 이동
      }, 500); // CSS 애니메이션 시간과 일치
    }
  };  

  return (
    <div className="page2-container">
      {/* 좌측 사이드바 */}
      <div className="sidebar">
        <h2>넘순이</h2>
        <ol>
          <li onClick={handleGoToPage1} style={{ cursor: "pointer" }}>
            악보 저장소
          </li>
          <li style={{ cursor: "pointer" }}>넘순이</li>
          <li onClick={() => navigate("/page3")} style={{ cursor: "pointer" }}>
            넘김이
          </li>
        </ol>
      </div>

      {/* 이미지 표시 영역 */}
      <div className="image-display">
        {lastViewedImages && lastViewedImages.length > 0 ? ( // lastViewedImages가 유효한지 확인
          <div className="image-wrapper">
            {/* 이전 이미지 */}
            {currentIndex > 0 && (
              <img
                src={lastViewedImages[currentIndex - 1]}
                alt="이전 이미지"
                className="adjacent-image left"
                onClick={handlePrevImage}
              />
            )}
            {/* 현재 이미지 */}
            <img
              src={lastViewedImages[currentIndex]}
              alt="현재 이미지"
              className="center-image"
            />
            {/* 다음 이미지 */}
            {currentIndex < lastViewedImages.length - 1 && (
              <img
                src={lastViewedImages[currentIndex + 1]}
                alt="다음 이미지"
                className="adjacent-image right"
                onClick={handleNextImage}
              />
            )}
          </div>
        ) : (
          <p className="no-image-message">표시할 이미지가 없습니다.</p> // 메시지 스타일 클래스 유지
        )}
      </div>
    </div>
  );
};

export default Page2;
