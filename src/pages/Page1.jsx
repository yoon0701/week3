import React, { useState } from "react";
import Popup from "../components/Popup";
import "./Page1.css";

const Page1 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup 상태
  const [uploadedImages, setUploadedImages] = useState([]); // 업로드된 이미지 리스트

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
    const newImages = Array.from(files).map((file) =>
    URL.createObjectURL(file)
    ); // Process file array to generate URLs for all files
  
    // Select only the first image from the uploaded files
    const firstImage = newImages[0];
    if (firstImage) {
      setUploadedImages((prev) => [...prev, firstImage]); // Add only the first image to the existing array
    }
    handleClosePopup(); // Close the popup
  };
  

  // 이미지 삭제 핸들러
  const handleDeleteImage = (imageUrl) => {
    setUploadedImages((prev) => prev.filter((image) => image !== imageUrl)); // 선택된 이미지 제거
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
        {/* 이미지가 없을 때만 중앙 문구 표시 */}
        {uploadedImages.length === 0 && (
          <p className="placeholder-text">악보를 추가하려면 하단 버튼을 클릭하세요.</p>
        )}

        <div className="sheet-list">
          {/* 업로드된 이미지 렌더링 */}
          {uploadedImages.map((image, index) => (
            <div key={index} className="sheet-item">
              <img src={image} alt={`악보 ${index + 1}`} className="sheet-image" />
              <button
                className="delete-button"
                onClick={() => handleDeleteImage(image)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 우측 하단 버튼 */}
      <button className="add-button" onClick={handleButtonClick}>
        +
      </button>

      {/* 팝업 */}
      {isPopupOpen && (
        <Popup
          onClose={handleClosePopup}
          onUpload={(file) => handleUploadImage(file)} // 파일 업로드 핸들러 전달
        />
      )}
    </div>
  );
};

export default Page1;
