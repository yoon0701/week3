import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import "./Page3.css";

const Page3 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [osmd, setOsmd] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const osmdInstance = new OpenSheetMusicDisplay("music-container", {
      autoResize: true,
    });
    setOsmd(osmdInstance);
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result; // 바이너리 문자열로 파일 읽기
      renderMusic(fileContent); // 악보 렌더링
      alert(`파일 ${selectedFile.name}이 업로드되었습니다.`);
      handleClosePopup();
    };
    reader.readAsBinaryString(selectedFile); // 바이너리 문자열로 읽기
  } else {
    alert("파일을 선택해주세요.");
  }
};

const renderMusic = (fileContent) => {
  if (osmd) {
    osmd.load(fileContent)
      .then(() => {
        osmd.render(); // 악보 렌더링
        console.log("악보가 성공적으로 렌더링되었습니다.");
      })
      .catch((err) => {
        console.error("악보 렌더링 중 오류 발생:", err);
        alert("악보 렌더링에 실패했습니다. 유효한 MusicXML 파일인지 확인해주세요.");
      });
  } else {
    console.error("OSMD가 초기화되지 않았습니다.");
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
