import React, { useState, useContext } from "react";
import Popup from "../components/Popup";
import { AppContext } from "../context/AppContext";
import "./Page1.css";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icons/icon.png";

const Page1 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup 상태
  const { allImages, setAllImages, imageGroups, setImageGroups, setLastViewedImages } = useContext(AppContext); // Context 사용
  const [sidebarActive, setSidebarActive] = useState(false); // 사이드바 상태 관리
  const navigate = useNavigate();

  // 팝업 열기
  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  // 팝업 닫기
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // 이미지 업로드 핸들러
  const handleUploadImage = (files) => {
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file)); // 파일을 URL로 변환

    if (newImages.length > 0) {
      setAllImages((prev) => [...prev, newImages[0]]); // 첫 번째 이미지를 대표 이미지로 추가
      setImageGroups((prev) => [...prev, newImages]); // 업로드된 전체 이미지 그룹 저장
    }
    handleClosePopup(); // 팝업 닫기
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = (index) => {
    setAllImages((prev) => prev.filter((_, i) => i !== index)); // 선택된 대표 이미지 삭제
    setImageGroups((prev) => prev.filter((_, i) => i !== index)); // 해당 이미지 그룹 삭제
  };

  // 이미지 보기 핸들러
  const handleViewImages = (index) => {
    setLastViewedImages(imageGroups[index]);
    navigate("/page2", { state: { images: imageGroups[index] } }); // 해당 그룹의 이미지만 Page2로 전달
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
      <div className="page1-container">
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

      {/* 메인 컨텐츠 */}
      <div className="main-content">
        {allImages.length === 0 ? (
          <p className="placeholder-text">악보를 추가하려면 하단 버튼을 클릭하세요.</p>
        ) : (
          <div className="sheet-list">
            {/* 업로드된 대표 이미지 리스트 */}
            {allImages.map((image, index) => (
              <div key={index} className="sheet-item">
                <img
                  src={image}
                  alt={`대표 이미지 ${index + 1}`}
                  className="sheet-image"
                />
                <div className="button-container">
                  <button
                    className="view-button"
                    onClick={() => handleViewImages(index)} // 해당 그룹 보기
                  >
                    보기
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteImage(index)} // 해당 그룹 삭제
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 우측 하단 버튼 */}
      <button className="add-button" onClick={handleButtonClick}>
        +
      </button>

      {/* 팝업 */}
      {isPopupOpen && (
        <Popup
          onClose={handleClosePopup}
          onUpload={(files) => handleUploadImage(files)} // 파일 업로드 핸들러 전달
        />
      )}
    </div>
  );
};

export default Page1;