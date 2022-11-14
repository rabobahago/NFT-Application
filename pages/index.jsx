import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");

  const fetchNFT = async () => {
    let nft;
    if (!collection.length) {
      // Setup request options:
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      // Replace with your Alchemy API key:
      const apiKey = "demo";
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;
      // Replace with the wallet address you want to query:
      const ownerAddr = "0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c";
      const fetchURL = `${baseURL}?owner=${ownerAddr}`;

      nft = await fetch();
    } else {
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div>
        <input
          onChange={(e) => setWalletAddress(e.target.value)}
          value={wallet}
          type={"text"}
          placeholder="add your wallet address"
        ></input>
        <input
          type={"text"}
          onChange={(e) => setCollectionAddress(e.target.value)}
          value={collection}
          placeholder="add the collection address"
        ></input>
        <label>
          <input type={"checkbox"}></input>
          <button onClick={() => fetchNFT()}>Let's go</button>
        </label>
      </div>
    </div>
  );
};

export default Home;
