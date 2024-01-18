import axios from "axios";
import { getSiteUXReport } from "../constants/api";

export const getCrUXApi = ({
  urls,
  sortBy,
}: {
  urls: string[];
  sortBy: string;
}) => {
  return axios.get(getSiteUXReport, {
    params: {
      urls,
      sortBy
    },
  });
};
