import React, { useEffect } from "react"; // React 및 useEffect 훅을 임포트
import { renderSheetMusic } from "../utils/renderSheetMusic"; // 악보를 렌더링하는 유틸리티 함수

/**
 * @param {Object} sheetMusicXml - 파싱된 MXL 데이터를 나타내는 XML 형식의 객체
 * @param {Array} highlightedNotes - 강조할 음표 배열
 * @returns React 컴포넌트로 악보를 화면에 렌더링
 */
const SheetMusicRenderer = ({ sheetMusicData, highlightedMeasures }) => {
  // React 컴포넌트가 렌더링되거나 상태가 업데이트될 때 실행
  useEffect(() => {
    console.log("Rendering sheet music with data:", sheetMusicData); // XML 데이터를 로그로 출력
    console.log("Highlighted notes:", highlightedMeasures); // 강조된 음표를 로그로 출력

    if (sheetMusicData) {
      // sheetMusicXml이 유효한 경우, 악보를 렌더링
      renderSheetMusic("sheet-music-container", sheetMusicData, highlightedMeasures);
    }
  }, [sheetMusicData, highlightedMeasures]); // sheetMusicXml 또는 highlightedNotes가 변경될 때마다 실행

  // 화면에 악보를 출력할 컨테이너
  return <div id="sheet-music-container" />;
};

export default SheetMusicRenderer; // 컴포넌트를 외부에서 사용할 수 있도록 내보냄
