import axios from "axios";
import { getSiteUXReport } from "../constants/api";

export const getCrUXApi = ({ urls }: { urls: string[] }) => {
  return axios.get(getSiteUXReport, {
    params: {
      urls,
    },
  });
};
