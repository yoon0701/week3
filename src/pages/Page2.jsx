import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./Page2.css";
import icon from "../assets/icons/icon.png";


const Page2 = () => {
  const { lastViewedImages } = useContext(AppContext); // Context에서 데이터 가져오기
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 인덱스 관리
  const [sidebarActive, setSidebarActive] = useState(false); // 사이드바 상태 관리
  const navigate = useNavigate();

  // 다음 이미지로 이동
  const handleNextImage = () => {
    if (lastViewedImages && currentIndex < lastViewedImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 이전 이미지로 이동
  const handlePrevImage = () => {
    if (lastViewedImages && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

   // 사이드바 활성화
   const showSidebar = () => {
    setSidebarActive(true);
  };

  // 사이드바 비활성화
  const hideSidebar = () => {
    setSidebarActive(false);
  };

  return (
    <div className="page2-container">
  {/* 트리거 및 사이드바를 하나의 영역으로 포함 */}
  <div
    className="sidebar-wrapper"
    onMouseEnter={showSidebar} // 마우스가 트리거 또는 사이드바 영역에 들어가면 활성화
    onMouseLeave={hideSidebar} // 마우스가 전체 영역을 떠나면 비활성화
  >
    {/* 트리거 영역 */}
    <div className="sidebar-trigger"></div>

    {/* 사이드바 */}
    <div className={`sidebar ${sidebarActive ? "active" : ""}`}>
      <img src={icon} alt="Icon" className="sidebar-icon" />

      <div className="large-key" onClick={() => navigate("/page1")}>
        악보 저장소
      </div>
      <div className="large-key" onClick={() => navigate("/page2")}>
        넘순이
        <div className="small-key"></div>
      </div>
      <div className="large-key" onClick={() => navigate("/page3")}>
        넘김이
        <div className="small-key"></div>
      </div>
      <div className="large-key"></div>
      <div className="large-key">
        <div className="small-key"></div>
      </div>
      <div className="large-key">
        <div className="small-key"></div>
      </div>
    </div>
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
