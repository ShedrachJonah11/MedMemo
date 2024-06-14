import { useEffect, useState, useRef } from "react";

export const useRecordVoice = () => {
  const [mediaRecorder, setMediaRecorder] = useState<any>(null);
  const [recording, setRecording] = useState(false);
  const [recordBlob, setRecordingBlob] = useState<Blob | null>(null);
  const chunks = useRef<any>([]);

  const stateRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };
};
