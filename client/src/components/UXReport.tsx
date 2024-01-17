import { FC } from "react";

import { resultDataType } from "../utils/dataParser";

const getMetricSeconds = (num: string | number) => {
  return `${Number(num) / 1000.0}s`;
};

export const UXReport: FC<{ data: resultDataType }> = ({ data }) => {
  const { fcp, lcp, cls, origin } = data;
  if (!origin) {
    return null;
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Url</th>
          <th scope="col">First Contentful Paint</th>
          <th scope="col">Largest Contentful Paint</th>
          <th scope="col">Cumulative Layout Shift</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">
            <span className="text-primary">{origin}</span>
          </th>
          <td>{getMetricSeconds(fcp)}</td>
          <td>{getMetricSeconds(lcp)}</td>
          <td>{cls}</td>
        </tr>
      </tbody>
    </table>
  );
};
