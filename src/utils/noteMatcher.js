export const findMatchingSegment = (detectedNotes, sheetMusic) => {
  // detectedNotes가 유효한 객체인지 확인
  if (typeof detectedNotes !== "object" || Array.isArray(detectedNotes)) {
    console.error("Invalid detectedNotes format:", detectedNotes); // 잘못된 형식 경고 출력
    return null;
  }

  // detectedNotes 객체의 값을 배열로 변환
  const detectedNotesArray = Object.values(detectedNotes).flat(); // 객체의 모든 값을 평탄화하여 배열로 만듦
  console.log("Detected Notes Array:", detectedNotesArray); // 변환된 배열 로그 출력

  if (!Array.isArray(detectedNotesArray)) {
    console.error("Detected Notes could not be converted to an array:", detectedNotesArray); // 배열 변환 실패 경고 출력
    return null;
  }

  // XML 데이터를 DOM 형식으로 파싱
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(sheetMusic, "text/xml");

  // <measure> 태그를 기준으로 마디 데이터 추출
  const measures = xmlDoc.getElementsByTagName("measure");
  let bestMatch = null; // 가장 높은 유사도를 가진 마디의 인덱스
  let maxSimilarity = 0; // 현재까지 계산된 최대 유사도

  // 각 마디를 순회하며 유사도 계산
  Array.from(measures).forEach((measure, index) => {
    const notes = measure.getElementsByTagName("note"); // 각 마디의 음표 데이터 추출
    const setSheet = new Set(
      Array.from(notes).map((note) => {
        const step = note.getElementsByTagName("step")[0]?.textContent || ""; // 음계 추출
        const octave = note.getElementsByTagName("octave")[0]?.textContent || ""; // 옥타브 추출
        return `${step.toLowerCase()}${octave}`; // 음계와 옥타브를 조합하여 문자열로 반환
      })
    );

    const setDetected = new Set(detectedNotesArray); // 감지된 음계 데이터를 Set으로 변환
    const intersection = [...setDetected].filter((note) => setSheet.has(note)).length; // 교집합 크기 계산
    const union = new Set([...setDetected, ...setSheet]).size; // 합집합 크기 계산
    const similarity = union === 0 ? 0 : intersection / union; // 유사도 계산 (교집합 크기 / 합집합 크기)

    console.log(`Measure ${index}: similarity = ${similarity}`); // 각 마디의 유사도 출력

    if (similarity > maxSimilarity) {
      maxSimilarity = similarity; // 최대 유사도 업데이트
      bestMatch = index; // 현재 마디를 bestMatch로 설정
    }
  });

  // 유사도가 가장 높은 마디가 없을 경우 경고 출력
  if (bestMatch === null) {
    console.warn("No matching segment found.");
  }

  return bestMatch; // 가장 높은 유사도를 가진 마디의 인덱스 반환
};
