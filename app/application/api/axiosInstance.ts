import axios from 'axios';
import { getJSONdata, storeJSONdata } from '../utils/functions';
import { APP_URL } from '../config';



const refreshAccessToken = async (refreshToken:String) => {
    try {
        const response = await axios.post(`${APP_URL}/auth/token-refresh`, {
            refresh_token: refreshToken,
        });
        //console.log(response,"TOKENNN")
        const newAccessToken = response.data.access_token;
        return newAccessToken;
    } catch (error) {
        // Handle errors during token refresh
        //console.error('Error refreshing access token:', error);
        throw error;
    }
};
export async function manualRefresher(){
    let tokens = getJSONdata("user");
    const newAccessToken = await refreshAccessToken(tokens.refresh_token);
     updateToken(newAccessToken);
     return true;
}
const checkToken = async () => {
    let tokens = getJSONdata("user");
    //console.log("checking")
    try {
        await axios.get(`${APP_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${tokens.access_token}`,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
};
const updateToken=(token:String)=>{
let tokens = getJSONdata("user");
tokens.access_token=token;
storeJSONdata("user",tokens);
}
let tokens = getJSONdata("user");
function tk(){
    //console.log(getJSONdata("user"))
  return  getJSONdata("user").access_token; 
}
const AxiosInstance = axios.create({
    baseURL: APP_URL,
});

AxiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = tk();
      if (accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default AxiosInstance;