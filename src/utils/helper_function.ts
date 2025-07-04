import farmhash from "farmhash";
import base62 from "base62";

const urlToShortString = (url: string, creator_id: string) =>
  base62.encode(farmhash.hash32(url + creator_id));

const addDays = (date: Date, days: number) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export { urlToShortString, addDays };
