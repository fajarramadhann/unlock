import { ethers } from 'ethers';
import 'dotenv/config';

const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

export { provider, wallet };