import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Image,
} from "@nextui-org/react";
import { More } from "iconsax-react";
import { useCallback, useMemo } from "react";
import { sessions } from "@/app/assests/data"; 

export default function Sessions() {
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
          <TableBody
            items={sessions}
            emptyContent={
              <div>
                <div className="bg-white p-5 flex flex-col text-center gap-1">
                  <Image
                    src="/emptycontent.png"
                    className="w-[104px] h-[104px]"
                  ></Image>
                  <p className="text-xl font-semibold ">Nothing here yet.</p>
                  <p className="text-[#71839B] text-sm">
                    Speak to see the transcript{" "}
                  </p>
                </div>
              </div>
            }
          >
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
  );
}
