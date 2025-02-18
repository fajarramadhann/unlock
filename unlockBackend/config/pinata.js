import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);

export default pinata;