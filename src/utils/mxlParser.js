import JSZip from "jszip"; // ZIP 파일 압축 해제를 위한 라이브러리
import { XMLParser } from "fast-xml-parser"; // XML 데이터를 객체로 변환하는 라이브러리

export const parseMxlFile = async (mxlFile) => {
  try {
    const zip = new JSZip(); // JSZip 인스턴스 생성
    const content = await zip.loadAsync(mxlFile); // MXL 파일을 ZIP으로 로드

    // ZIP 파일 내부 구조 확인
    console.log("ZIP Files:", Object.keys(content.files)); // ZIP 파일의 모든 파일 이름 출력

    // MusicXML 파일 검색
    const xmlFileName = Object.keys(content.files).find((name) =>
      name.endsWith("score.xml") // 파일 이름이 score.xml로 끝나는지 확인
    );
    if (!xmlFileName) {
      throw new Error("No score.xml file found in the MXL archive."); // score.xml 파일이 없으면 에러 발생
    }

    // score.xml 파일 읽기
    const xmlData = await content.file(xmlFileName).async("text"); // 텍스트 형식으로 파일 내용 읽기
    console.log("Extracted MusicXML:", xmlData); // 추출된 XML 데이터를 로그로 출력

    // XML 데이터를 객체로 파싱
    const parser = new XMLParser(); // XMLParser 인스턴스 생성
    const parsedXml = parser.parse(xmlData); // XML 데이터를 JavaScript 객체로 변환
    console.log("Parsed MusicXML Object:", parsedXml); // 파싱된 객체 로그 출력

    return parsedXml; // 파싱된 XML 객체 반환
    const exampleXml = {
      "score-partwise": {
        part: [
          {
            measure: [
              {
                note: [
                  {
                    pitch: { step: "C", octave: 4 },
                    type: "quarter",
                    stem: "up",
                  },
                  {
                    pitch: { step: "D", octave: 4 },
                    type: "eighth",
                    stem: "down",
                  },
                  {
                    pitch: { step: "E", octave: 4, alter: 1 }, // ♯
                    type: "16th",
                    stem: "up",
                  },
                  {
                    type: "quarter", // 쉼표
                  },
                ],
              },
              {
                note: [
                  {
                    pitch: { step: "F", octave: 3 },
                    type: "half",
                    stem: "down",
                  },
                  {
                    pitch: { step: "G", octave: 3 },
                    type: "16th",
                    dot: true, // 점음표
                    stem: "up",
                  },
                  {
                    pitch: { step: "A", octave: 3 },
                    type: "eighth",
                    stem: "up",
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    
    // 반환하는 데이터 변경
    return exampleXml;
  } catch (error) {
    // 에러 발생 시 로그 출력 및 에러 전달
    console.error("Error processing MXL file:", error);
    throw error; // 상위 함수로 에러 전달
  }
};
