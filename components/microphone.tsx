"use client";

import {
  CreateProjectKeyResponse,
  LiveClient,
  LiveTranscriptionEvents,
  createClient,
} from "@deepgram/sdk";
import { useState, useEffect, useCallback } from "react";
import { useQueue } from "@uidotdev/usehooks";
import Dg from "./dg.svg";
import Recording from "./recording.svg";
import Image from "next/image";
import Loader from "./Loader";

export default function Microphone({
  callback,
  stopRecording,
  id,
}: {
  callback: any;
  stopRecording: any;
  id: any;
}) {
  const { add, remove, first, size, queue } = useQueue<any>([]);
  const [apiKey, setApiKey] = useState<CreateProjectKeyResponse | null>();
  const [connection, setConnection] = useState<LiveClient | null>();
  const [isListening, setListening] = useState(false);
  const [isLoadingKey, setLoadingKey] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isProcessing, setProcessing] = useState(false);
  const [micOpen, setMicOpen] = useState(false);
  const [microphone, setMicrophone] = useState<MediaRecorder | null>();
  const [userMedia, setUserMedia] = useState<MediaStream | null>();
  const [caption, setCaption] = useState<string | null>();
  const [firstOpen,setFirstOpen]=useState(true);

  const toggleMicrophone = useCallback(async () => {
    if (microphone && userMedia) {
      setUserMedia(null);
      setMicrophone(null);
  
      if (isListening) {
        setListening(false); // Stop listening when stopping recording
      }
  
      microphone.stop();
    } else {
      const userMedia = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
  
      const microphone = new MediaRecorder(userMedia);
      microphone.start(500);
  
      microphone.onstart = () => {
        setMicOpen(true);
        setListening(true); // Start listening when starting recording
      };
  
      microphone.onstop = () => {
        setMicOpen(false);
        // Do not change the state of isListening here
      };
  
      microphone.ondataavailable = (e) => {
        add(e.data);
      };
  
      setUserMedia(userMedia);
      setMicrophone(microphone);
    }
  }, [add, microphone, userMedia, isListening]);
  useEffect(()=>{
    //toggleMicrophone();
  },[])
  useEffect(() => {
    if (!apiKey) {
      //console.log("getting a new api key");
      fetch("/api", { cache: "no-store" })
        .then((res) => res.json())
        .then((object) => {
          if (!("key" in object)) throw new Error("No api key returned");

          setApiKey(object);
          setLoadingKey(false);
        })
        .catch((e) => {
          //console.error(e);
        });
    }
  }, [apiKey]);

  useEffect(() => {
    if (apiKey && "key" in apiKey) {
      //console.log("connecting to deepgram");
      const deepgram = createClient(apiKey?.key ?? "");
      const connection = deepgram.listen.live({
        model: "nova-2-medical",
        punctuate: true,
        smart_format: true,
      });

      connection.on(LiveTranscriptionEvents.Open, () => {
        //console.log("connection established");
        if(firstOpen){
          toggleMicrophone();
          setFirstOpen(false);
        }
        setListening(true);
        setLoading(false)
      });

      connection.on(LiveTranscriptionEvents.Close, () => {
        //console.log("connection closed");
        setListening(false);
        setApiKey(null);
        setConnection(null);
        setLoading(true)
      });

      connection.on(LiveTranscriptionEvents.Transcript, (data) => {
        const words = data.channel.alternatives[0].words;
        const caption = words
          .map((word: any) => word.punctuated_word ?? word.word)
          .join(" ");
        if (caption !== "") {
          setCaption(caption);
          callback(caption);
        }
      });

      setConnection(connection);
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    const processQueue = async () => {
      if (size > 0 && !isProcessing) {
        setProcessing(true);

        if (isListening) {
          const blob = first;
          connection?.send(blob);
          remove();
        }

        const waiting = setTimeout(() => {
          clearTimeout(waiting);
          setProcessing(false);
        }, 250);
      }
    };

    processQueue();
  }, [connection, queue, remove, first, size, isProcessing, isListening]);

  if (isLoadingKey || isLoading) return <Loader />;

  return (
    <>
      {/* starts & Stop recording */}
      <button
        type="button"
        className={`relative ${isListening ? "active" : ""}`}
        onClick={() => toggleMicrophone()}
      >
        <div
          className={`w-6 h-6 rounded-full ${
            isListening ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {isListening && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-3 h-3 rounded-full border-2 border-white animate-pulse" />
            </div>
          )}
        </div>
      </button>

      {/* Hold Recording */}
      <button type="button" onClick={() => stopRecording()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="35"
          viewBox="0 0 26 26"
        >
          <path
            fill="currentColor"
            d="M21 20c0 .551-.449 1-1 1H6c-.551 0-1-.449-1-1V6c0-.551.449-1 1-1h14c.551 0 1 .449 1 1v14z"
          />
        </svg>
      </button>
    </>
  );
}
