import { FC, useState } from "react";

import { resultDataType } from "../utils/dataParser";
import { FORM_FIELDS_MAPPING, SORT_TYPE } from "../constants/api";

const {
  date: dateKey,
  origin: originKey,
  p75_fcp: fcpKey,
  p75_lcp: lcpKey,
} = FORM_FIELDS_MAPPING;

const { asc } = SORT_TYPE;

const getMetricSeconds = (num: string | number) => {
  return `${Number(num) / 1000.0}s`;
};

export const UXReport: FC<{
  data: resultDataType[];
  onClickHeading: Function;
  sortedBy: string;
}> = ({ data, onClickHeading, sortedBy }) => {
  if (data.length === 0) return null;
  const [fieldName, sortOrder] = sortedBy.split(":");
  const renderActiveSortSymbol = (enable = false) => {
    if (!enable) return null;
    return sortOrder === asc ? (
      <span>&nbsp;&uarr;</span>
    ) : (
      <span>&nbsp;&darr;</span>
    );
  };
  return (
    <table className="table table-bordered table-striped position-relative">
      <thead className="position-sticky" style={{ top: -0.5 }}>
        <tr>
          <th scope="col">
            <a
              role="button"
              className="text-decoration-none"
              onClick={() => onClickHeading(dateKey)}
            >
              Date
              {renderActiveSortSymbol(dateKey === fieldName)}
            </a>
          </th>
          <th scope="col">
            <a
              role="button"
              className="text-decoration-none"
              onClick={() => onClickHeading(originKey)}
            >
              Url
              {renderActiveSortSymbol(originKey === fieldName)}
            </a>
          </th>
          <th scope="col">
            <a
              role="button"
              className="text-decoration-none"
              onClick={() => onClickHeading(fcpKey)}
            >
              First Contentful Paint
              {renderActiveSortSymbol(fcpKey === fieldName)}
            </a>
          </th>
          <th scope="col">
            <a
              role="button"
              className="text-decoration-none"
              onClick={() => onClickHeading(lcpKey)}
            >
              Largest Contentful Paint
              {renderActiveSortSymbol(lcpKey === fieldName)}
            </a>
          </th>
          <th scope="col">
            <span className="text-decoration-none">
              Cumulative Layout Shift
            </span>
          </th>
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
              <td
                scope="row"
                className="text-truncate"
                style={{ maxWidth: "200px" }}
              >
                <span className="text-info-emphasis" title={origin}>
                  {origin}
                </span>
              </td>
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
