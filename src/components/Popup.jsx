import React, { useState } from "react";
import "./Popup.css";

const Popup = ({ onClose, onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]); // 파일 상태 초기화

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // FileList를 배열로 변환
    setSelectedFiles(files); // 상태에 파일 배열 저장
  };

  // 업로드 버튼 클릭 핸들러
  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles); // 부모 컴포넌트로 파일 배열 전달
      setSelectedFiles([]); // 업로드 후 상태 초기화
    } else {
      alert("파일을 선택하세요!");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>사진 업로드</h2>
        <input
          type="file"
          accept="image/*"
          multiple // 여러 파일 선택 가능
          onChange={handleFileChange}
        />
        {selectedFiles.length > 0 && (
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li> // 선택된 파일명 표시
            ))}
          </ul>
        )}
        <div className="popup-buttons">
          <button className="upload-button" onClick={handleUpload}>
            업로드
          </button>
          <button className="cancel-button" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
