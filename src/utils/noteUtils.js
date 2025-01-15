import * as Tone from "tone"; // Tone.js 라이브러리를 임포트

// 주파수를 노트로 변환하는 함수
export const freqToNotes = (freq) => {
  if (!freq || freq.length <= 0) return []; // 주파수 데이터가 없거나 비어 있으면 빈 배열 반환

  const A4 = 440; // 기준 음 A4 (440Hz)
  const notes = ["도", "도#", "레", "레#", "미", "파", "파#", "솔", "솔#", "라", "라#", "시"]; // 음계 배열

  const result = freq.map((value) => {
    const semitones = Math.round(12 * Math.log2(value / A4)); // 주파수에서 반음 단위 계산
    const noteNumber = semitones + 69; // MIDI 노트 번호 계산
    const octave = Math.floor(noteNumber / 12) - 1; // 옥타브 계산
    const note = notes[noteNumber % 12]; // 음계 추출
    return `${note}${octave}`; // 음계와 옥타브 조합하여 반환
  });

  return [...new Set(result)]; // 중복 제거 후 배열 반환
};

// FFT 데이터에서 유효 주파수를 추출하는 함수
export const getMaxFrequencies = (frequencies) => {
  const nyquist = Tone.getContext().sampleRate / 2; // 나이퀴스트 주파수 계산
  const threshold = -70; // 최소 진폭 기준값 설정
  let ret = [];

  frequencies.forEach((amplitude, index) => {
    if (amplitude > threshold) {
      ret.push((index / frequencies.length) * nyquist); // 주파수를 계산하여 추가
    }
  });

  return ret; // 유효한 주파수 배열 반환
};

// 노트 기록을 기반으로 감지된 음계를 업데이트하는 함수
export const updateFrequentNotes = (noteHistories) => {
  const updatedFrequentNotes = {};

  noteHistories.forEach((history) => {
    const noteCounts = new Map(); // 노트와 빈도를 저장할 맵 생성

    history.notes.forEach((note) => {
      if (note) {
        noteCounts.set(note, (noteCounts.get(note) || 0) + 1); // 노트 빈도 증가
      }
    });

    for (let [note, count] of noteCounts.entries()) {
      noteCounts.set(note, Math.max(count - 0.1, 0)); // 노트 빈도를 감소시키며 음이 오래되면 제거
      if (noteCounts.get(note) <= 0) {
        noteCounts.delete(note); // 빈도가 0 이하인 노트 삭제
      }
    }

    updatedFrequentNotes[history.interval] = [...noteCounts.entries()]
      .sort((a, b) => b[1] - a[1]) // 빈도 내림차순으로 정렬
      .map(([note, count]) => `${note} (${count.toFixed(1)})`); // 결과를 포맷하여 저장
  });

  return updatedFrequentNotes; // 업데이트된 음계 데이터 반환
};

// 주파수 데이터가 피아노 음계인지 확인하는 함수
export const isPianoTones = (frequencies, fundamentalFreqs) => {
  const harmonics = [2, 3, 4, 5]; // 고조파 계수 배열
  const threshold = -65; // 진폭 기준값 설정

  return fundamentalFreqs.some((fundamentalFreq) =>
    harmonics.some((multiplier) => {
      const harmonicFreq = fundamentalFreq * multiplier; // 고조파 주파수 계산
      const index = Math.round((harmonicFreq / Tone.getContext().sampleRate) * frequencies.length); // 주파수의 FFT 인덱스 계산
      return frequencies[index] > threshold; // 진폭이 기준값보다 큰지 확인
    })
  );
};
