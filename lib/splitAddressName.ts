/**
 * Split address name into two parts
 * @param address - the address to split
 * @returns an array of two strings, the first being the main name and the second being the rest of the address
 */
export const splitAddressName = (address: string) => {
  const mainName = address.trim().split(",")[0];
  const restOfAddress = address.trim().split(",").slice(1).join(",");

  return [mainName, restOfAddress];
};
