import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay"; // OSMD 라이브러리 추가
import "./Page3.css";

const Page3 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태
  const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일
  const [osmd, setOsmd] = useState(null); // OSMD 인스턴스
  const navigate = useNavigate();

  useEffect(() => {
    // OSMD 초기화
    const osmdInstance = new OpenSheetMusicDisplay("music-container");
    setOsmd(osmdInstance);
  }, []);

  // 팝업 열기
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  // 팝업 닫기
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedFile(null); // 파일 선택 초기화
  };

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // 선택된 파일 저장
  };

  // 파일 업로드 및 렌더링 핸들러
  const handleFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result; // 파일 내용 읽기
        renderMusic(fileContent); // 악보 렌더링
        alert(`파일 ${selectedFile.name}이 업로드되었습니다.`);
        handleClosePopup(); // 팝업 닫기
      };
      reader.readAsBinaryString(selectedFile); // 파일을 바이너리 문자열로 읽기
    } else {
      alert("파일을 선택해주세요.");
    }
  };

  // OSMD를 사용해 악보 렌더링
  const renderMusic = (fileContent) => {
    if (osmd) {
      osmd.load(fileContent).then(() => {
        osmd.render(); // 악보 렌더링
      });
    }
  };

  return (
    <div className="page3-container">
      {/* 좌측 사이드바 */}
      <div className="sidebar">
        <h2>악보만들어줘</h2>
        <ol>
          <li onClick={() => navigate("/page1")} style={{ cursor: "pointer" }}>
            넘순이
          </li>
          <li onClick={() => navigate("/page2")} style={{ cursor: "pointer" }}>
            넘김이
          </li>
          <li style={{ cursor: "pointer", fontWeight: "bold" }}>악복이</li>
        </ol>
      </div>

      {/* 메인 영역 */}
      <div className="main-content">
        <button className="popup-button" onClick={handleOpenPopup}>
          +
        </button>
        {/* 악보 표시 영역 */}
        <div id="music-container" className="music-container"></div>
      </div>

      {/* 팝업 */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>MXL 파일 업로드</h2>
            <input
              type="file"
              accept=".mxl"
              onChange={handleFileChange}
              className="file-input"
            />
            <p>{selectedFile ? selectedFile.name : "파일을 선택하세요."}</p>
            <div className="popup-buttons">
              <button className="upload-button" onClick={handleFileUpload}>
                업로드
              </button>
              <button className="close-button" onClick={handleClosePopup}>
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page3;
