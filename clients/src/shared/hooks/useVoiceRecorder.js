import { useRef, useState, useCallback } from "react";
const useVoiceRecorder = () => {
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [duration, setDuration] = useState(0);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "audio/ogg";

      const mr = new MediaRecorder(stream, { mimeType });

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      };

      mr.start(250);
      mediaRecorderRef.current = mr;
      setRecording(true);
      setAudioBlob(null);
      setAudioUrl(null);
      setDuration(0);

      timerRef.current = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access denied:", err);
      throw err;
    }
  }, []);

  const stopRecording = useCallback(() => {
    clearInterval(timerRef.current);
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  }, []);

  const resetRecording = useCallback(() => {
    stopRecording();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setDuration(0);
  }, [stopRecording, audioUrl]);

  return {
    recording,
    audioBlob,
    audioUrl,
    duration,
    startRecording,
    stopRecording,
    resetRecording,
  };
};

export default useVoiceRecorder;