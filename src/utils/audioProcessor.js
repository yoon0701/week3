import * as Tone from "tone"; // Tone.js 라이브러리를 임포트
import { freqToNotes, getMaxFrequencies, updateFrequentNotes, isPianoTones } from "./noteUtils"; // 주파수를 노트로 변환하는 유틸리티 함수들 임포트

let intervalId = null; // 오디오 처리 주기를 관리하는 Interval ID
const noteHistories = []; // 시간 간격별로 감지된 노트 기록 저장

export const startAudioProcessing = async (setFrequentNotes) => {
  const timeIntervals = [0.1, 0.2, 0.5, 1, 2, 3]; // 다양한 시간 간격 설정
  noteHistories.push(
    ...timeIntervals.map((interval) => ({
      interval, // 시간 간격
      maxSize: Math.ceil(20 * interval), // 기록 가능한 최대 노트 수
      notes: [], // 감지된 노트 저장
    }))
  );

  try {
    // Tone.js 오디오 컨텍스트 시작
    await Tone.start();
    console.log("Audio Context started");

    // 마이크 입력 연결
    const mic = new Tone.UserMedia();
    await mic.open();
    console.log("Microphone is open");

    // 마이크 입력에 로우패스 필터 연결
    const lowPass = new Tone.Filter({
      type: "lowpass", // 로우패스 필터
      frequency: 2000, // 최대 주파수 2000Hz
      rolloff: -12, // 필터 기울기
    }).toDestination(); // 출력 장치에 연결

    mic.connect(lowPass); // 마이크를 필터에 연결

    // FFT(Fast Fourier Transform) 설정
    const fft = new Tone.FFT(2048);
    lowPass.connect(fft); // 필터 출력을 FFT에 연결

    // 50ms 간격으로 FFT 데이터를 분석
    intervalId = setInterval(() => {
      const frequencies = fft.getValue(); // FFT 데이터를 가져옴
      const maxFreq = getMaxFrequencies(frequencies); // 최대 주파수 추출

      // 유효한 피아노 주파수일 경우 처리
      if (maxFreq.length > 0 && isPianoTones(frequencies, maxFreq)) {
        const notes = freqToNotes(maxFreq); // 주파수를 노트로 변환

        // 시간 간격별로 감지된 노트를 기록
        noteHistories.forEach((history) => {
          notes.forEach((note) => {
            history.notes.push(note); // 새로운 노트 추가
            if (history.notes.length > history.maxSize) {
              history.notes.shift(); // 최대 크기 초과 시 오래된 노트 삭제
            }
          });
        });
      } else {
        // 유효한 주파수가 없을 경우 null 추가
        noteHistories.forEach((history) => {
          history.notes.push(null);
          if (history.notes.length > history.maxSize) {
            history.notes.shift(); // 오래된 데이터 삭제
          }
        });
      }

      // 감지된 노트를 업데이트하여 상태에 반영
      const updatedFrequentNotes = updateFrequentNotes(noteHistories);
      setFrequentNotes(updatedFrequentNotes); // 상위 컴포넌트에 데이터 전달
    }, 50);
  } catch (error) {
    // 마이크 접근 실패 시 에러 처리
    console.error("Error accessing microphone:", error);
  }
};

export const stopAudioProcessing = () => {
  // 오디오 처리 정지
  if (intervalId) {
    clearInterval(intervalId); // Interval 제거
    intervalId = null; // ID 초기화
  }
};
