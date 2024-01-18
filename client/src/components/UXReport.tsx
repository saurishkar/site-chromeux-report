import { FC } from "react";

import { resultDataType } from "../utils/dataParser";

const getMetricSeconds = (num: string | number) => {
  return `${Number(num) / 1000.0}s`;
};

export const UXReport: FC<{ data: resultDataType[] }> = ({ data }) => {
  if (data.length === 0) return null;
  return (
    <table className="table table-bordered table-striped position-relative">
      <thead className="position-sticky" style={{ top: -0.5 }}>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Url</th>
          <th scope="col">First Contentful Paint</th>
          <th scope="col">Largest Contentful Paint</th>
          <th scope="col">Cumulative Layout Shift</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ p75_fcp, p75_lcp, p75_cls, origin, date }, idx) => {
          if (!origin) {
            return null;
          }
          return (
            <tr key={`${origin}-${idx}`}>
              <td>{date.value}</td>
              <th scope="row">
                <span className="text-primary">{origin}</span>
              </th>
              <td>{getMetricSeconds(p75_fcp)}</td>
              <td>{getMetricSeconds(p75_lcp)}</td>
              <td>{p75_cls || "NA"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
