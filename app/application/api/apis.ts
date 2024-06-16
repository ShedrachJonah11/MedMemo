import { APP_URL } from "../config";
import { getJSONdata } from "../utils/functions";
import AxiosInstance from "./axiosInstance";

export const getTranscript = async (id: string) => {
  try {
    const req = await AxiosInstance.get(`/transcription/status/${id}`);
    return req.data;
  } catch (error) {
    console.error("Error fetching transcription status:", error);
    throw error;
  }
};

export const generateNote = async (postdata: any) => {
  try {
    const req = await AxiosInstance.post("/notes/regenerate", postdata);
    return req.data;
  } catch (error) {
    console.error("Error generating note:", error);
    throw error;
  }
};

export const getUserHistory = async () => {
  let req = await AxiosInstance.get("/summary?order=desc&page=1&page_size=20", {
    baseURL: APP_URL,
  });
  const data = req.data;
  return data;
};

export const processSummary = async (
  docid: String,
  prompt: String,
  isText: String
) => {
  //const signal = controller.signal;
  const authorizationToken = getJSONdata("user").access_token;

  const headers = new Headers({
    Authorization: `Bearer ${authorizationToken}`,
    "Content-Type": "application/json",
  });

  const requestBody = {
    doc_id: docid,
    length: "AUTO",
    format: "AUTO",
    prompt: prompt,
  };
  const requestBody2 = {
    prompt: prompt,
    length: "AUTO",
    format: "AUTO",
    summary_text: isText,
  };
  //console.log(requestBody,requestBody2)

  const response = await fetch(
    `${APP_URL}/${isText.length < 1 ? "summary" : "text-summary"}`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(isText.length < 1 ? requestBody : requestBody2),
      //signal: signal,
    }
  );
  //console.log(response)
  return response;
};
