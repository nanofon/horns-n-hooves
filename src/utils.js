export const numToDollar = (number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
  }).format(number);

export const dollarToNum = (dollars) =>
  parseInt(dollars.split(".")[0].replaceAll(",", "").replace("$", "") || "0");