import { domain, Presale, types } from '../constants';
import IERC20 from '../abis/IERC20.json';
import dotenv from 'dotenv';

dotenv.config();

const ethers = require('ethers');
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const poolManager = process.env.PROXY_MANAGER;

export const signPresaleData = async (data: Presale, owner: string): Promise<string> => {
  let check = checkParams(data);
  if (check != null) {
    return check;
  }
  const amount = calculateAmount(data.hardcap, data.presaleRate, data.listingRate);
  let success = await getTokenInfo(data.currency, owner, amount);
  if (success != 'success') {
    return success;
  }
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY);
  return await signer._signTypedData(domain, types, data);
};

const checkParams = (data: Presale): string | null => {
  const timestamp = +(Date.now() / 1000).toFixed(0);
  if (data.minBuy <= 0) return "minBuy cannot be less than or equal to 0";
  if (!(data.maxBuy > 0 && data.minBuy < data.maxBuy)) return "maxBuy cannot be less than or equal to 0, and it must be greater than minBuy";
  if (data.maxBuy > data.hardcap) return "maxBuy cannot be greater than hardcap";
  if (data.hardcap <= 0 && data.hardcap <= data.softcap) return "hardcap cannot be less than or equal to 0, and it must be greater than softcap";
  if (data.softcap < data.hardcap / 2) return "softcap must be at least half of hardcap";
  if (data.softcap <= 0) return "softcap cannot be less than or equal to 0";
  if (!(data.liquidityRate > 50 && data.liquidityRate <= 100)) return "liquidityRate must be between 50 and 100";
  if (!(data.listingRate > 0 && data.listingRate < 100_000_000_000)) return "listingRate must be between 0 and 100,000,000,000";
  if (!(data.presaleRate > 0 && data.presaleRate < 100_000_000_000)) return "presaleRate must be between 0 and 100,000,000,000";
  if (!(data.startTime > timestamp && data.startTime < data.endTime)) return "startTime cannot be less than current time, and it must be less than endTime";
  return null; 
};

const calculateAmount = (hardcap: number, presaleRate: number, listingRate: number) => {
  const presaleAmount = hardcap * presaleRate;
  const liquidityAmount = hardcap * listingRate;
  return presaleAmount + liquidityAmount;
};

const getTokenInfo = async (address: string, owner: string, amount: number): Promise<string> => {
  let contract;
  try {
    contract = new ethers.Contract(address, IERC20, provider);
  } catch {
      return 'Failed to create contract object';
  }
  if (ethers.utils.isAddress(owner)) {
    try {
      const balance = await contract.balanceOf(owner);
      const allowance = await contract.allowance(owner, poolManager);
      return +balance >= amount && +allowance >= amount ? "success" : "insufficient balance";
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      } else {
        return 'An unknown error occurred';
      }    }
  } else {
    return 'An unknown error occurred';
  }
};
