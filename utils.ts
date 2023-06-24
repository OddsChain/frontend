export function truncateAddr(address: string) {
  return address.slice(0, 5) + "...." + address.slice(-5);
}

export function getBetEndDate(durationInSeconds: number) {
  const seconds = Math.floor(durationInSeconds % 60);
  const minutes = Math.floor((durationInSeconds / 60) % 60);
  const hours = Math.floor((durationInSeconds / 3600) % 24);
  const days = Math.floor(durationInSeconds / (3600 * 24));

  const parts = [];

  if (days > 0) {
    parts.push(`${days} day${days > 1 ? "s" : ""}`);
  } else if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  } else if (minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  } else if (seconds > 0) {
    parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
  } else {
    return "Ended";
  }

  return parts.join(", ");
}

export const BET_CREATION_FEE = 360000000000000000;

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const MINIMUM_STAKE_AMOUNT = 1000 * 10 ** 18;
