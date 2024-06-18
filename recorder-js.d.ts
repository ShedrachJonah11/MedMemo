declare module 'recorder-js' {
    class Recorder {
      constructor(config?: {
        leaveStreamOpen?: boolean;
        numChannels?: number;
        sampleRate?: number;
        bitRate?: number;
      });
  
      init(): Promise<void>;
      start(): void;
      stop(callback: (blob: Blob) => void): void;
      setLeaveStreamOpen(leaveStreamOpen: boolean): void;
      setRecordingCallback(callback: (e: Event) => void): void;
      clear(): void;
    }
  
    export default Recorder;
  }
  