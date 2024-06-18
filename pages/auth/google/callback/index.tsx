import { getUserProfile, verifyGoogle } from "@/application/api/apis";
import { storeJSONdata } from "@/application/utils/functions";
import { useRouter } from 'next/router';
import React, { useEffect } from "react";
import Loader from "@/components/Loader";
import { manualRefresher } from "@/application/api/axiosInstance";

export default function Google() {
  const router = useRouter();
  const { query } = router;

  const getData = async () => {
    try {
      const state = query.state;
      const code = query.code;

      if (state) {
        //console.log(state," ----------- ",code);
        const checkGoogle = await verifyGoogle(code,"",state);
        //return console.log(checkGoogle)
        storeJSONdata("user", checkGoogle);
        await getUserProfile();
        //return;
        //await manualRefresher().catch((e) => console.log(e));

        if (typeof window !== 'undefined') {
           window.location.href = (process.env.BASE_URL || 'https://vetmemos.com') + "/dashboard";
        }
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      // Handle error as needed
    }
  }

  useEffect(() => {
    getData();
  }, [query.state,query.code]);

  return <Loader type={'FULL'} />;
}
