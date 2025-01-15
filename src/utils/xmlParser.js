import { parseStringPromise } from "fast-xml-parser"; // fast-xml-parser를 사용하여 XML 데이터를 파싱

export const parseMxlFile = async (file) => {
  // 파일 내용을 텍스트로 읽어오기
  const textData = await file.text();

  // XML 데이터를 객체로 파싱
  const result = await parseStringPromise(textData, { explicitArray: false });

  // "score-partwise" 내의 "part" 데이터 가져오기
  const parts = result["score-partwise"]?.part || [];
  if (!Array.isArray(parts)) parts = [parts]; // 단일 파트를 배열로 변환

  // 마디별 데이터 구조화
  const sheetMusicData = parts.flatMap((part) =>
    Array.isArray(part.measure)
      ? part.measure.map((measure) => ({
          // 음표 데이터 처리
          notes: Array.isArray(measure.note)
            ? measure.note.map((note) => ({
                step: note.pitch?.step?.toLowerCase(), // 음계 (예: "c", "d#")
                octave: note.pitch?.octave, // 옥타브 (예: 4, 5)
                duration: note.type, // 음표 길이 (예: "quarter", "half")
              }))
            : [], // 음표가 없을 경우 빈 배열 반환
        }))
      : [] // 마디가 없을 경우 빈 배열 반환
  );

  // 파싱된 악보 데이터 반환
  return sheetMusicData;
};
