import AxiosInstance from "./axiosInstance";

export const getTranscript = async (id: any) => {
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
