import { getUserProfile, verifyAccount } from "@/application/api/apis";
import { storeJSONdata } from "@/application/utils/functions";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { manualRefresher } from "@/application/api/axiosInstance";
import Image from "next/image";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import Link from "next/link";
import mail from "../../../public/mail.svg";
import bg from "../../../public/bgauth.svg";
import arrowback from "../../../public/menu2.svg";

export default function Verify() {
  const router = useRouter();
  const { query } = router;

  const [userData, setUserData] = useState<any>();

  const [isVeridfied, setVerifed] = useState(false);
  const getData = async () => {
    try {
      const token = query.token;

      if (token) {
        console.log(token);
        await verifyAccount(token);
        setVerifed(true);
        router.push("/auth/verified")
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    getData();
  }, [query.token]);

  return (
    <Loader type={'FULL'}/>
  );
}
