import addresses from "constants/addresses";

const tokens = {
  eth: {
    symbol: "SOL",
    address: addresses.weth,
    decimals: 18,
    logo: "https://tokenmetrics.s3.amazonaws.com/icons/solana_large.png",
  },
  wild: {
    symbol: "$BILL",
    address: addresses.wild,
    decimals: 18,
    logo: "/assets/tokens/wildx.png",
    projectLink: "https://wildbase.farm/", // todo:
  },
  weth: {
    symbol: "WSOL",
    logo: "https://tokenmetrics.s3.amazonaws.com/icons/solana_large.png",
    address: addresses.weth,
    decimals: 18,
  },
  usdc: {
    symbol: "USDC",
    address: addresses.usdc,
    decimals: 6,
    logo: "/assets/tokens/usdc.svg",
  },
  dai: {
    symbol: "DAI",
    address: addresses.dai,
    decimals: 18,
    logo: "/assets/tokens/dai.svg",
  },
  mim: {
    symbol: "MIM",
    address: addresses.mim,
    decimals: 18,
    logo: "/assets/tokens/mim.svg",
  },
  nft: {
    symbol: "BWiLD NFT",
    address: addresses.nft,
    decimals: 18,
    logo: "/assets/tokens/nft.png",
  },
};

export default tokens;
