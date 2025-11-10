import axios from 'axios';
import type { DiaryEntry, NewDiaryEntry } from '../types';


const baseUrl = 'http://localhost:3000/api/diaries';

interface ValidationError {
  message: string;
  errors: Record<string, string[]>
}


export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}


export const createDiaryEntry = async (object: NewDiaryEntry) => {
  
  try {
    const response = await axios
      .post<DiaryEntry>(baseUrl, object)
      .then(response => response.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      console.log(error)
      throw new Error(
        error.response?.data 
        ? JSON.stringify(error.response.data)
        : "Validation Error"
      );
    } else {
      // We wouldn't actually do this in production app
      console.error(error);

      throw Error("Something went wrong, please contant the IT-staff");
    }
  }
}