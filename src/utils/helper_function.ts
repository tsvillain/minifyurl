import farmhash from "farmhash";
import base62 from "base62";

const urlToShortString = (url: string) => base62.encode(farmhash.hash32(url));

const addDays = (date: Date, days: number) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export { urlToShortString, addDays };
