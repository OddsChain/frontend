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

export const BET_CREATION_FEE = "310000000000000000";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const MINIMUM_STAKE_AMOUNT = 1000 * 10 ** 18;

export const ODDS_ADDRESS = "0xf3e30B0891521D595247AEB48F72105A4434B09E";

export const ODDS_TOKEN_ADDRESS = "0xEF53020fEb7b71E4B700531894991Cc7Ca553fb4";
