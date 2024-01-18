const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const getSiteUXReport = `${BASE_URL}/api/get_report`;

export const FORM_FIELDS_MAPPING = {
  date: "date",
  origin: "origin",
  p75_fcp: "p75_fcp",
  p75_lcp: "p75_lcp",
  p75_cls: "p75_cls",
};

export const SORT_TYPE = {
  asc: "ASC",
  desc: "DESC",
};

export type filtersType = {
  [k: string]: boolean;
};

export const DEFAULT_FILTERS = Object.freeze({
  [FORM_FIELDS_MAPPING.p75_cls]: true,
  [FORM_FIELDS_MAPPING.p75_fcp]: true,
  [FORM_FIELDS_MAPPING.p75_lcp]: true,
});
