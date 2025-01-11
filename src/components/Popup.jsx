import React, { useState } from "react";
import "./Popup.css";

const Popup = ({ onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // 파일을 상태로 저장
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile); // 부모 컴포넌트로 파일 전달
    } else {
      alert("파일을 선택하세요!");
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>사진 업로드</h2>
        {/* 파일 업로드 입력 */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange} // 파일 선택 시 호출
        />
        {selectedFile && <p>선택된 파일: {selectedFile.name}</p>}

        {/* 버튼 */}
        <div className="popup-buttons">
          <button onClick={handleUpload}>업로드</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
