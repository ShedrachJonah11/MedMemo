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
import { More, CloseCircle } from "iconsax-react";
import { patients } from "@/app/assests/data";
import Drawer from "@/app/components/Drawer";

const Patients = () => {

      const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
      <div className="flex justify-between py-3">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-xl text-[#343A40]">Patients</p>
          <p className="text-sm text-[#71839B]">
            All registered patients will be shown here{" "}
          </p>
        </div>
        <select name="" id="" className="border-[1px] border-[#E9ECEF] rounded-[2px] text-[14px] flex justify-center items-center h-[28px] w-[64px]">
          <option value="">A-Z</option>
        </select>
      </div>
    );
  }, []);

    const renderCell = useCallback((item: any, columnKey: React.Key) => {
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
            <p className="text-[#71839B] font-normal text-sm">
              {item.gender}
            </p>
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
    }, []);

  return (
    <>
      <section className="w-full">
        <div className="w-full p-5 bg-white rounded-2xl">
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
          <div className="mt-1">
            <p className="text-[14px] text-[#71839B] font-[500]">
              ID <span className="text-[#343A40]">3104A</span>
            </p>
          </div>
        </Drawer>
      </section>
    </>
  );
};

export default Patients;
