/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  Chip,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { More, CloseCircle, Calendar2, Call, Location } from "iconsax-react";
import { patients } from "@/app/assests/data";
import Drawer from "@/app/components/Drawer";

const Patients = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("1");

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const tableColumns = [
    {
      key: "patient-id",
      label: "Patient ID",
    },
    {
      key: "patient-name",
      label: "Patient Name",
    },
    {
      key: "duration",
      label: "Duration",
    },
    {
      key: "gender",
      label: "Gender",
    },
    {
      key: "action",
      label: "",
    },
  ];

  const tableTopContent = useMemo(() => {
    return (
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-xl text-[#343A40]">Patients</p>
          <p className="text-sm text-[#71839B]">
            All registered patients will be shown here{" "}
          </p>
        </div>
        <select
          name=""
          id=""
          className="border-[1px] border-[#E9ECEF] rounded-[2px] text-[14px] flex justify-center items-center h-[28px] w-[64px]"
        >
          <option value="">A-Z</option>
        </select>
      </div>
    );
  }, []);

  const renderCell = useCallback(
    (item: any, columnKey: React.Key) => {
      switch (columnKey) {
        case "patient-id":
          return (
            <p className="text-[#343A40] font-medium text-sm">
              {item.patientId}
            </p>
          );
        case "patient-name":
          return (
            <p className="text-[#71839B] font-normal text-sm">
              {item.patientName}
            </p>
          );
        case "duration":
          return (
            <p className="text-[#71839B] font-normal text-sm">
              {item.duration}
            </p>
          );

        case "gender":
          return (
            <p className="text-[#71839B] font-normal text-sm">{item.gender}</p>
          );
        case "action":
          return (
            <Button
              isIconOnly
              className="bg-transparent text-[#1EB564]"
              onClick={toggleDrawer}
            >
              <More size="32" color="#343A40" />
            </Button>
          );

        default:
          return item.patientId;
      }
    },
    [toggleDrawer]
  );

  return (
    <>
      <section className="w-full">
        <div className="w-full p-4 bg-white rounded-2xl">
          <Table
            shadow="none"
            aria-label="last transactions"
            topContent={tableTopContent}
            classNames={{
              th: ["bg-white", "text-[#141417]"],
              thead: ["text-default-500"],
            }}
          >
            <TableHeader columns={tableColumns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={patients}>
              {(item: any) => (
                <TableRow key={item.patientId}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer}>
          <div className="flex justify-between items-center gap-[68px]">
            <div className="flex justify-start items-center gap-4">
              <h1 className="text-[24px] font-[600] text-[#343A40]">
                John Doe
              </h1>
              <p className="text-[12px] font-[500] text-[#71839B]">
                Registered on 14-06-2024
              </p>
            </div>

            <button onClick={toggleDrawer}>
              <CloseCircle size="24" color="#343A40" variant="Outline" />
            </button>
          </div>
          <div className="mt-1 mb-4">
            <p className="text-[14px] text-[#71839B] font-[500]">
              ID <span className="text-[#343A40]">3104A</span>
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 mb-[24px]">
            <div className="flex justify-start items-center gap-2">
              <Calendar2 size="16" color="#71839B" variant="Outline" />
              <p className="text-[#343A40] text-[14px] font-[500]">
                14/05/2001
              </p>
            </div>
            <div className="flex justify-start items-center gap-2">
              <Call size="16" color="#71839B" variant="Outline" />
              <p className="text-[#343A40] text-[14px] font-[500]">
                +234-9065458543
              </p>
            </div>
            <div className="flex justify-start items-center gap-2">
              <Location size="16" color="#71839B" variant="Outline" />
              <p className="text-[#343A40] text-[14px] font-[500]">
                No 2. Teal crescent
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <button className="w-[50%] h-[32px] font-[600] text-[14px] text-[#007BFF] border-[3px] border-[#007BFF] flex justify-center items-center rounded-[4px]">
              Edit Patient
            </button>
            <button className="w-[50%] h-[32px] font-[600] text-[14px] text-[white] bg-[#007BFF] border-[3px] border-[#007BFF] flex justify-center items-center rounded-[4px]">
              Begin Session{" "}
            </button>
          </div>

          <div className="flex justify-center items-center gap-3 w-full my-[32px]">
            <p
              onClick={() => setActiveNav("1")}
              className={`${
                activeNav === "1"
                  ? "bg-white text-[#343A40] border-b-[2px] border-b-primary"
                  : "backdrop-blur mx-2 text-[#71839B]"
              } px-4 w-1/2 transition-all ease-out duration-200  hover:scale-95 text-[16px] font-[500] cursor-pointer text-center pb-2`}
            >
              Medical Info
            </p>
            <p
              onClick={() => setActiveNav("2")}
              className={`${
                activeNav === "2"
                  ? "bg-white text-[#343A40] border-b-[2px] border-b-primary"
                  : "backdrop-blur mx-2 text-[#71839B]"
              } px-4 w-1/2 transition-all ease-out duration-200  hover:scale-95 text-[16px] font-[500] cursor-pointer text-center pb-2`}
            >
              Sessions
            </p>
          </div>

          {activeNav === "1" && (
            <div>
              <div className="flex flex-col items-start gap-4">
                <div>
                  <p className="text-[12px] font-[500] text-[#71839B] mb-1">
                    Medical history
                  </p>
                  <div className="font-[500] text-[14px] text-[#141417]">
                    <p>
                      Hypertension: Diagnosed in 2010, currently managed with
                      medication.
                    </p>
                    <p>
                      Diabetes Type 2: Diagnosed in 2015, controlled through
                      diet and medication.
                    </p>
                    <p>
                      Asthma: Diagnosed in childhood, requires occasional use of
                      an inhaler.
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-[500] text-[#71839B] mb-1">
                    Allergies
                  </p>
                  <div className="font-[500] text-[14px] text-[#141417]">
                    <p>Penicillin: Causes rash and itching.</p>
                    <p>
                      Peanuts: Causes anaphylactic reaction, carries an EpiPen.
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] font-[500] text-[#71839B] mb-1">
                    Emergency contact
                  </p>
                  <div className="font-[500] text-[14px] text-[#141417]">
                    <p>Eve: +234-9025455454</p>
                  </div>
                </div>
              </div>
              <div className="mt-[32px] flex justify-center items-center">
                <button className="text-[#CD0C0C] text-[15px] font-[500]">
                  Delete Patient
                </button>
              </div>
            </div>
          )}

          {activeNav === "2" && (
            <div className="flex flex-col items-start gap-[24px] w-full">
              <div className="w-full">
                <p className="pb-4 text-[12px] font-[400]">Today</p>
                <div className="flex flex-col w-full gap-3 items-start">
                  <div className="px-3 py-2 flex justify-between items-center w-full bg-[#EDEDED] rounded-[4px]">
                    <div className="flex flex-col items-start gap-1">
                      <p className="text-[14px] font-[600]">3104A</p>
                      <div className="flex justify-start items-center gap-1">
                        <p className="text-[14px] font-[400] text-[#71839B]">
                          11:50PM
                        </p>
                        <div className="bg-[#343A40] h-[3px] w-[3px] rounded-full">
                          {" "}
                        </div>
                        <p className="text-[14px] font-[400] text-[#71839B]">
                          2 Mins long
                        </p>
                      </div>
                    </div>

                    <More />
                  </div>

                  <div className="px-3 py-2 flex justify-between items-center w-full bg-[#EDEDED] rounded-[4px]">
                    <div className="flex flex-col items-start gap-1">
                      <p className="text-[14px] font-[600]">3104A</p>
                      <div className="flex justify-start items-center gap-1">
                        <p className="text-[14px] font-[400] text-[#71839B]">
                          11:50PM
                        </p>
                        <div className="bg-[#343A40] h-[3px] w-[3px] rounded-full">
                          {" "}
                        </div>
                        <p className="text-[14px] font-[400] text-[#71839B]">
                          2 Mins long
                        </p>
                      </div>
                    </div>

                    <More />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <p className="pb-4 text-[12px] font-[400]">Yesterday</p>
                <div className="flex flex-col w-full gap-3 items-start">
                  <div className="px-3 py-2 flex justify-between items-center w-full bg-[#EDEDED] rounded-[4px]">
                    <div className="flex flex-col items-start gap-1">
                      <p className="text-[14px] font-[600]">3104A</p>
                      <div className="flex justify-start items-center gap-1">
                        <p className="text-[14px] font-[400] text-[#71839B]">
                          11:50PM
                        </p>
                        <div className="bg-[#343A40] h-[3px] w-[3px] rounded-full">
                          {" "}
                        </div>
                        <p className="text-[14px] font-[400] text-[#71839B]">
                          2 Mins long
                        </p>
                      </div>
                    </div>

                    <More />
                  </div>

                  <div className="px-3 py-2 flex justify-between items-center w-full bg-[#EDEDED] rounded-[4px]">
                    <div className="flex flex-col items-start gap-1">
                      <p className="text-[14px] font-[600]">3104A</p>
                      <div className="flex justify-start items-center gap-1">
                        <p className="text-[14px] font-[400] text-[#71839B]">
                          11:50PM
                        </p>
                        <div className="bg-[#343A40] h-[3px] w-[3px] rounded-full">
                          {" "}
                        </div>
                        <p className="text-[14px] font-[400] text-[#71839B]">
                          2 Mins long
                        </p>
                      </div>
                    </div>

                    <More />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Drawer>
      </section>
    </>
  );
};

export default Patients;
