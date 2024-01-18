import { FC, useState } from "react";

import { SORT_TYPE } from "../constants/api";

const { asc, desc } = SORT_TYPE;

export const useSortBy = (
  defaultFieldName: string,
  defaultSortOrder: string = desc
): [string, Function] => {
  const [sortBy, setSortBy] = useState(
    `${defaultFieldName}:${defaultSortOrder}`
  );

  const handleSortBy = (fieldName = defaultFieldName) => {
    const [field, sortOrder] = sortBy.split(":");
    if (field !== fieldName) {
      setSortBy(`${fieldName}:${sortOrder}`);
      return;
    }
    if (field === fieldName) {
      const toggledOrder = sortOrder === asc ? desc : asc;
      setSortBy(`${fieldName}:${toggledOrder}`);
      return;
    }
  };

  return [sortBy, handleSortBy];
};
