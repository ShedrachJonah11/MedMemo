"use client";
import React, { useCallback, useMemo } from "react";
import { chartData, sessions } from "@/app/assests/data";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  
} from "recharts";
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
  Link
} from "@nextui-org/react";
import { Bullet } from "@/app/components/bullet";
import { HiDotsHorizontal, HiDotsVertical } from "react-icons/hi";
import { More } from "iconsax-react";


function Dashboard() {
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
const CustomizedCursor=()=>{
  return (
    <div className="block">
      <div className="group absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-white bg-purple-800">
        <div className="rounded-sm bg-black py-1 px-2">
          <p className="whitespace-nowrap">This is a fancy tooltip.</p>
        </div>
        <div className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
      </div>
    </div>
  );
}
  const formatYAxis = (tickItem: any) => {
    if (tickItem >= 1000) {
      return `${(tickItem / 1000).toFixed(1)}k`;
    }
    return tickItem;
  };
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="block">
            <div className="group   z-50 flex  flex-col items-center rounded-lg text-center text-sm text-white bg-transparent">
              <div className="rounded-md bg-[#007BFF] py-1 px-2">
                <p className="whitespace-nowrap">{payload[0].value}</p>
              </div>
              <div className="h-0 -top-1 relative w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-[#007BFF]"></div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

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
  const tableTopContent = useMemo(() => {
    return (
      <div className="flex justify-between py-3">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-xl text-[#343A40]">
            Recent sessions
          </p>
          <p className="text-sm text-[#71839B]">
            Your recent sessions will appear here
          </p>
        </div>
        <Button as={Link} href="/records" isIconOnly className="bg-transparent text-[#007BFF] w-[100px]">
          View all
        </Button>
      </div>
    );
  }, []);
  return (
    <div className="w-full flex flex-col gap-5 pb-5">
      <section className="flex md:flex-row flex-col justify-normal gap-5 w-full">
        <div className="w-full bg-white p-1 rounded-2xl">
          <div className="flex justify-between items-center px-3 pt-2">
            <span className="text-xl font-semibold text-[#343A40]">
              Total number of patients
            </span>
            <div className="flex gap-3 justify-normal flex-wrap">
              <Select
                radius="sm"
                className="w-[120px] bg-[#E6F2FF] py-0 shadow-none  rounded-lg"
                placeholder="Select category"
                variant="flat"
                aria-label="filter select"
                classNames={{
                  base: ["data-[hover=true]:text-[#E6F2FF]"],
                  trigger: [
                    "bg-[#E6F2FF] rounded-md",
                    "data-focus-[within=true]:bg-[#E6F2FF]",
                    "data-[hover=true]:bg-[#E6F2FF]",
                    "group-data-[focus=true]:bg-[#E6F2FF]",
                  ],
                  listbox: ["px-0", "py-1", "bg-[#E6F2FF]"],
                  listboxWrapper: "rounded-sm p-0 bg-[#E6F2FF]",
                  mainWrapper: "bg-[#E6F2FF] data-[hover=true]:bg-[#E6F2FF]",
                  popoverContent:
                    "bg-[#E6F2FF] rounded-sm data-[hover=true]:bg-[#E6F2FF]",
                  innerWrapper:
                    "bg-[#E6F2FF] rounded-sm data-[hover=true]:bg-[#E6F2FF]",
                }}
                popoverProps={{
                  classNames: {
                    base: "before:bg-default-200",
                    content:
                      " p-1 rounded-sm border-divider bg-[#E6F2FF] data-[hover=true]:bg-[#E6F2FF]",
                  },
                }}
                defaultSelectedKeys={["All-time"]}
              >
                <SelectItem
                  classNames={{
                    base: "data-[hover=true]:bg-[#E6F2FF]",
                  }}
                  key={"All-time"}
                  className="text-xs"
                >
                  All time
                </SelectItem>
              </Select>
              <Button className="bg-transparent text-[#007BFF] ">
                + Add new patient
              </Button>
            </div>
          </div>
          <ResponsiveContainer
            width={"100%"}
            height={332}
            className="bg-white  pr-2 py-3 text-sm"
          >
            <LineChart
              className="w-full h-full"
              data={chartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis
                width={50}
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={<CustomizedCursor />}
                active={true}
              />
              <Line
                type="monotone"
                dataKey="patients"
                stroke="#007BFF"
                strokeWidth={4}
                dot={false}
                activeDot={{
                  stroke: "#007BFF",
                  strokeWidth: 2,
                  r: 8,
                  fill: "white",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full flex flex-col gap-5">
          <div className="p-5 rounded-2xl flex flex-col gap-2 bg-white min-h-[156px]">
            <p className="text-xl font-semibold text-[#343A40]">
              Patient breakdown
            </p>
            <div className="flex gap-4 justify-normal flex-wrap">
              <div className="w-[92px] h-[92px] rounded-[92px] flex flex-col gap-1 justify-center items-center text-center bg-[#007BFF]">
                <span className="text-2xl text-white font-semibold">485</span>
                <span className="text-sm font-medium text-white">Total</span>
              </div>
              <div className="w-[92px] h-[92px] rounded-[92px] flex flex-col gap-1 justify-center items-center text-center bg-[#6A3C1A]">
                <span className="text-2xl text-white font-semibold">150</span>
                <span className="text-sm font-medium text-white">Males</span>
              </div>
              <div className="w-[92px] h-[92px] rounded-[92px] flex flex-col gap-1 justify-center items-center text-center bg-[#BF24CC]">
                <span className="text-2xl text-white font-semibold">185</span>
                <span className="text-sm font-medium text-white">Females</span>
              </div>
              <div className="w-[92px] h-[92px] rounded-[92px] flex flex-col gap-1 justify-center items-center text-center bg-[#00967B]">
                <span className="text-2xl text-white font-semibold">150</span>
                <span className="text-sm font-medium text-white">Others</span>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-2xl flex flex-col gap-2 bg-white">
            <p className="text-xl font-semibold text-[#343A40]">
              Preferred recording styles
            </p>
            <p>Edit the styles to suit your preferences</p>
            <Select
              size="md"
              radius="md"
              className="w-full bg-white shadow-none border-1 rounded-lg h-[60px]"
              label="Templates"
              labelPlacement="inside"
              variant="flat"
              aria-label="Templates"
              classNames={{
                trigger: [
                  "bg-white",
                  "data-focus-[within=true]:bg-white",
                  "data-[hover=true]:bg-white",
                  "group-data-[focus=true]:bg-white",
                ],
                label: "pl-10",
              }}
              startContent={<Bullet color="#004085" />}
              defaultSelectedKeys={["SOAP"]}
            >
              <SelectItem key={"SOAP"}>SOAP</SelectItem>
            </Select>
            <Select
              size="md"
              radius="md"
              className="w-full bg-white shadow-none border-1 rounded-lg h-[60px]"
              label="Style"
              variant="flat"
              labelPlacement="inside"
              aria-label="Style"
              classNames={{
                trigger: [
                  "bg-white",
                  "data-focus-[within=true]:bg-white",
                  "data-[hover=true]:bg-white",
                  "group-data-[focus=true]:bg-white",
                ],
                label: "pl-10",
              }}
              startContent={<Bullet color="#5BC0DE" />}
              defaultSelectedKeys={["Bullet points"]}
            >
              <SelectItem key={"Bullet points"}>Bullet points</SelectItem>
            </Select>
          </div>
        </div>
      </section>
      <section>
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
            <TableBody items={sessions}>
              {(item) => (
                <TableRow key={item.sessionNo}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
