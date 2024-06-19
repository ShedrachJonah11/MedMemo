import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import "../../app/style.css";

import menu from "../../public/indent-decrease.svg";
import menu2 from "../../public/menu2.svg";
import copy2 from "../../public/white_copy.svg";
import Sidebar from "@/components/Sidebar";
import SaveModal from "@/components/SaveModal";
import LeftSideBar from "@/components/LeftSideBar";
import AuthProvider from "@/application/utils/authProvider";
import { copyToClipboard, generateRandomKey, getCurrentDateTime, getJSONdata } from "@/application/utils/functions";
import RenameModal from "@/components/RenameModal";
import PageData from "@/components/PageData";
import {
  createNewEncounterDB,
  getPreference,
  updateEncounterDB,
} from "@/application/database/database";
import { generateNote } from "@/application/api/apis";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";
import SubscibedModal from "@/components/SubscribedModal";
import { renderObjective, renderSubjective } from "@/components/Functions";

// Extend the Window interface to include SpeechRecognition
interface Window {
  SpeechRecognition: new () => SpeechRecognition;
}

// Declare the SpeechRecognition interface if it doesn't exist
interface SpeechRecognition {
  results: any;
  // Define the properties and methods of SpeechRecognition
  // Example:
  lang: string;
  start(): void;
  onresult: (event: SpeechRecognition) => void;
}

// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: new () => SpeechRecognition;
  }
}

