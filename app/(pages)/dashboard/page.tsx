"use client";
import React, { useCallback, useMemo, useState } from "react";
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
  Link,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  Input,
  ModalBody,
  RadioGroup,
  Radio,
  ModalFooter,
  Textarea,
  DatePicker,
  CalendarDate,
} from "@nextui-org/react";
import { useDateFormatter } from "@react-aria/i18n";
import { Bullet } from "@/app/components/bullet";
import { More } from "iconsax-react";
import { getLocalTimeZone } from "@internationalized/date";

function Dashboard() {
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [allergies, setAllergies] = useState("");
  const [currentMedications, setCurrentMedications] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [date, setDate] = useState<CalendarDate>();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const formatter = useDateFormatter({ dateStyle: "full" });
  const template = [
    {
      key: "SOAP",
      label: "SOAP",
    },
    {
      key: "DETAILED_SECTIONS",
      label: "DETAILED SECTIONS",
    },
    {
      key: "ASSESSMENT_PLAN",
      label: "ASSESSMENT PLAN",
    },
    {
      key: "SOAP_ASSESSMENT_PLAN",
      label: "SOAP ASSESSMENT PLAN",
    },
    {
      key: "SOAP_ASSESSMENT_PLAN_PE_TEST",
      label: "SOAP ASSESSMENT PLAN PE TEST",
    },
    {
      key: "APSO",
      label: "APSO",
    },
    {
      key: "SOAP_PSYCHIATRIC",
      label: "SOAP PSYCHIATRIC",
    },
    {
      key: "PSYCHIATRIC_MULTIPLE_SECTIONS",
      label: "PSYCHIATRIC MULTIPLE SECTIONS",
    },
    {
      key: "DIET",
      label: "DIET",
    },
    {
      key: "CARDIOLOGY",
      label: "CARDIOLOGY",
    },
    {
      key: "PSYCHOLOGY",
      label: "PSYCHOLOGY",
    },
    {
      key: "LACTATION",
      label: "LACTATION",
    },
  ];

  const pointStyle = [
    {
      key: "AUTO",
      label: "AUTO",
    },
    {
      key: "BULLET_POINTS",
      label: "BULLET POINTS",
    },
    {
      key: "PARAGRAPH",
      label: "PARAGRAPH",
    },
  ];
  const formatedDate = date
    ? formatter.format(date.toDate(getLocalTimeZone()))
    : "--";

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
        <Button
          as={Link}
          href="/records"
          isIconOnly
          className="bg-transparent text-[#007BFF] w-[100px]"
        >
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
            <div className="flex gap-2 justify-normal flex-wrap">
              <Select
                radius="sm"
                className="w-[100px] bg-[#E6F2FF] py-0 shadow-none  rounded-lg"
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
              <Button
                className="bg-transparent text-[#007BFF] "
                onPress={onOpen}
              >
                + Add new patient
              </Button>
              <Modal
                className="bg-white shadow-none py-5 w-full"
                backdrop="blur"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top"
                size="3xl"
              >
                <ModalContent>
                  <ModalHeader>
                    <div className="flex flex-col justify-center text-center w-full">
                      <p className="text-[#343A40] font-semibold text-2xl">
                        Add new patient
                      </p>
                      <p className="font-medium text-sm text-[#343A40]">
                        Enter your patients details to register.
                      </p>
                    </div>
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex justify-center gap-4">
                      <div className="max-w-[352px] w-full flex flex-col gap-5 ">
                        <div className="flex flex-col gap-[15.4px]">
                          <p className="font-medium text-base text-[#343A40]">
                            Personal Information
                          </p>
                          <Input
                            radius="sm"
                            label="Patient Name"
                            labelPlacement="inside"
                            className="rounded-md w-full h-[52px] border-1 border-[#83818E]"
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
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                          />
                          <DatePicker
                            label="DOB"
                            labelPlacement="outside"
                            value={date}
                            onChange={setDate}
                            className="rounded-md w-full text-[#71839B]"
                            classNames={{
                              base: "text-base [&>div]:bg-white [&>div]:border-1 [&>div]:border-[#83818E] [&>div]:shadow-none [&>div]:h-[52px] [&>span]:text-[#71839B]",
                              label: "text-[#71839B] font-medium text-sm",
                            }}
                            radius="sm"
                          />
                          <RadioGroup
                            label="Gender"
                            className="flex justify-normal gap-3"
                            classNames={{
                              label: "text-[#71839B] font-medium text-sm",
                              base: "flex justify-normal gap-3",
                            }}
                            orientation="horizontal"
                            value={gender}
                            onValueChange={setGender}
                          >
                            <Radio
                              classNames={{
                                control: [
                                  "group[data-selected=true]:border-[#007BFF]",
                                  "group[data-selected=true]:bg-[#007BFF]",
                                ],
                              }}
                              value="Male"
                            >
                              Male
                            </Radio>
                            <Radio value="Female">Female</Radio>
                            <Radio value="Others">Others</Radio>
                          </RadioGroup>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="font-medium text-base text-[#343A40]">
                            Contact details
                          </p>
                          <Input
                            radius="sm"
                            label="Phone number"
                            labelPlacement="inside"
                            className="rounded-md w-full h-[52px] border-1 border-[#83818E]"
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
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />

                          <Input
                            radius="sm"
                            label="Address"
                            labelPlacement="inside"
                            className="rounded-md w-full h-[52px] border-1 border-[#83818E]"
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
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="max-w-[352px] w-full flex flex-col gap-5 ">
                        <div className="flex flex-col gap-2">
                          <p className="font-medium text-base text-[#343A40]">
                            Medical Information
                          </p>
                          <Textarea
                            minRows={1}
                            maxRows={6}
                            radius="sm"
                            label="Medical history"
                            labelPlacement="inside"
                            className="rounded-md w-full min-h-[52px] border-1 border-[#83818E]"
                            classNames={{
                              label:
                                "text-base text-[#71839B] overflow-visible",
                              input: "text-base",
                              inputWrapper: [
                                "bg-white",
                                "data-focus-[within=true]:bg-white",
                                "data-[hover=true]:bg-white",
                                "group-data-[focus=true]:bg-white",
                              ],
                            }}
                            value={medicalHistory}
                            onChange={(e) => setMedicalHistory(e.target.value)}
                          />

                          <Textarea
                            minRows={1}
                            maxRows={3}
                            radius="sm"
                            label="Allergies"
                            labelPlacement="inside"
                            className="rounded-md w-full h-min min-h-[52px] border-1 border-[#83818E]"
                            classNames={{
                              label:
                                "text-base text-[#71839B]  overflow-visible",
                              input: "text-base",
                              inputWrapper: [
                                "bg-white",
                                "data-focus-[within=true]:bg-white",
                                "data-[hover=true]:bg-white",
                                "group-data-[focus=true]:bg-white",
                              ],
                            }}
                            value={allergies}
                            onChange={(e) => setAllergies(e.target.value)}
                          />
                          <Textarea
                            minRows={1}
                            maxRows={3}
                            radius="sm"
                            label="Current medications"
                            labelPlacement="inside"
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
                            value={currentMedications}
                            onChange={(e) =>
                              setCurrentMedications(e.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="font-medium text-base text-[#343A40]">
                            Emergency contact
                          </p>
                          <Input
                            radius="sm"
                            label="Name"
                            labelPlacement="inside"
                            className="rounded-md w-full h-[52px] border-1 border-[#83818E]"
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
                            value={emergencyContactName}
                            onChange={(e) =>
                              setEmergencyContactName(e.target.value)
                            }
                          />

                          <Input
                            radius="sm"
                            label="Phone number"
                            labelPlacement="inside"
                            className="rounded-md w-full h-[52px] border-1 border-[#83818E]"
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
                            value={emergencyContactPhone}
                            onChange={(e) =>
                              setEmergencyContactPhone(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <div className="flex justify-center gap-4 w-full">
                      <Button className="max-w-[320px] w-full h-[56px] rounded-md border-[3px] border-[#007BFF] text-[#007BFF] bg-white">
                        Cancel
                      </Button>
                      <Button className="max-w-[320px] w-full h-[56px] rounded-md bg-[#007BFF] text-white">
                        Add Patient
                      </Button>
                    </div>
                  </ModalFooter>
                </ModalContent>
              </Modal>
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
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                padding={{ left: 50 }}
              />
              <YAxis
                width={50}
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={false}
                active={true}
                // position={{
                //   x: (chartData.length-1)*100,
                //   y: chartData[chartData.length-1].patients/1000,
                // }}
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
              className="w-full bg-white shadow-none  rounded-lg h-[60px]"
              label="Templates"
              labelPlacement="inside"
              variant="flat"
              aria-label="Templates"
              classNames={{
                base: "bg-white h-[60px]",
                trigger: [
                  "bg-white h-[60px] border-1",
                  "data-focus-[within=true]:bg-white",
                  "data-[hover=true]:bg-white",
                  "group-data-[focus=true]:bg-white",
                ],
                label: "pl-10",
                // listbox: "bg-[#EDEDED]",
                // listboxWrapper: "bg-[#EDEDED]",
                popoverContent: "bg-[#EDEDED]",
              }}
              startContent={<Bullet color="#004085" />}
              defaultSelectedKeys={["SOAP"]}
            >
              {template.map((template) => (
                <SelectItem
                  classNames={{
                    base: [
                      "rounded-sm",
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
              radius="md"
              className="w-full bg-white shadow-none  rounded-lg "
              label="Style"
              variant="flat"
              labelPlacement="inside"
              aria-label="Style"
              classNames={{
                base: "bg-white  h-[60px]",
                trigger: [
                  "bg-white h-[60px] border-1",
                  "data-focus-[within=true]:bg-white",
                  "data-[hover=true]:bg-white",
                  "group-data-[focus=true]:bg-white",
                ],
                label: "pl-10",
                // listbox: "bg-[#EDEDED]",
                // listboxWrapper: "bg-[#EDEDED]",
                popoverContent: "bg-[#EDEDED]",
              }}
              startContent={<Bullet color="#5BC0DE" />}
              defaultSelectedKeys={["BULLET_POINTS"]}
            >
              {pointStyle.map((pointStyle) => (
                <SelectItem
                  classNames={{
                    base: [
                      "rounded-sm",
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
