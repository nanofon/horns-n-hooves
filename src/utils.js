export const numToDollar = (number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
  }).format(number);

export const dollarToNum = (dollars) =>
  parseInt(dollars.split(".")[0].replaceAll(",", "").replace("$", "") || "0");

export const tsToDate = (timestamp) => {
  const date = new Date(timestamp);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};
