import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";

import mic from "../public/icon-park-outline_voice.svg";
import copy from "../public/tabler_copy.svg";
import record from "../public/record-circle.svg";
import doc from "../public/document-upload.svg";
import sound from "../public/sound.svg";
import edit from "../public/edit-2.svg";
import arrowdown from "../public/arrow-down.svg";
import file from "../public/document-forward.svg";
import {
  capitalize,
  copyToClipboard,
  getCurrentDateTime,
  getJSONdata,
} from "@/application/utils/functions";
import axiosInstance from "@/application/api/axiosInstance";
import {
  getEncouterDB,
  insertTranscriptDB,
  updateEncounterDB,
} from "@/application/database/database";
import Loader from "./Loader";
import { generateNote, getTranscript } from "@/application/api/apis";
import Microphone from "./microphone";
import { renderObjective, renderSubjective } from "./Functions";

const PageData = ({
  activeTab,
  setActiveTab,
  id,
  updateTranscript,
  generateAutoNote,
  gnote,
  setGNote,
  rename,
}: {
  activeTab: any;
  id: any;
  setActiveTab: any;
  updateTranscript: any;
  generateAutoNote: any;
  gnote: any;
  setGNote: any;
  rename: any;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");
  const [transcript, setTranscript] = useState("[]");
  const [isRecording, setIsRecording] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showNoteCards, setShowNoteCards] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [isListening, setListening] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const languages = ["English", "Spanish", "French", "German"];
  const [allData, setAllData] = useState<any>({});
  const [pnote, setPNote] = useState("");
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const [editTitle, setEditTitle] = useState(false); // State for editing title
  const [titleValue, setTitleValue] = useState("Encounter");

  const handleTitleEdit = () => {
    //setEditTitle(true);
    rename(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const handleTitleSubmit = () => {
    // Perform actions on title submission here
    setEditTitle(false);
    // You can update the title in the database or wherever necessary
  };

  useEffect(() => {
    // Set the default tab to "transcript" when the component mounts
    setActiveTab("transcript");
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the transcript container whenever transcript is updated
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop =
        transcriptContainerRef.current.scrollHeight;
    }
  }, [transcript]);
  const [showUploadContent, setShowUploadContent] = useState(false);

  const loadDocument = async () => {
    try {
      setGNote(undefined);
      const data = await getEncouterDB(id);
      setTitleValue(data.title);
      setAllData(data);
      if (data.note) {
        setPNote(data.note);
      }
      if (data.summary) {
        setGNote(JSON.parse(data.summary));
        //console.log(data.summary);
      }
      if (data.transcript) {
        updateTranscript(data.transcript);
      }
      loadTranscriptIfFile(data);
      //console.log(data);
    } catch (e) {}
  };
  const loadTranscriptIfFile = async (data: any) => {
    try {
      if (data.isFileUsed != null && data.transcript == null) {
        //console.log("here");
        const req = await getTranscript(data.isFileUsed);
        if (req.transcription_status == "DONE") {
          updateEncounterDB(id, "transcript", req.text);
          loadDocument();
        } else {
          setTimeout(() => {
            loadDocument();
          }, 5000);
        }
        //console.log(req);
      }
    } catch (e) {
      //console.log(e);
    }
  };

  useEffect(() => {
    loadDocument();
  }, []);

  const handleUploadButtonClick = () => {
    setShowUploadContent(true);
  };

  const onBlobUpdate = (blob: any) => {
    // Access the blob data outside the hook
    //console.log("Updated blob data:", blob);
    // Process or use the blob data as needed
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
  };
  let cn = 0;

  // Function to pause recording
  const pauseRecording = () => {};

  // Function to resume recording
  const resumeRecording = () => {};
  function processTranscript(jsonString: any) {
    try {
      const transcriptArray = JSON.parse(jsonString);

      if (Array.isArray(transcriptArray)) {
        // If it's an array (assumed to be JSON), generate divs for each entry
        const divs = transcriptArray.map((entry, index) => (
          <div key={index}>
            <div style={{ fontSize: "small", marginBottom: "10px" }}>
              {entry.date}
            </div>

            <div className="text-sm">{entry.text}</div>
            <br />
          </div>
        ));

        return divs;
      }
    } catch (error) {
      // If parsing as JSON fails, treat it as a plain text and return it
      return <div>{jsonString}</div>;
    }

    // If it's not JSON, treat it as plain text and return it
    return <div>{jsonString}</div>;
  }
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const uploadFileTrans = async (file: any) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("audio_file", file);

      // Assuming you have an axios instance named 'axiosInstance' configured with your API base URL
      const response = await axiosInstance.post(
        "/transcription/upload-audio",
        formData
      );

      // Handle the response from the server
      //console.log("Upload successful:", response.data);
      //insertTranscriptDB(file.name,"",response.data.status_id,"","",getCurrentDateTime())
      const formattedData = response.data.transcription.map((entry: any) => {
        const text = entry.transcript;
        const date = `${entry.start}-${entry.end}`;
        return { text, date };
      });
      //console.log(formattedData)
      await updateEncounterDB(id, "transcript", JSON.stringify(formattedData));
      loadDocument();
      setLoading(false);

      // You can perform additional actions with the response data if needed
    } catch (error) {
      // Handle errors during file upload
      //console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };
  const generateMainNote = async () => {
    try {
      setLoading(true);
      const data = await generateAutoNote();
      setLoading(false);
      if (data) {
        //setGNote(data);
      }
    } catch (e) {
      //console.log(e);
      setLoading(false);
    }
  };
  const transcriptCallBack = async (text: any) => {
    //console.log(text);
    const data = {
      date: getCurrentDateTime(),
      text: text,
    };
    let dbdata = await getEncouterDB(id);
    try {
      const existingTranscript = JSON.parse(
        dbdata.transcript ? dbdata.transcript : "[]"
      );
      existingTranscript.push(data);
      setTranscript(JSON.stringify(existingTranscript));
      await updateEncounterDB(
        id,
        "transcript",
        JSON.stringify(existingTranscript)
      );
    } catch (error) {
      setTranscript(dbdata.transcript + text);
      await updateEncounterDB(id, "transcript", dbdata.transcript + text);
    }
    loadDocument();
  };

  return (
    <div className="relative h-full">
      {activeTab === "transcript" &&
        !isRecording &&
        (allData.transcript == "" || allData.transcript == null) &&
        allData.isFileUsed == null && (
          <div className="h-full flex justify-center items-center">
            <div className="p-4 relative max-w-xl w-full">
              <Card className="w-full lg:w-[400px]">
                <CardHeader className="flex justify-between items-center mt-2">
                  <div className="flex">
                    {editTitle ? (
                      <input
                        type="text"
                        value={titleValue}
                        onChange={handleTitleChange}
                        onBlur={handleTitleSubmit}
                        autoFocus
                      />
                    ) : (
                      <>
                        <h1 className="font-medium mr-2">{titleValue}</h1>
                        <button type="button" onClick={handleTitleEdit}>
                          <Image src={edit} alt="" />
                        </button>
                      </>
                    )}
                  </div>
                  <Dropdown>
                    <DropdownTrigger className="rounded-full">
                      <Button
                        variant="bordered"
                        className="capitalize font-medium"
                      >
                        {selectedLanguage}
                        <Image src={arrowdown} alt="arrowdown" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Select Language"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedLanguage}
                      onSelectionChange={(language) =>
                        handleLanguageChange(language as string)
                      }
                    >
                      {languages.map((language) => (
                        <DropdownItem key={language}>{language}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </CardHeader>
                <Divider className="" />
                <CardBody className="flex justify-center items-center flex-col">
                  {showUploadContent ? (
                    <div className="justify-center items-center flex flex-col ">
                      <Image src={file} alt="" className="mt-10" />
                      <h1 className="font-semibold text-lg mt-2">
                        Upload Audio
                      </h1>
                      <p className="text-center text-lg p-3 text-[#808080]">
                        Supported files: MP3, WAV, M4A
                      </p>
                      <label>
                        <div className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-6 min-w-unit-24 h-unit-12 text-medium gap-unit-3 rounded-large [&>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none text-default-foreground data-[hover=true]:opacity-hover w-full md:w-[300px] bg-[#008080] mt-6 mb-6">
                          <h1 className="text-white font-bold">Upload Audio</h1>
                        </div>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          onChange={(e: any) => {
                            uploadFileTrans(e.target.files[0]);
                          }}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="justify-center items-center flex flex-col ">
                      <Image src={sound} alt="" className="mt-10" />
                      <p className="text-center  max-w-xl mt-6 p-3 text-[#808080]">
                        To ensure we can hear you, make sure your microphone
                        settings are correct
                      </p>

                      <Button
                        onClick={startRecording}
                        size="lg"
                        className="w-full md:w-[356px] bg-[#007BFF] mt-10"
                      >
                        <Image src={record} alt="" />
                        <h1 className="text-white font-bold">
                          Record Conversation
                        </h1>
                      </Button>

                      <div className="flex items-center mt-4">
                        <div className="flex-1 h-[1px] bg-black"></div>
                        <div className="mx-4 text-gray-500 font-semibold">
                          or
                        </div>
                        <div className="flex-1 h-[1px] bg-black"></div>
                      </div>

                      <button
                        type="button"
                        onClick={handleUploadButtonClick}
                        className="w-full md:w-[300px] mt-2 mb-6"
                      >
                        <div className="flex justify-center  mt-2">
                          <Image src={doc} alt="" className="mr-2" />
                          <h1 className="font-semibold text-[#007BFF]">
                            Upload Recordings
                          </h1>
                        </div>
                      </button>
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>
          </div>
        )}

      {activeTab === "transcript" &&
        allData.isFileUsed != null &&
        allData.transcript == null && (
          <div className="flex items-center justify-center h-screen">
            <Loader />
            <div className="ml-4">Generating Transcript</div>
          </div>
        )}
      {activeTab === "transcript" &&
        allData.transcript != null &&
        allData.transcript != "" && (
          <div
            className="py-10 pb-20 px-10 transcript-container overflow-y-auto max-h-[calc(100vh-80px)]"
            ref={transcriptContainerRef}
          >
            <div className="transcript-content">
              {processTranscript(allData.transcript)}
            </div>
            <Button
              size="lg"
              className="button bg-[#007BFF] text-white fixed right-5 bottom-10"
              onClick={() => {
                generateMainNote();
                setActiveTab("note");
              }}
            >
              Generate Note
            </Button>
          </div>
        )}
      <div>
        {activeTab === "note" && gnote != undefined && (
          <div className="p-4 justify-between flex-col mt-6 sm:flex-row">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 flex-grow justify-between mb-6">
              <Card className="w-full sm:w-1/2">
                <CardBody className="relative">
                  <CardHeader>
                    <h1 className="font-semibold">SUBJECTIVE</h1>
                  </CardHeader>
                  <div className="p-4 mb-6 font-normal text-[#1E1E1E]">
                    {renderSubjective(gnote.subjective)}
                  </div>
                  <button
                    className="absolute bottom-4 left-6"
                    onClick={() =>
                      copyToClipboard(
                        renderSubjective(gnote.objective, true)?.toString() ||
                          ""
                      )
                    }
                  >
                    <Image src={copy} alt="" />
                  </button>
                </CardBody>
              </Card>
              <Card className="w-full sm:w-1/2">
                <CardBody className="relative">
                  <CardHeader>
                    <h1 className="font-bold">OBJECTIVE</h1>
                  </CardHeader>
                  <div className="p-4 mb-6 font-normal text-[#1E1E1E]">
                    {renderObjective(gnote.objective)}
                  </div>
                  <button
                    className="absolute bottom-4 left-6"
                    onClick={() =>
                      copyToClipboard(
                        renderObjective(gnote.objective, true)?.toString() || ""
                      )
                    }
                  >
                    <Image src={copy} alt="" />
                  </button>
                </CardBody>
              </Card>
            </div>

            {/* Second Row */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 flex-grow justify-between">
              <Card className="w-full sm:w-1/2">
                <CardBody>
                  <CardHeader>
                    <h1 className="font-semibold">ASSESSMENT</h1>
                  </CardHeader>
                  <div className="p-4 font-normal text-[#1E1E1E]">
                    {renderSubjective(gnote.assessment)}
                  </div>
                  <div className="flex p-4 gap-2">
                    <button
                      type="button"
                      className="absolute bottom-4 left-6"
                      onClick={() =>
                        copyToClipboard(
                          renderSubjective(
                            gnote.assessment,
                            true
                          )?.toString() || ""
                        )
                      }
                    >
                      <Image src={copy} alt="" />
                    </button>
                  </div>
                </CardBody>
              </Card>
              <Card className="w-full sm:w-1/2">
                <CardBody>
                  <CardHeader>
                    <h1 className="font-bold">PLAN</h1>
                  </CardHeader>
                  <div className="p-4 font-normal text-[#1E1E1E]">
                    {renderSubjective(gnote.plan)}
                  </div>
                  <div className="flex p-4 gap-2">
                    <button
                      type="button"
                      className="absolute bottom-4 left-6"
                      onClick={() =>
                        copyToClipboard(
                          renderSubjective(gnote.plan, true)?.toString() || ""
                        )
                      }
                    >
                      <Image src={copy} alt="" />
                    </button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        )}
        {activeTab === "note" && (
          <div className="p-4 mt-4">
            <Card className="w-full bg-white">
              <CardBody>
                {/* Your "Note" content here */}
                <h1 className="mt-4 font-medium text-[#1E1E1E]">
                  PERSONALIZED NOTE
                </h1>
                <Textarea
                  className=" rounded-lg  mb-4 mt-4"
                  placeholder="Type anything here....."
                  value={pnote}
                  onChange={(e) => {
                    setPNote(e.target.value);
                    updateEncounterDB(id, "note", e.target.value);
                  }}
                />
              </CardBody>
            </Card>
          </div>
        )}
      </div>

      {activeTab === "transcript" && isRecording && (
        <>
          <div className="flex fixed top-10 right-0 mt-6 justify-between p-4">
            <div className="p-4"></div>
            <div className="flex bg-[#E5E8EC] h-16 rounded-full px-6 py-2 gap-4 ">
              <Microphone
                callback={transcriptCallBack}
                stopRecording={stopRecording}
                id={id}
              />
            </div>
          </div>
        </>
      )}
      {isLoading && <Loader type={"FULL"} />}
    </div>
  );
};

export default PageData;
