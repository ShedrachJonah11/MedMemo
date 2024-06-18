"use client";
import { template, pointStyle } from "@/app/assests/data";
import { Bullet } from "@/app/components/bullet";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
  Image,
  Textarea,
} from "@nextui-org/react";
import { Pause, PlayCircle, SearchNormal1 } from "iconsax-react";
import { IoMdClose } from "react-icons/io";
import React, { useEffect, useState, useRef } from "react";
import RecentSessions from "@/app/components/recentSessions";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
function Page() {
  const [query, setQuery] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);
  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);
  const [patientName, setPatientName] = useState<any>("");
  const [tooltipIsOpen, setTooltipIsOpen] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isPaused, setIsPaused] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [notes, setNotes] = useState("");
  const [modalState, setModalState] = useState("new session");
  const [transcription, setTranscription] = useState([]);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const audioRef = useRef<HTMLAudioElement>(null);

  const audiOption = [
    {
      key: "High_definition _audio",
      label: "High definition audio",
    },
  ];

  function OnInputChange(value: string) {
    setQuery(value);
  }

  const handleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        const chunks: Blob[] = [];

        recorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/wav" });
          const url = URL.createObjectURL(blob);
          setAudioURL(url);
          setIsRecording(false);
          clearInterval(timerRef.current!);
          setModalState("processing session");
          onOpen();
        };

        recorder.start();
        setIsRecording(true);
        setElapsedTime(0);

        timerRef.current = setInterval(() => {
          setElapsedTime((prev) => prev + 1);
        }, 1000);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    }
  };

  const handlePauseResume = () => {
    if (isPaused) {
      mediaRecorder?.resume();
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      mediaRecorder?.pause();
      clearInterval(timerRef.current!);
    }
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    if (audioURL && audioRef.current) {
      audioRef.current.src = audioURL;
    }

    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  useEffect(() => {
    onOpen();
  }, []);
  return (
    <div className="pb-5 w-full flex flex-col gap-5">
      <Modal
        className="bg-white shadow-none py-5 w-full"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="xl"
        isDismissable={modalState === "processing session" ? true : false}
        isKeyboardDismissDisabled={
          modalState === "processing session" ? true : false
        }
        closeButton={modalState !== "processing session" && <span></span>}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-3 justify-center items-center">
            {modalState === "new session" && (
              <p className="text-2xl font-semibold text-[#343A40]">
                Begin new session
              </p>
            )}
            {modalState === "save sesssion" && (
              <Image src="tick.png" className="w-[48px] h-[48px]" />
            )}
            {modalState === "processing session" && (
              <HiOutlineDotsHorizontal color="#007BFF" size={32} />
            )}
          </ModalHeader>
          <ModalBody>
            {modalState === "new session" && (
              <div className="flex flex-col gap-3 justify-center items-center w-full">
                <div className="w-full">
                  <Autocomplete
                    radius="md"
                    size="md"
                    aria-label="autocomplete"
                    variant="bordered"
                    items={autoComplete ? autoComplete : []}
                    isLoading={autoCompleteLoading}
                    inputValue={query ? query : ""}
                    onSelectionChange={setPatientName}
                    placeholder="Search patient name"
                    onInputChange={OnInputChange}
                    allowsEmptyCollection
                    className="bg-white w-full rounded-md shadow-none w-full"
                    endContent={<SearchNormal1 size="24" color="#71839B" />}
                    classNames={{
                      base: "rounded-md border-1 hover:border-black focus:border-black",
                    }}
                    inputProps={{
                      classNames: {
                        inputWrapper:
                          "h-[56px] shadow-none rounded-md border-0 hover:border-none focus:border-none",
                      },
                    }}
                  >
                    {(item: any) => (
                      <AutocompleteItem
                        key={item.key}
                        value={item.key}
                        className="capitalize"
                      >
                        {item.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>
                <div className="flex justify-normal gap-3 w-full">
                  <Select
                    size="md"
                    radius="sm"
                    className="w-full bg-white shadow-none  rounded-lg h-[60px] scrollb"
                    label="Templates"
                    labelPlacement="inside"
                    variant="flat"
                    aria-label="Templates"
                    classNames={{
                      base: "bg-white h-[60px]",
                      trigger: [
                        "bg-white h-[60px] border-1 hover:border-black focus:border-black",
                        "data-focus-[within=true]:bg-white",
                        "data-[hover=true]:bg-white",
                        "group-data-[focus=true]:bg-white",
                      ],
                      label: "pl-10",
                      listboxWrapper: "bg-[#EDEDED]",
                      popoverContent: "bg-[#EDEDED]",
                    }}
                    startContent={<Bullet color="#004085" />}
                    defaultSelectedKeys={["SOAP"]}
                  >
                    {template.map((template) => (
                      <SelectItem
                        className="hover:bg-white focus:bg-white"
                        classNames={{
                          base: [
                            "rounded-sm text-sm",
                            "data-[hover=true]:bg-white",
                            "data-[selected=true]:bg-white",
                            "data-[focus=true]:bg-white",
                            "data-[focus-visible=true]:bg-white",
                            "h-[57px]",
                          ],
                        }}
                        key={template.key}
                      >
                        {template.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    size="md"
                    radius="sm"
                    className="w-full bg-white shadow-none  rounded-lg "
                    label="Style"
                    variant="flat"
                    labelPlacement="inside"
                    aria-label="Style"
                    classNames={{
                      base: "bg-white  h-[60px]",
                      trigger: [
                        "bg-white h-[60px] border-1 hover:border-black focus:border-black",
                        "data-focus-[within=true]:bg-white",
                        "data-[hover=true]:bg-white",
                        "group-data-[focus=true]:bg-white",
                      ],
                      label: "pl-10",
                      popoverContent: "bg-[#EDEDED]",
                    }}
                    startContent={<Bullet color="#5BC0DE" />}
                    defaultSelectedKeys={["BULLET_POINTS"]}
                  >
                    {pointStyle.map((pointStyle) => (
                      <SelectItem
                        classNames={{
                          base: [
                            "rounded-sm text-sm",
                            "data-[hover=true]:bg-white",
                            "data-[selected=true]:bg-white",
                            "data-[focus=true]:bg-white",
                            "data-[focus-visible=true]:bg-white",
                            "h-[57px]",
                          ],
                        }}
                        key={pointStyle.key}
                      >
                        {pointStyle.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            )}
            {modalState === "save session" && (
              <p className="text-[#71839B] text-sm font-medium">
                Done recording? Be sure to save the session to avoid data loss.
              </p>
            )}
            {modalState === "processing session" && (
              <div className="text-center flex flex-col gap-2 justify-center w-full">
                <p className="text-[#343A40] text-xl font-semibold">
                  Wait a while we’re process your recording
                </p>
                <p className="text-[#71839B] text-sm font-medium">
                  We can do this in the background. We’ll notify you when we are
                  done.
                </p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            {modalState === "new session" && (
              <Button
                className="w-[384px] h-[52px] text-white bg-[#007BFF] text-base font-semibold rounded-md mx-auto"
                onPress={onClose}
              >
                Begin Session
              </Button>
            )}
            {modalState === "save session" && (
              <div className="flex justify-center gap-4 w-full">
                <Button
                  className="max-w-[120px] w-full h-[56px] rounded-md border-[3px] border-[#007BFF] text-[#007BFF] bg-white"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button className="max-w-[120px] w-full h-[56px] rounded-md bg-[#007BFF] text-white">
                  save
                </Button>
              </div>
            )}
            {modalState === "processing session" && (
              <Button
                className="w-[384px] h-[52px] text-white bg-[#007BFF] text-base font-semibold rounded-md mx-auto"
                onPress={onClose}
              >
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <section className="flex justify-between gap-5 w-full">
        <div className="flex flex-col justify-between gap-4 items-center bg-white p-5 rounded-2xl min-h-[340px]  max-h-[532px]  w-full">
          <div className="flex w-full flex-wrap ">
            <Button
              className="bg-[#E9ECEF] w-[170px] align-top  shadow-md  drop-shadow-sm border-1  text-black h-[32px] rounded-2xl py-2 px-3 self-start  mr-auto"
              onClick={() => {
                if (audioURL && audioRef.current) {
                  audioRef?.current.play();
                }
              }}
            >
              Begin to start listening
            </Button>
            <Select
              radius="sm"
              className="bg-[#E9ECEF] w-[170px] align-top  shadow-md  drop-shadow-sm border-1  text-black h-[32px] rounded-2xl px-1   "
              aria-label="audio quality"
              classNames={{
                base: ["bg-[#E9ECEF] h-[32px] py-0"],
                trigger: [
                  "bg-[#E9ECEF] h-[32px] py-0  border-0 shadow-none rounded-2xl min-h-[32px]",
                ],
                popoverContent: "bg-[#EDEDED]",
              }}
              defaultSelectedKeys={["High_definition _audio"]}
            >
              {audiOption.map((option) => (
                <SelectItem
                  className="h-[32px]"
                  classNames={{
                    base: [
                      "rounded-sm text-sm h-[32px] py-0 border-0 shadow-none",
                      "data-[hover=true]:bg-white",
                      "data-[selected=true]:bg-white",
                      "data-[focus=true]:bg-white",
                      "data-[focus-visible=true]:bg-white",
                    ],
                  }}
                  key={option.key}
                >
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex flex-col justify-between gap-2 items-center">
            <p className="text-center text-sm font-semibold text-black">
              {isRecording && formatTime(elapsedTime)}
            </p>
            <div className="relative">
              <div
                className={`bg-[#E9ECEF] w-fit  p-3 rounded-full flex justify-center items-center ${
                  isRecording ? "recorder" : "bg-[#E9ECEF]"
                }`}
              >
                <Button
                  onPress={handleRecording}
                  className="bg-[#007BFF] w-[104px] h-[104px] rounded-[104px] m-auto "
                >
                  <Image
                    src={isRecording ? "/stop.png" : "/microphone.png"}
                    className="w-[45.5px] h-[45.5px]"
                    width={1000}
                  ></Image>
                </Button>
              </div>
              {isRecording && (
                <Button
                  className="bg-[#E9ECEF] w-[48px] h-[48px] rounded-3xl absolute top-10 -right-20"
                  isIconOnly
                  onPress={handlePauseResume}
                >
                  {isPaused ? (
                    <PlayCircle size="32" color="#007BFF" variant="Bold" />
                  ) : (
                    <Pause size="32" color="#007BFF" variant="Bold" />
                  )}
                </Button>
              )}
            </div>
            <div className="block">
              <div className="bg-[#E9ECEF] h-[24px] rounded-xl py-2 px-3 flex translate-y-1">
                <span className="text-whitespace-nowrap flex justify-center gap-1 items-center text-sm font-semibold text-[#343A40]">
                  {isRecording ? "Click to end session" : "Click to begin"}
                  <IoMdClose color="black" size={18} />
                </span>
                <div className="bg-inherit rotate-45 p-1 absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
              </div>
            </div>
          </div>
          <div className=" h-[50px] flex flex-col items-center justify-center">
            <Image
              className="w-full my-auto objext-contain"
              src={isRecording ? "/isRecording.svg" : "/flatline.png"}
              radius="none"
            ></Image>
          </div>
        </div>
        <div className="bg-white p-5 flex flex-col rounded-2xl gap-2 justify-between items-center min-h-[340px] max-h-[532px] w-full">
          {transcription.length<=0 ? (
            <div className="bg-white p-5 flex flex-col text-center justify-center items-center h-full gap-1">
              <p className="text-xl font-semibold ">Nothing here yet.</p>
              <p className="text-[#71839B] text-sm">
                Speak to see the transcript{" "}
              </p>
              {audioURL && <audio controls ref={audioRef} src={audioURL} />}
            </div>
          ) : (
            <div>
              <div className="min-h-[300px] overflow-y-auto max-h-[300px] h-full custom-scrollbar">
                <div className="flex flex-col gap-1">
                  <span className="text-[#71839B] text-sm">00:02</span>
                  <p className="text-base font-normal text-[#343A40]">
                    Can you hear what i am saying right now? this is a sample
                    where the text is way longer than necessary and enters the
                    next frame
                  </p>
                </div>
              </div>
              <p className="text-[#343A40] text-base font-medium ">
                Leave notes to come back to
              </p>
              <Textarea
                minRows={1}
                maxRows={3}
                radius="sm"
                placeholder="notes......"
                className="rounded-md w-full min-h-[52px] border-1 border-[#83818E]"
                classNames={{
                  label: "text-base text-[#71839B]",
                  input: "text-base",
                  inputWrapper: [
                    "bg-white",
                    "data-focus-[within=true]:bg-white",
                    "data-[hover=true]:bg-white",
                    "group-data-[focus=true]:bg-white",
                  ],
                }}
                endContent={
                  <div className="flex flex-col items-end justify-end mt-auto">
                    {" "}
                    <Button
                      radius="none"
                      className="w-[97px] h-[32px] bg-[#007BFF] text-white"
                      onClick={() => {
                        setModalState("save session");
                        onOpen();
                      }}
                    >
                      Save
                    </Button>
                  </div>
                }
                value={notes}
                onChange={(e: any) => setNotes(e.target.value)}
              />
            </div>
          )}
        </div>
      </section>
      <RecentSessions />
    </div>
  );
}

export default Page;
