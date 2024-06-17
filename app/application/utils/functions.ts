// fileUploadUtils.ts
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import AxiosInstance from '../api/axiosInstance';
import { APP_URL } from '../config';
import { toast } from 'react-toastify';

interface FileUploadOptions {
  onProgress?: (progress: number) => void;
}

export const uploadFile = async (
  file: File,
  endpoint: string,
  options: FileUploadOptions = {}
): Promise<AxiosResponse> => {
  const { onProgress } = options;

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);

    const config: AxiosRequestConfig = {
      baseURL:APP_URL,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));

        if (onProgress) {
          onProgress(percentCompleted);
        }
      },
    };

    AxiosInstance.post(endpoint, formData, config)
      .then((response: AxiosResponse) => resolve(response))
      .catch((error) => reject(error));
  });
};
async function blobToUint8Array(blob:any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer:any = reader.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      resolve(uint8Array);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(blob);
  });
}

export function generateRandomKey() {
  const randomKey = Math.random().toString(36).substring(2, 10);
  return randomKey;
}

export function storeJSONdata(field: string, data: any) {
    // Check if window is defined (running on the client side)
    if (typeof window !== 'undefined') {
      localStorage.setItem(`vet:${field}`, JSON.stringify(data));
    }
  }
  
  export function getJSONdata(field: string) {
    // Check if window is defined (running on the client side)
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(`vet:${field}`);
      return JSON.parse(data || '{}');
    }
  
    // Return a default value if running on the server side
    return {};
  }

export function userLoggedin(){
  const data = localStorage.getItem(`vet:user`);
  if(data){
    return true;
  }else{
    return false;
  }
}
export function logOut(){
  localStorage.clear();
}

export function getPlan(plans:string[]){
if(plans.includes("enterprise")){
  return "Enterprise";
}else if(plans.includes("plus")){
  return "Plus";
}else{
  return "Free"
}
}
export function findGetParameter(parameterName:String) {
  let result = null,
      tmp = [];
  window.location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
  return result;
    }

  export function gauth_response(token:String){

    let res = {
      access_token:"xxxx",
      refresh_token:token,
      type:'bearer'
    }
   storeJSONdata("user",res)
   }
   export function arraysEqual(arr1:any, arr2:any) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
  
    if (set1.size !== set2.size) {
      return false;
    }
  
    const array1 = Array.from(set1);
    const array2 = Array.from(set2);
  
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
  
    return true;
  }
  export function getCurrentDateTime() {
    // Create a new Date object representing the current date and time
    const currentDate = new Date();
  
    // Get individual components of the date and time
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
  
    // Format the date and time as a string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return formattedDateTime;
  }

  export function copyToClipboard(text: string): void {
    if(text==undefined) return;
    navigator.clipboard.writeText(text)
      .then(() => {
        //console.log('Text copied to clipboard:', text);
        toast.success("copied!")
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard:', err);
      });
  }

  export function isPlusUser(isYearlyBilling:any){
    try{
    const userData =  getJSONdata("profile");
    if(getPlan(userData?.roles || []) !== "Plus"){
     return false;
    }
    if(userData.subscription.length<1 && isYearlyBilling==false ){
     return true;
    }
    if(userData.subscription.length<1 && isYearlyBilling){
     return false;
    }
   if(isYearlyBilling){
    const orderedSubscriptions = userData.subscription.sort((a:any, b:any) => {
      const dateA = new Date(a.date_time).getTime();
      const dateB = new Date(b.date_time).getTime();
      return dateB - dateA;
    });
   if(orderedSubscriptions[0].variant_name=="PLUS YEARLY"){
     return true;
   }
   }else{
     return true;
   }
   return false;
  }catch(e){
    return false;
  }
 }

 export function capitalize(inputString:string) {
  if (!inputString) {
    return '';
  }

  const sentences = inputString.split(/\.\s+/);
  const capitalizedSentences = sentences.map((sentence) => {
    const trimmedSentence = sentence.trim();
    if (trimmedSentence.length === 0) {
      return '';
    }
    const firstChar = trimmedSentence.charAt(0).toUpperCase();
    return firstChar + trimmedSentence.slice(1);
  });

  return capitalizedSentences.join('. ');
}

