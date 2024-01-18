import { ChangeEventHandler, FC, useState } from "react";

import { FORM_FIELDS_MAPPING, filtersType } from "../constants/api";

const { p75_cls, p75_fcp, p75_lcp } = FORM_FIELDS_MAPPING;

export const DataFilters: FC<{
  onFilterChange: ChangeEventHandler;
  filters: filtersType;
}> = ({ onFilterChange: handleFilterChange, filters }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="mx-2 form-check form-switch">
        <label className="form-check-label" htmlFor="clsCheck">
          CLS
        </label>
        <input
          onChange={handleFilterChange}
          className="form-check-input"
          type="checkbox"
          id="clsCheck"
          value={p75_cls}
          name={p75_cls}
          checked={filters.p75_cls}
        />
      </div>
      <div className="mx-2 form-check form-switch">
        <label className="form-check-label" htmlFor="fcpCheck">
          FCP
        </label>
        <input
          onChange={handleFilterChange}
          className="form-check-input"
          type="checkbox"
          id="fcpCheck"
          value={p75_fcp}
          name={p75_fcp}
          checked={filters.p75_fcp}
        />
      </div>
      <div className="mx-2 form-check form-switch">
        <label className="form-check-label" htmlFor="lcpCheck">
          LCP
        </label>
        <input
          onChange={handleFilterChange}
          className="form-check-input"
          type="checkbox"
          id="lcpCheck"
          value={p75_lcp}
          name={p75_lcp}
          checked={filters.p75_lcp}
        />
      </div>
    </div>
  );
};
