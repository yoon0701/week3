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
  const handleUploadImage = (file) => {
    const imageUrl = URL.createObjectURL(file); // 파일을 URL로 변환
    setUploadedImages((prev) => [...prev, imageUrl]); // 기존 이미지 배열에 추가
    handleClosePopup(); // 팝업 닫기
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

        <div className="sheet-list">
          {/* 업로드된 이미지 렌더링 */}
          {uploadedImages.map((image, index) => (
            <img key={index} src={image} alt={`악보 ${index + 1}`} className="sheet-image" />
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
