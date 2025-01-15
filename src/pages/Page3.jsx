import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { startAudioProcessing } from "../utils/audioProcessor"; // 오디오 FFT 처리를 위한 함수
import { parseMxlFile } from "../utils/mxlParser"; // MXL 파일 파싱 함수
import { findMatchingSegment } from "../utils/noteMatcher"; // 감지된 음과 악보를 매칭하는 함수
import "./Page3.css";

const Page3 = () => {
  const [parsedSheetMusic, setParsedSheetMusic] = useState(null); // 파싱된 악보 데이터를 저장
  const [highlightedMeasures, setHighlightedMeasures] = useState([]); // 강조된 마디를 저장
  const [detectedNotes, setDetectedNotes] = useState({}); // FFT로 감지된 음계 데이터를 저장
  const [isAudioStarted, setIsAudioStarted] = useState(false); // 오디오 처리 시작 여부를 저장
  const [error, setError] = useState(""); // 에러 메시지를 저장
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [osmd, setOsmd] = useState(null);
  const [fileContent, setFileContent] = useState(null); // 파일 내용 저장
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedFile) {
      const osmdInstance = new OpenSheetMusicDisplay("music-container", {
        autoResize: true,
      });
      setOsmd(osmdInstance);
      osmdInstance
        .load(selectedFile)
        .then(() => {
          osmdInstance.render();
          console.log("악보가 성공적으로 렌더링되었습니다.");
        })
        .catch((err) => {
          console.error("악보 렌더링 중 오류 발생:", err);
          alert("악보 렌더링에 실패했습니다. 유효한 MusicXML 파일인지 확인해주세요.");
        });
    }
  }, [selectedFile]); // fileContent 변경 시 실행

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
        const selectedFile = e.target.result; // 바이너리 문자열로 파일 읽기
        renderMusic(selectedFile); // 악보 렌더링
        alert(`파일 ${selectedFile.name}이 업로드되었습니다.`);
        handleClosePopup();
      };
      reader.readAsBinaryString(selectedFile); // 바이너리 문자열로 읽기
    } else {
      alert("파일을 선택해주세요.");
    }
  };

  const renderMusic = (selectedFile) => {
    if (osmd) {
      console.log(`test:${parseMxlFile(selectedFile)}`);
      osmd.load(selectedFile)
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

  const handleStartAudio = async () => {
    try {
      // `startAudioProcessing`은 FFT 데이터를 감지하고 `setDetectedNotes`를 호출
      await startAudioProcessing(setDetectedNotes);
      setIsAudioStarted(true); // 오디오가 시작되었음을 상태에 저장
    } catch (err) {
      console.error("Error starting audio processing:", err); // 에러 로그 출력
    }
  };
  // **3. 음성 데이터와 악보 매칭** (감지된 음계와 악보 데이터를 매칭)
  useEffect(() => {
    console.log("useEffect triggered:");
    console.log("Parsed Sheet Music:", parsedSheetMusic); // 현재 악보 데이터 확인
    console.log("Detected Notes:", detectedNotes); // 감지된 음계 확인

    if (!parsedSheetMusic) return; // 악보 데이터가 없으면 매칭하지 않음

    // `findMatchingSegment`를 호출하여 감지된 음과 악보를 매칭
    const matchedMeasures = findMatchingSegment(detectedNotes, parsedSheetMusic);
    setHighlightedMeasures(matchedMeasures); // 매칭된 마디를 상태에 저장
  }, [detectedNotes, parsedSheetMusic]); // `detectedNotes`나 `parsedSheetMusic`이 변경될 때 실행

  return (
    <div className="page3-container">
      {/* 좌측 사이드바 */}
      <div className="sidebar">
        <h2>넘김이</h2>
        <ol>
          <li onClick={() => navigate("/page1")} style={{ cursor: "pointer" }}>
            악보 저장소
          </li>
          <li onClick={() => navigate("/page2")} style={{ cursor: "pointer" }}>
            넘순이
          </li>
          <li style={{ cursor: "pointer", fontWeight: "bold" }}>넘김이</li>
        </ol>
      </div>

      {/* 메인 영역 */}
      <div className="main-content">
        <button className="popup-button" onClick={handleOpenPopup}>
          +
        </button>
        <button className="listen-button" onClick={handleOpenPopup}>
          &gt;
        </button>
        {/* 조건부 렌더링 */}
        {selectedFile ? (
          <div id="music-container" className="music-container"></div>
        ) : (
          <div className="upload-prompt">악보를 업로드하세요.</div>
        )}
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
