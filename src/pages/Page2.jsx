import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Page2.css";

const Page2 = () => {
  const location = useLocation();
  const images = location.state?.images || []; // 전달받은 이미지 리스트
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 표시되는 이미지의 인덱스

  const handleNextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="page2-container">
      {/* 좌측 사이드바 */}
      <div className="sidebar">
        <h2>선택된 악보들</h2>
      </div>

      {/* 이미지 표시 영역 */}
      <div className="image-display">
        {images.length > 0 && (
          <div className="image-wrapper">
            {/* 이전 이미지 */}
            {currentIndex > 0 && (
              <img
                src={images[currentIndex - 1]}
                alt="이전 이미지"
                className="adjacent-image left"
                onClick={handlePrevImage}
              />
            )}
            {/* 현재 이미지 */}
            <img
              src={images[currentIndex]}
              alt="현재 이미지"
              className="center-image"
            />
            {/* 다음 이미지 */}
            {currentIndex < images.length - 1 && (
              <img
                src={images[currentIndex + 1]}
                alt="다음 이미지"
                className="adjacent-image right"
                onClick={handleNextImage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page2;
