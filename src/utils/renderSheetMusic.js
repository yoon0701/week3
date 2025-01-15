import Vex from "vexflow";

const VF = Vex.Flow;

export const renderSheetMusic = (containerId, sheetMusicXml, highlightedMeasures = []) => {
  const container = document.getElementById(containerId);

  if (!container) {
    console.error("Container not found:", containerId);
    return;
  }

  container.innerHTML = ""; // 기존 내용 초기화
  const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
  renderer.resize(800, 600);
  const context = renderer.getContext();

  const validDurations = ["whole", "half", "quarter", "eighth", "16th", "32th"]; // 유효한 duration 값
  const mx = sheetMusicXml["score-partwise"];
  if (!mx) {
    console.error("Invalid sheet music structure: No 'score-partwise' found");
    return;
  }

  const parts = Array.isArray(mx.part) ? mx.part : [mx.part]; // part가 배열이 아니면 배열로 변환
  const staveSpacing = 150; // 보표 간 간격

  parts.forEach((part, partIndex) => {
    const measures = Array.isArray(part.measure) ? part.measure : [part.measure]; // measure가 배열이 아니면 배열로 변환

    measures.forEach((measure, measureIndex) => {
      const stave = new VF.Stave(10, 40 + (measureIndex + partIndex) * staveSpacing, 700);

      const time = measure.attributes?.time || { beats: 4, beat_type: 4 }; // 높은음자리표/낮은음자리표 설정
      stave.addClef("treble").setContext(context).draw();

      // 음표 데이터 생성
      const vexNotes = Array.isArray(measure.note)
        ? measure.note.map((note) => {
            const pitch = note.pitch || {};
            const step = pitch.step?.toLowerCase();
            const octave = pitch.octave;
            const type = note.type;
            const duration = note.duration; // 기본값: "quarter"
            console.log(note);
            // 쉼표 판단
            const isRest = !note.pitch; // pitch가 없으면 쉼표로 간주
            const staveNoteConfig = {
              keys: isRest ? ["b/4"] : [`${step || "c"}/${octave || 4}`], // 쉼표는 "b/4"로 고정
              duration: isRest ? `${duration}r` : duration, // 쉼표 처리
              stem_direction: note.stem === "down" ? VF.Stem.DOWN : VF.Stem.UP, // stem 방향
            };

            const staveNote = new VF.StaveNote(staveNoteConfig);

            // 점음표 추가
            if (note.dot) {
              staveNote.addDotToAll();
            }

            // 임시표 추가
            // if (note.pitch?.alter) {
            //   const accidental = note.pitch.alter === 1 ? "♯" : note.pitch.alter === -1 ? "♭" : "♮";
            //   staveNote.addAccidental(0, new VF.Accidental(accidental));
            // }

            return staveNote;
          })
        : []; // note가 없으면 빈 배열 반환

      console.log(`Measure ${measureIndex} Notes:`, vexNotes);

      const totalTicks = vexNotes.reduce((sum, note) => sum + note.getTicks().value(), 0);
      const maxTicks = VF.RESOLUTION * (time.beats / time.beat_type);
      if (totalTicks > maxTicks) {
        console.error(`Too many ticks in measure: ${totalTicks} > ${maxTicks}`);
        return; // 초과한 경우 렌더링 중단
      }
      // Voice 생성
      const voice = new VF.Voice({ num_beats: time.beats, beat_value: time.beat_type });
      voice.addTickables(vexNotes);

      // Formatter로 정렬 및 렌더링
      new VF.Formatter().joinVoices([voice]).format([voice], 700);
      voice.draw(context, stave);

      // Beam 생성
      const beams = VF.Beam.generateBeams(vexNotes.filter((note) => note.duration.includes("8") || note.duration.includes("16")));
      beams.forEach((beam) => beam.setContext(context).draw());

      // 강조된 마디 스타일 적용
      if (highlightedMeasures.includes(measureIndex)) {
        stave.setStyle({ fillStyle: "lightblue", strokeStyle: "blue" });
      }
    });
  });
};