function Index() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAccountModal, setIsAccountModal] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("transcript");
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showNoteCards, setShowNoteCards] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [currentDocument, setCurrentDocument] = useState("");
  const [patientNote, setPatientNote] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isPaymentSuccess, setPaymentSuccess] = useState(false);
  const [openRename, setOpenRename] = useState(false);
  const [keyExtension, setKey] = useState("");
  const [propSettings, setPropSettings] = useState({
    pronoun: "",
    template: "SOAP",
    style: "AUTO",
    customInstruction: "",
  });
  const router = useRouter();
  const { query } = router;
  useEffect(() => {
    if (query.Payment && query.Payment == "successful") {
      setPaymentSuccess(true);
    }
  }, [query.Payment])
  const loadPreferences = async () => {
    try {
      const pref = await getPreference();
      //console.log(settings)
      if (pref.settings) {
        setPropSettings({
          pronoun: pref.settings.pronoun,
          template: pref.settings.template,
          style: pref.settings.style,
          customInstruction: pref.settings.customInstruction,
        });
      }
    } catch (e) {
      setTimeout(() => loadPreferences(), 2000);
    }
  };
  useEffect(() => {
    loadPreferences();
  }, []);
  const [gnote, setGNote] = useState<any>();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleLeftSideBar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const toggleAccountModal = () => {
    setIsAccountModal(!isAccountModal);
  };

  useEffect(() => {
    const handleResize = () => {
      // Check screen width
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false); // Close sidebar for small screens
      } else {
        setIsSidebarOpen(true); // Open sidebar for larger screens
      }
    };

    // Call handleResize when the window is resized
    window.addEventListener("resize", handleResize);

    // Call handleResize when the component mounts
    handleResize();
    if (window) {
      setUserData(getJSONdata("profile"));
    }
    // Remove event listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resetState = async () => {
    //setShowUploadContent(false); // Reset the state to hide upload content
    // setTranscript(""); // Reset transcript
    //setIsRecording(false); // Reset recording state
    //setRecordingDuration(0);
    //setShowNoteCards(false);
    const ecid = await createNewEncounterDB();
    setCurrentDocument(ecid);
  };

  const handleHistoryCardClick = (id: any) => {
    setShowNoteCards(true);
    setActiveTab("note");
    setCurrentDocument(id);
  };
  const genRandomKey = () => {
    setKey(generateRandomKey())
  }
  const generateAutoNote = async () => {
    //console.log(currentDocument, "DOCUMENT");
    if (currentDocument == "") return;
    const postdata = {
      templates: propSettings.template,
      custom_prompt: propSettings.customInstruction,
      section_style: propSettings.style,
      dot_phrases: [],
      split_hpi_sections: false,
      pronouns: propSettings.pronoun,
      action: "NOTE",
      transcript: transcript || "",
    };
    //console.log(postdata);
    const req = await generateNote(postdata);
    //console.log("note here",JSON.stringify(req));
    //return;
    await updateEncounterDB(currentDocument, "summary", JSON.stringify(req));
    setActiveTab("note");
    setGNote(req);

    return req;
  };
  const regenerate = async () => {
    // console.log(req.response);
    //show loader
    try {
      setLoading(true);
      await generateAutoNote();
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("Unknown error occured");
    }
    //hide loader
  };
  const copyAllNote = () => {
    if (gnote) {
      let formattedText = '';
      formattedText += "**Subjective**" + "\n";
      formattedText += renderSubjective(gnote.subjective, true)?.toString() + "\n\n";
      formattedText += "**Objective**" + "\n";
      formattedText += renderObjective(gnote.objective, true).toString() + "\n\n";
      formattedText += "**Assessment**" + "\n";
      formattedText += renderSubjective(gnote.assessment, true)?.toString() + "\n\n";
      formattedText += "**Plan**" + "\n";
      formattedText += renderSubjective(gnote.plan, true)?.toString() + "\n\n";
      copyToClipboard(formattedText)
    }

  }
  return (
    <AuthProvider>
      <div className="relative flex">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          resetState={resetState}
          handleHistoryCardClick={handleHistoryCardClick}
          activeId={currentDocument}
          rename={setOpenRename}
        />

        <SaveModal isOpen={isOpen} onClose={onClose} />

        <LeftSideBar
          key={currentDocument}
          isLeftSidebarOpen={isLeftSidebarOpen}
          toggleLeftSidebar={toggleLeftSideBar}
          propSettings={propSettings}
          setSettings={setPropSettings}
          patientNote={patientNote}
          setPatientNote={setPatientNote}
          generate={generateAutoNote}
        />

        {/* Main Content */}
        <div
          className={`h-screen flex-1 relative ${isSidebarOpen ? "lg:ml-96" : ""
            } `}
        >
          {/* Header */}
          <div
            className={`bg-[#FAFAFA] shadow h-16 flex items-center justify-between px-4 ${isSidebarOpen ? "w-full" : ""
              }`}
          >
            {/* Button to toggle the sidebar */}
            {!isSidebarOpen && (
              <button className="text-gray-700" onClick={toggleSidebar}>
                <Image src={menu} alt="logo" width={30} height={30} />
              </button>
            )}

            {/* Tabs */}
            <div className="flex justify-center items-center flex-1">
              <div className="flex justify-center items-center bg-[#E5E8EC] rounded-full p-1 px-1">
                <div
                  className={`cursor-pointer mr-4 px-2 ${activeTab === "transcript"
                      ? "bg-[#a0c0e2] rounded-full py-2 px-4 text-black font-semibold"
                      : "text-gray-500"
                    }`}
                  onClick={() => setActiveTab("transcript")}
                >
                  Transcript
                </div>
                <div
                  className={`cursor-pointer px-2 ${activeTab === "note"
                      ? "bg-[#B7D3D6] rounded-full py-2 px-4 text-black font-semibold"
                      : "text-gray-500"
                    }`}
                  onClick={() => setActiveTab("note")}
                >
                  Note
                </div>
              </div>
            </div>

            {/* toggle leftside bar */}

            {activeTab === "note" && showNoteCards && (
              <div className="flex items-center">
                <Button
                  className="px-2 sm:px-6 border"
                  variant="light"
                  onClick={() => {
                    regenerate();
                  }}
                >
                  <h1 className=" ">Regenerate</h1>
                </Button>
                {
                  activeTab === "note" &&
                  <Button className=" px-6 hidden md:flex bg-[#007BFF]" onClick={() => copyAllNote()}>
                    <Image src={copy2} alt="copy" />
                    <h1 className="text-white font-semibold">Copy Note</h1>
                  </Button>
                }

                <button
                  onClick={toggleLeftSideBar}
                  type="button"
                  className="ml-4"
                >
                  <Image src={menu2} alt="" className="md:w-10 w-10" />
                </button>
              </div>
            )}
          </div>

          {/* Card Section */}
          {currentDocument != "" && (
            <PageData
              activeTab={activeTab}
              id={currentDocument}
              key={currentDocument + keyExtension}
              setActiveTab={setActiveTab}
              generateAutoNote={generateAutoNote}
              updateTranscript={setTranscript}
              gnote={gnote}
              setGNote={setGNote}
              rename={setOpenRename}
            />
          )}
        </div>
      </div>
      {isLoading && <Loader type={"FULL"} />}
      {isPaymentSuccess && <SubscibedModal isOpen={isPaymentSuccess} onClose={setPaymentSuccess} />}
      {openRename && <RenameModal isOpen={openRename} onClose={setOpenRename} id={currentDocument} refresher={genRandomKey} />}
    </AuthProvider>
  );
}

export default Index;
