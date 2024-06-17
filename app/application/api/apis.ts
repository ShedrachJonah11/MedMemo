import axios from "axios";
import AxiosInstance from "./axiosInstance";
import { APP_URL } from "../config";
import { getJSONdata, storeJSONdata } from "../utils/functions";

export const getUserProfile = async () => {
  let req = await AxiosInstance.get("/users/me");
  const ex = await getUserProfile_ex();
  const sub = await getUserSubcription();
  const data = req.data;
  data["first_name"] = ex.first_name;
  data["last_name"] = ex.last_name;
  data["profile_image_url"] = ex.profile_image_url;
  data["subscription"] = sub;
  storeJSONdata("profile", data);
  return data;
};
export const getUserProfile_ex = async () => {
  let req = await AxiosInstance.get("/profile");
  const data = req.data;
  return data;
};
export const getTranscript = async (id: string) => {
  let req = await AxiosInstance.get(`/transcription/status/${id}`);
  const data = req.data;
  return data;
};
export const generateNote = async (postdata: any) => {
  let req = await AxiosInstance.post(`/notes/regenerate`, postdata);
  const data = req.data;
  return data;
};
export const getUserHistory = async () => {
  let req = await AxiosInstance.get("/summary?order=desc&page=1&page_size=20", {
    baseURL: APP_URL,
  });
  const data = req.data;
  return data;
};
export const createAccount = async (regdata: any) => {
  let req = await axios.post(`${APP_URL}/auth/register`, regdata);
  const data = req.data;
  return data;
};
export const loginAccount = async (regdata: any) => {
  const formData = new FormData();
  Object.keys(regdata).forEach((key) => {
    formData.append(key, regdata[key]);
  });
  const response = await axios.post(`${APP_URL}/auth/jwt/login`, formData);
  const data = response.data;
  storeJSONdata("user", data);
  const profile = await getUserProfile();
  storeJSONdata("profile", profile);
  return data;
};
export const verifyAccount = async (token: any) => {
  let req = await axios.post(`${APP_URL}/auth/verify`, {
    token: token,
  });
  const data = req.data;
  return data;
};

export const loginGoogle = async () => {
  let req = await axios.get(`${APP_URL}/auth/google/authorize`);
  return req.data;
};
export const verifyGoogle = async (
  code: any,
  code_verifier: any,
  state: any
) => {
  let req = await axios.get(
    `${APP_URL}/auth/google/callback?code=${code}&state=${state}`
  );
  return req.data;
};
export const getUserSubscription = async () => {
  let req = await AxiosInstance.get("/api/user_subscription");
  return req.data;
};
export const startUserSubcription = async (plan: String, subType: String) => {
  let req = await AxiosInstance.post(
    "/api/subscription",
    {
      subscription: subType,
      plan: plan,
    },
    {
      baseURL: APP_URL,
    }
  );
  return req.data;
};
export const updateUserSubcription = async (action: String) => {
  let req = await AxiosInstance.get(
    `/api/manage/subscription?sub_type=WEB&action=${action}`
  );
  return req.data;
};
export const getUserSubcription = async () => {
  let req = await AxiosInstance.get(`/api/user_subscription`);
  return req.data;
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

export const forgotPassword = async (email: any) => {
  let req = await axios.post(`${APP_URL}/auth/forgot-password`, {
    email: email,
  });
  const data = req.data;
  return data;
};
export const resetPassword = async (token: any, password: any) => {
  let req = await axios.post(`${APP_URL}/auth/reset-password`, {
    token: token,
    password: password,
  });
  const data = req.data;
  return data;
};
