export type resultDataType = {
  origin: string;
  p75_cls: string | number;
  p75_fcp: string | number;
  p75_fid: string | number;
  p75_lcp: string | number;
  date: { value: string };
};

const VALID_EMAIL_REGEX = new RegExp(
  /^https:\/\/(www\.)?[a-z0-9]+(\.[a-z]+)+\/?$/i
);

export const getValidAndInvalidEmails = (str: string) => {
  const { valid, invalid } = str.split(",").reduce(
    (result, str) => {
      if (VALID_EMAIL_REGEX.test(str)) {
        result.valid.add(str);
      } else {
        result.invalid.add(str);
      }
      return result;
    },
    { valid: new Set(), invalid: new Set() }
  );
  return {
    valid: Array.from(valid),
    invalid: Array.from(invalid),
  };
};
