import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../public/Logo.svg";
import arrowback from "../public/indent-decrease.svg";
import plus from "../public/plus.svg";
import star from "../public/stars-02.svg";
import trash from "../public/trash.svg";
import {
  Avatar,
  Button,
  Card,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
  CardBody,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import DeleteModal from "./DeleteModal";
import PaymentPlanModal from "./PaymentPlanModal";
import "../app/style.css";
import settings from "../public/settings.svg";
import help from "../public/help.svg";
import tag from "../public/tag-user.svg";
import sign from "../public/sign out.svg";
import edit from "../public/edit-2.svg";
import {
  getJSONdata,
  getPlan,
  isPlusUser,
  logOut,
} from "@/application/utils/functions";
import {
  deleteEncounterDB,
  editPreference,
  getAllEncouterDB,
  getPreference,
} from "@/application/database/database";
//import avatar_img from "../public/avatar.svg";
import { getUserProfile } from "@/application/api/apis";

interface SliderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  resetState: () => void;
  handleHistoryCardClick: (id: any) => void;
  activeId: any;
  rename: any;
}

const Sidebar: React.FC<SliderProps> = ({
  isSidebarOpen,
  toggleSidebar,
  resetState,
  handleHistoryCardClick,
  activeId,
  rename,
}) => {
  const router = useRouter();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const {
    isOpen: isPaymentModalOpen,
    onOpen: onPaymentModalOpen,
    onClose: onPaymentModalClose,
  } = useDisclosure();
  const [hoveredStates, setHoveredStates] = useState<boolean[]>([]);
  const [userData, setUserData] = useState<any>();
  const [documents, setDocuments] = useState<any>([]);
  const [dropdownValue, setDropdownValue] = useState("");
  const [dropdownValueStyle, setDropdownValueStyle] = useState("");
  const [initPref, setInitPref] = useState<any>();

  const getInitials = (firstName: string, lastName: string) => {
    // Check if both first name and last name are provided and are non-empty strings
    if (
      typeof firstName !== "string" ||
      !firstName.trim() ||
      typeof lastName !== "string" ||
      !lastName.trim()
    ) {
      return "";
    }

    const firstInitial = firstName.trim().charAt(0);
    const lastInitial = lastName.trim().charAt(0);

    // Combine the first initial and last initial to form the initials
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const avatar_img = "avatar.png";
  const reLoadProfile = async () => {
    try {
      const profile = await getUserProfile();
      //console.log(profile)
      setUserData(profile);
    } catch (e) {}
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDropdownValue(event.target.value);

    if (initPref) {
      initPref.template = event.target.value;
      setInitPref(initPref);
      editPreference(initPref);
    }
  };
  const handleDropdownChangeStyle = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDropdownValueStyle(event.target.value);

    if (initPref) {
      initPref.style = event.target.value;
      setInitPref(initPref);
      //console.log(initPref)
      editPreference(initPref);
    }
  };

  const [isAccountPopoverOpen, setAccountPopoverOpen] =
    useState<boolean>(false);
  const [isPreferencesPopoverOpen, setPreferencesPopoverOpen] =
    useState<boolean>(false);
  const [isPopoverEnabled, setPopoverEnabled] = useState<boolean>(true); // New state to control popover button

  // Event handler to toggle account popover
  const toggleAccountPopover = () => {
    setAccountPopoverOpen(!isAccountPopoverOpen);
  };

  const togglePreferencesPopover = () => {
    setPreferencesPopoverOpen(!isPreferencesPopoverOpen);
  };

  const handleResetState = () => {
    resetState();
    loadDocuments();
  };

  const handleHistoryClick = (id: any) => {
    handleHistoryCardClick(id);
  };

  useEffect(() => {
    if (window) {
      setUserData(getJSONdata("profile"));
    }
  }, []);
  const logoutpage = () => {
    logOut();
    router.push("auth/login");
  };
  const loadPreferences = async () => {
    try {
      const pref = await getPreference();
      //console.log(settings)
      if (pref.settings) {
        setInitPref(pref.settings);
        setDropdownValue(pref.settings.template);
        setDropdownValueStyle(pref.settings.style);
      }
    } catch (e) {
      setTimeout(() => loadPreferences(), 2000);
    }
  };
  useEffect(() => {
    loadPreferences();
  }, []);
  const groupedDocuments: any = {};
  documents.forEach((doc: any) => {
    const date = new Date(doc.date).toDateString();
    if (!groupedDocuments[date]) {
      groupedDocuments[date] = [];
    }
    groupedDocuments[date].push(doc);
  });

  const loadDocuments = async () => {
    try {
      const alldoc = await getAllEncouterDB();
      //console.log(alldoc);
      setDocuments(alldoc);
      return alldoc;
    } catch (e) {
      setDocuments([]);
      return [];
    }
  };

  useEffect(() => {
    const loaddoc = async () => {
      const docs = await loadDocuments();
      if (docs.length > 0) {
        handleHistoryClick(docs[docs.length - 1].id);
      } else {
        handleResetState();
      }
    };
    loaddoc();
  }, []);

  useEffect(() => {
    setHoveredStates(new Array(documents.length).fill(false));
  }, [documents]);

  const handleMouseEnter = (index: number) => {
    setHoveredStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = true;
      return newStates;
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };
  const deleteRecord = async () => {
    //console.log(activeId);
    await deleteEncounterDB(activeId);
    loadDocuments();
  };

  const handleCancelClick = () => {
    setPopoverEnabled(false); // Disable the popover button when "Cancel" is clicked
  };
  useEffect(() => {
    reLoadProfile();
  }, []);
  return (
    <div
      className={`sidebar bg-[#FAFAFA] h-full w-96 fixed top-0 left-0 z-20 transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
      } flex flex-col `}
      style={{ maxHeight: "100vh", overflowY: "auto" }}
    >
      {/* Sidebar Content */}
      <div className="sidebar-content p-4 flex justify-between">
        <Link href="../">
          <Image src={logo} alt="logo" width={150} height={150} />
        </Link>
        <button className="text-gray-700" onClick={toggleSidebar}>
          <Image src={arrowback} alt="logo" width={30} height={30} />
        </button>
      </div>
      {/* add document button  */}
      <div className="px-4 mt-2">
        <Button
          size="lg"
          className="border-1 border-[#ccc] bg-white w-full  flex justify-center items-center rounded-xl"
          onClick={handleResetState}
        >
          <Image src={plus} alt="plus" className="" />
          <h1 className="text-center font-semibold">New Documentation</h1>
        </Button>

        {/* History Cards */}
        {Object.keys(groupedDocuments)
          .reverse()
          .map((date) => (
            <div key={date} className="mt-6">
              <h4 className="font-regular text-[#8B909A] mt-4 text-sm">
                {date}
              </h4>
              {groupedDocuments[date]
                .reverse()
                .map((document: any, index: number) => (
                  <button
                    key={document.id} // Assuming each document has a unique ID
                    className={`bg-[#E5E8EC] rounded-xl h-16 w-full p-3 mt-4 ${
                      hoveredStates[index] ? "bg-gray-300" : ""
                    } ${activeId === document.id ? "active" : ""}`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    onClick={() => {
                      handleHistoryClick(document.id);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h1
                          className="font-normal mr-6 text-left"
                          id={"history-" + document.id}
                        >
                          {document.title}
                        </h1>
                        <p className="font-light text-[#808080] text-sm text-left">
                          {document.date} . {document?.duration || ""}
                        </p>
                      </div>

                      {hoveredStates[index] && isPopoverEnabled && (
                        <div>
                          <button type="button" onClick={() => rename(true)}>
                            <Image
                              src={edit}
                              alt="trash"
                              style={{ marginRight: "10px" }}
                            />
                          </button>
                          <button type="button" onClick={onDeleteModalOpen}>
                            <Image src={trash} alt="trash" />
                          </button>
                        </div>
                      )}
                      <DeleteModal
                        isOpen={isDeleteModalOpen}
                        onClose={onDeleteModalClose}
                        callback={deleteRecord}
                      />
                    </div>
                  </button>
                ))}
            </div>
          ))}
      </div>

      {/* Bottom section */}
      <div className="flex flex-col mt-auto p-2 bg-[#FAFAFA]  sticky bottom-0 z-50">
        <Popover
          showArrow
          placement="top"
          classNames={{
            base: ["before:bg-default-200"],
            content: [
              "py-3 px-4 border border-default-200",
              "bg-gradient-to-br from-white to-default-300",
              "dark:from-default-100 dark:to-default-50",
            ],
          }}
        >
          <PopoverTrigger>
            <Button className="w-full flex py-8 px-2 bg-[#fff] rounded-xl justify-between items-center ">
              <div className="items-center">
                <div className="flex items-center mt-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300">
                    <div className="text-gray-600 text-lg">
                      {getInitials(
                        userData?.first_name || "",
                        userData?.last_name || ""
                      )}
                    </div>
                  </div>
                  <div className="flex ml-4">
                    <p className="mb-1 font-medium mr-2">
                      {userData
                        ? userData.first_name
                          ? `${userData.first_name} ${userData.last_name}`
                          : "Guest User"
                        : "Guest User"}
                    </p>
                    <div className=" border px-2 border-blue-400 b-t-2 rounded-lg bg-blue-200 ">
                      <p className="text-[#0058FA]">
                        {getPlan(userData?.roles || [])}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="m5.157 13.069l4.611-4.685a.546.546 0 0 0 0-.768L5.158 2.93a.552.552 0 0 1 0-.771a.53.53 0 0 1 .759 0l4.61 4.684a1.65 1.65 0 0 1 0 2.312l-4.61 4.684a.53.53 0 0 1-.76 0a.552.552 0 0 1 0-.771"
                  />
                </svg>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {(titleProps) => (
              <div>
                {isAccountPopoverOpen ? (
                  <div className="w-full">
                    <div className="mb-3 flex items-center justify-between">
                      <h1 className="text-lg font-medium">Account</h1>
                      <button onClick={toggleAccountPopover}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18 6L6 18M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <Divider className="mb-4" />

                    <Card
                      radius="lg"
                      className="w-full md:w-[300px] rounded-full bg-[#FAF9F6] "
                    >
                      <CardBody>
                        <p className="text-center">{userData?.email}</p>
                      </CardBody>
                    </Card>
                    <div className="mt-6 mb-2">
                      <h4 className="text-[#008080] text-xs font-medium">
                        SUBSCRIPTION
                      </h4>
                    </div>
                    <div className=" border px-2 w-12 border-blue-400 b-t-2 rounded-lg mb-2 bg-blue-200 ">
                      <p className="text-[#0058FA]">
                        {getPlan(userData?.roles || [])}
                      </p>
                    </div>
                    {getPlan(userData?.roles || []) === "Free" && (
                      <div className="mb-6">
                        <p className="text-xs font-extralight">
                          Limited to 30 conversations a month
                        </p>
                      </div>
                    )}

                    {getPlan(userData?.roles || []) === "Free" && (
                      <Button
                        onClick={onPaymentModalOpen}
                        className="mb-6 bg-[#008080] text-white"
                      >
                        Upgrade
                      </Button>
                    )}
                  </div>
                ) : isPreferencesPopoverOpen ? (
                  <div className="w-[320px]">
                    <div className="mb-3 flex items-center justify-between">
                      <h1 className="text-lg font-medium">Preferences</h1>
                      <button onClick={togglePreferencesPopover}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18 6L6 18M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <Divider className="mb-4" />

                    <Card className="bg-[#FAF9F6] mb-4">
                      <CardBody>
                        <h1 className="font-medium mb-6 text-lg">
                          Advanced Options
                        </h1>
                        <p className="text-xs mb-2 font-medium text-[#008080]">
                          TEMPLATE
                        </p>
                        <select
                          className="w-full p-4 bg-white rounded-md mb-4"
                          value={dropdownValue}
                          onChange={handleDropdownChange}
                        >
                          <option value="SOAP">SOAP</option>
                          <option value="DETAILED_SECTIONS">
                            DETAILED_SECTIONS
                          </option>
                          <option value="ASSESSMENT_PLAN">
                            ASSESSMENT_PLAN
                          </option>
                          <option value="SOAP_ASSESSMENT_PLAN">
                            SOAP_ASSESSMENT_PLAN
                          </option>
                          <option value="SOAP_ASSESSMENT_PLAN_PE_TEST">
                            SOAP_ASSESSMENT_PLAN_PE_TEST
                          </option>
                          <option value="APSO">APSO</option>
                          <option value="SOAP_PSYCHIATRIC">
                            SOAP_PSYCHIATRIC
                          </option>
                          <option value="PSYCHIATRIC_MULTIPLE_SECTIONS">
                            PSYCHIATRIC_MULTIPLE_SECTIONS
                          </option>
                          <option value="DIET">DIET</option>
                          <option value="CARDIOLOGY">CARDIOLOGY</option>
                          <option value="PSYCHOLOGY">PSYCHOLOGY</option>
                          <option value="LACTATION">LACTATION</option>
                        </select>

                        <p className="text-xs mb-2 font-medium text-[#008080]">
                          STYLE
                        </p>
                        <select
                          className="w-full p-4 bg-white rounded-xl mb-4"
                          name=""
                          id=""
                          value={dropdownValueStyle}
                          onChange={handleDropdownChangeStyle}
                        >
                          <option value="AUTO">AUTO</option>
                          <option value="BULLET_POINTS">BULLET_POINTS</option>
                          <option value="PARAGRAPH">PARAGRAPH</option>
                        </select>
                      </CardBody>
                    </Card>
                  </div>
                ) : (
                  <div className="w-[290px]">
                    <div className="px-1 py-2 flex gap-2">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300">
                        <div className="text-gray-600 text-lg">
                          {getInitials(
                            userData?.first_name || "",
                            userData?.last_name || ""
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex gap-2">
                          <h3 className="text-sm font-bold" {...titleProps}>
                            {userData
                              ? userData.first_name
                                ? `${userData.first_name} ${userData.last_name}`
                                : "Guest User"
                              : "Guest User"}
                          </h3>
                          <div className="border px-2 border-blue-400 b-t-2 rounded-lg bg-blue-200">
                            <p className="text-[#0058FA]">
                              {getPlan(userData?.roles || [])}
                            </p>
                          </div>
                        </div>
                        <p className="text-tiny">{userData?.email}</p>
                      </div>
                      {/* <button className="mb-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18 6L6 18M6 6l12 12"
                          />
                        </svg>
                      </button> */}
                    </div>
                    <Divider />
                    <div>
                      <button
                        type="button"
                        className="flex p-2 items-center mt-2 mb-4"
                        onClick={toggleAccountPopover}
                      >
                        <Image
                          src={settings}
                          alt=""
                          width={25}
                          height={25}
                          className="mr-4"
                        />
                        <h1 className="text-base font-medium">Account</h1>
                      </button>

                      <button
                        type="button"
                        className="flex p-2 items-center mt-2 mb-4"
                        onClick={togglePreferencesPopover}
                      >
                        <Image
                          src={tag}
                          alt=""
                          width={25}
                          height={25}
                          className="mr-4"
                        />
                        <h1 className="text-base font-medium">Preferences</h1>
                      </button>
                      <button
                        type="button"
                        className="flex p-2 items-center mb-4"
                      >
                        <Image
                          src={help}
                          alt=""
                          width={25}
                          height={25}
                          className="mr-4"
                        />
                        <h1 className="text-base font-medium">Contact Us</h1>
                      </button>
                      <Divider />
                      <button
                        type="button"
                        className="flex p-2 items-center mb-4"
                        onClick={() => {
                          logoutpage();
                        }}
                      >
                        <Image
                          src={sign}
                          alt=""
                          width={25}
                          height={25}
                          className="mr-4"
                        />
                        <h1 className="text-base font-medium">Sign Out</h1>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </PopoverContent>
        </Popover>
        {/* Profile button */}

        {!isPlusUser(true) && (
          <button
            type="button"
            onClick={onPaymentModalOpen}
            className="w-full px-2 py-2 mt-4 rounded-xl upgrade-button"
          >
            <div className="flex items-center">
              <div className="w-14 h-14 justify-center items-center flex bg-[#D1FADF] mr-2 rounded-full">
                <Image src={star} alt="star" />
              </div>
              <div className="text-start ">
                <p className="mb-1 font-medium">Upgrade Plan</p>
                <p className="font-light text-sm">
                  Upgrade for access to additional features
                </p>
              </div>
            </div>
          </button>
        )}

        <PaymentPlanModal
          isOpen={isPaymentModalOpen}
          onClose={onPaymentModalClose}
        />
      </div>
    </div>
  );
};

export default Sidebar;
