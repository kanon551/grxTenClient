import axios, { AxiosError } from "axios";


const key = 'api';


export const authAxios = axios.create({
    baseURL: "https://grx-ten-server.vercel.app",
    headers: {
      "Content-Type": "application/json",
    },
  });
  

  interface SolarPayload {
    averageElectricityBill: number | null;
    roofTopArea: number | null;
    phoneNumber:string;
}

export const calculateSolarReliability = async (payload:SolarPayload ) => {
    try {
      const res = await authAxios.post(`/${key}/grxTen/calculateSolarInstallation`, payload);
      return res.data;
    }
    catch (err) {
      const error = err as AxiosError;
      return error.response?.data;
    }
  
  };