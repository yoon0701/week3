import React, { useState, useContext } from "react";
import Popup from "../components/Popup";
import { AppContext } from "../context/AppContext";
import "./Page1.css";
import { useNavigate } from "react-router-dom";

const Page1 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup 상태
  const { allImages, setAllImages, imageGroups, setImageGroups, setLastViewedImages } = useContext(AppContext); // Context 사용
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

  return (
    <div className="page1-container">
      {/* 좌측 사이드바 */}
      <div className="sidebar">
        <h2>Welcome Yoon</h2>
        <ol>
          <li onClick={() => navigate("/page1")} style={{ cursor: "pointer" }}>
            넘순이
          </li>
          <li onClick={() => navigate("/page2")} style={{ cursor: "pointer" }}>
            넘김이
          </li>
          <li onClick={() => navigate("/page3")} style={{ cursor: "pointer" }}>
            악복이
          </li>
        </ol>
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