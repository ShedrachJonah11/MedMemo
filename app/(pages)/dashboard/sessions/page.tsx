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
import { More, ArrowCircleLeft2, ArrowCircleRight2 } from "iconsax-react";
import { sessions } from "@/app/assests/data";

const Session = () => {
  const tableColumns = [
    {
      key: "session-no",
      label: "Session NO",
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
      key: "status",
      label: "Status",
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
          <p className="font-semibold text-xl text-[#343A40]">
            Recent sessions
          </p>
          <p className="text-sm text-[#71839B]">View all your sessions here </p>
        </div>
      </div>
    );
  }, []);

  const renderCell = useCallback((item: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "seesion-no":
        return (
          <p className="text-[#343A40] font-medium text-sm">{item.sessionNo}</p>
        );
      case "patient-name":
        return (
          <p className="text-[#71839B] font-normal text-sm">
            {item.patientName}
          </p>
        );
      case "duration":
        return (
          <p className="text-[#71839B] font-normal text-sm">{item.duration}</p>
        );

      case "status":
        if (item.status === "completed") {
          return <p className="text-[#248E2E]">{item.status}</p>;
        } else if (item.status === "processing") {
          return <p className="text-[#CB8E33]">{item.status}</p>;
        } else if (item.status === "error") {
          return <p className="text-[#CD0C0C]">{item.status}</p>;
        }
      case "action":
        return (
          <Button isIconOnly className="bg-transparent text-[#1EB564]">
            <More size="32" color="#343A40" />
          </Button>
        );

      default:
        return item.sessionNo;
    }
  }, []);

  return (
    <>
      <section className="w-full">
        {sessions ? (
          <>
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
                <TableBody items={sessions}>
                  {(item: any) => (
                    <TableRow key={item.sessionNo}>
                      {(columnKey) => (
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="my-6 flex justify-center items-center gap-5">
              <ArrowCircleLeft2 size="40" color="#007BFF" variant="Outline" />

              <div className="flex justify-center items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-[#007BFF] text-white flex justify-center items-center text-[14px] font-[600]">
                  01
                </div>
                <div className="h-10 w-10 rounded-full text-[#343A40] bg-white flex justify-center items-center text-[14px] font-[600]">
                  02
                </div>
                <div className="h-10 w-10 rounded-full text-[#343A40] bg-white flex justify-center items-center text-[14px] font-[600]">
                  03
                </div>
                <div className="h-10 w-10 rounded-full text-[#343A40] bg-white flex justify-center items-center text-[14px] font-[600]">
                  04
                </div>
                <div className="h-10 w-10 rounded-full text-[#343A40] bg-white flex justify-center items-center text-[14px] font-[600]">
                  05
                </div>
              </div>
              <ArrowCircleRight2 size="40" color="#007BFF" variant="Outline" />
            </div>
          </>
        ) : (
          <div>
            <div className="flex justify-between w-full p-4 bg-white rounded-2xl">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-xl text-[#343A40]">
                  Recent sessions
                </p>
                <p className="text-sm text-[#71839B]">
                  View all your sessions here{" "}
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center flex-col mt-[150px] gap-3">
              <svg
                width="104"
                height="104"
                viewBox="0 0 104 104"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="104" height="104" rx="52" fill="#E9ECEF" />
                <path
                  d="M68.544 37.7048L71.4425 34.5155C71.9009 33.9987 72.1371 33.3222 72.1 32.6324C72.0629 31.9427 71.7554 31.2954 71.2443 30.8308C70.7331 30.3662 70.0594 30.1219 69.3692 30.1507C68.6791 30.1796 68.0281 30.4793 67.5575 30.9848L64.6612 34.1698C60.3017 31.0949 54.9688 29.7191 49.6658 30.3013C44.3628 30.8834 39.4553 33.3834 35.8667 37.3309C32.2781 41.2783 30.2557 46.4011 30.1801 51.7354C30.1044 57.0697 31.9807 62.2478 35.4559 66.2955L32.5575 69.4848C32.3208 69.7391 32.1369 70.0378 32.0165 70.3636C31.8961 70.6895 31.8416 71.036 31.8561 71.383C31.8706 71.7301 31.9538 72.0708 32.101 72.3855C32.2482 72.7001 32.4563 72.9825 32.7134 73.2161C32.9704 73.4497 33.2713 73.63 33.5986 73.7465C33.9258 73.8629 34.273 73.9133 34.6198 73.8946C34.9667 73.876 35.3064 73.7887 35.6193 73.6377C35.9322 73.4868 36.212 73.2753 36.4425 73.0155L39.3387 69.8305C43.6983 72.9054 49.0312 74.2812 54.3342 73.699C59.6372 73.1169 64.5446 70.6169 68.1332 66.6694C71.7219 62.722 73.7443 57.5992 73.8199 52.2649C73.8956 46.9306 72.0193 41.7525 68.544 37.7048ZM35.375 52.0001C35.3725 49.003 36.1808 46.061 37.7145 43.4859C39.2481 40.9108 41.4498 38.7987 44.0863 37.3732C46.7229 35.9478 49.6959 35.2622 52.6904 35.3891C55.6848 35.5161 58.5892 36.4508 61.0956 38.0942L39.0215 62.3755C36.658 59.4343 35.3713 55.7733 35.375 52.0001ZM52 68.6251C48.7673 68.6285 45.6048 67.6831 42.9044 65.9061L64.9784 41.6248C66.9368 44.0686 68.1646 47.0161 68.5201 50.1275C68.8756 53.239 68.3444 56.3875 66.9876 59.21C65.6309 62.0325 63.504 64.414 60.8522 66.0799C58.2003 67.7458 55.1316 68.6281 52 68.6251Z"
                  fill="#007BFF"
                />
              </svg>

              <div className="flex justify-center items-center flex-col">
                <p className="text-[20px] font-[600] text-[#343A40] mb-1">
                  Nothing here yet
                </p>
                <p className="text-[#71839B] text-[14px] font-[500]">
                  Your recent sessions will appear here
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Session;
