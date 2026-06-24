import { useRef } from "react";

const useVoiceRecorder =
  () => {
    const recorder =
      useRef(null);

    const startRecording =
      async () => {
        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              audio: true,
            }
          );

        recorder.current =
          new MediaRecorder(
            stream
          );

        recorder.current.start();
      };

    const stopRecording =
      () => {
        recorder.current.stop();
      };

    return {
      startRecording,
      stopRecording,
    };
  };

export default useVoiceRecorder;