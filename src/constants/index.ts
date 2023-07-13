export const domain = {
  name: 'EIP721-Derive',
  version: '1',
  chainId: 1,
  verifyingContract: '/*Contract Address is Here*/',
};

export const types = {
  Permit: [
    { name: "currency", type: "address" },
    { name: "presaleRate", type: "uint256" },
    { name: "softcap", type: "uint256" },
    { name: "hardcap", type: "uint256" },
    { name: "minBuy", type: "uint256" },
    { name: "maxBuy", type: "uint256" },
    { name: "liquidityRate", type: "uint256" },
    { name: "listingRate", type: "uint256" },
    { name: "startTime", type: "uint256" },
    { name: "endTime", type: "uint256" },
    { name: "lockEndTime", type: "uint256" },
    { name: "isVesting", type: "bool" },
    { name: "isLock", type: "bool" },
    { name: "refund", type: "bool" },
    { name: "autoListing", type: "bool" },
  ],
};

export interface Presale {
  currency: string;
  presaleRate: number;
  softcap: number;
  hardcap: number;
  minBuy: number;
  maxBuy: number;
  liquidityRate: number;
  listingRate: number;
  startTime: number;
  endTime: number;
  lockEndTime: number;
  isVesting: boolean;
  isLock: boolean;
  refund: boolean;
  autoListing: boolean;
}

