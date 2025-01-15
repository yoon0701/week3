import React from "react"; // React 컴포넌트 작성에 필요한 라이브러리

// `FrequentNotesDisplay` 컴포넌트는 FFT 데이터로 감지된 음계(frequentNotes)를 화면에 표시
const FrequentNotesDisplay = ({ frequentNotes }) => {
  // `frequentNotes` 객체의 키를 배열로 변환 (예: "0.1", "0.5", "1" 등 시간 간격)
  const timeIntervals = Object.keys(frequentNotes);

  return (
    <div>
      {/* 감지된 시간 간격별로 데이터를 표시 */}
      {timeIntervals.map((interval) => (
        <div key={interval}>
          {/* 시간 간격 제목 표시 (예: "0.1 sec:") */}
          <h2>{interval} sec:</h2>
          {/* 해당 시간 간격에 감지된 음계 표시 */}
          <h3>{frequentNotes[interval]?.join(", ") || "No data"}</h3>
          {/* 
              - `frequentNotes[interval]`이 배열이라면 join(", ")으로 문자열화.
              - 데이터가 없으면 "No data" 출력.
          */}
        </div>
      ))}
    </div>
  );
};

export default FrequentNotesDisplay; // 컴포넌트를 외부에서 사용할 수 있도록 내보냄
