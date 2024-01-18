import { FC } from "react";

import { resultDataType } from "../utils/dataParser";
import { FORM_FIELDS_MAPPING, SORT_TYPE, filtersType } from "../constants/api";

const {
  date: dateKey,
  origin: originKey,
  p75_fcp: fcpKey,
  p75_lcp: lcpKey,
  p75_cls: clsKey,
} = FORM_FIELDS_MAPPING;

const { asc } = SORT_TYPE;

const getMetricSeconds = (num: string | number | undefined) => {
  if (!num) return "NA";
  return `${Number(num) / 1000.0}s`;
};

const metricsOrder = [fcpKey, lcpKey, clsKey];
const metricsMapping = {
  [fcpKey]: {
    title: "First Contentful Paint",
    sortingEnabled: true,
  },
  [lcpKey]: {
    title: "Largest Contentful Paint",
    sortingEnabled: true,
  },
  [clsKey]: {
    title: "Cumulative Layout Shift",
    sortingEnabled: false,
  },
};

export const UXReport: FC<{
  data: resultDataType[];
  onClickHeading: Function;
  sortedBy: string;
  filters: filtersType;
}> = ({ data, onClickHeading, sortedBy, filters }) => {
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
          {metricsOrder
            .filter((key) => filters[key])
            .map((key) => {
              const { sortingEnabled, title } = metricsMapping[key];
              return (
                <th scope="col" key={key}>
                  {sortingEnabled ? (
                    <a
                      role="button"
                      className="text-decoration-none"
                      onClick={() => onClickHeading(key)}
                    >
                      {title}
                      {renderActiveSortSymbol(key === fieldName)}
                    </a>
                  ) : (
                    <span className="text-decoration-none">{title}</span>
                  )}
                </th>
              );
            })}
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
              {filters[fcpKey] && <td>{getMetricSeconds(p75_fcp)}</td>}
              {filters[lcpKey] && <td>{getMetricSeconds(p75_lcp)}</td>}
              {filters[clsKey] && <td>{p75_cls || "NA"}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
