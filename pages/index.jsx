import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [nfts, setNFTs] = useState([]);

  const fetchNFT = async () => {
    // Replace with your Alchemy API key:
    const API_KEY = "Ra-uS4dfMmxQ6LbKM_ihgyygkGHkWmim";
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${API_KEY}/getNFTs/`;
    let nft;
    if (!collection.length) {
      // Setup request options:
      var requestOptions = {
        method: "GET",
      };

      // Replace with the wallet address you want to query:
      const fetchURL = `${baseURL}?owner=${wallet}`;

      nft = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      //console.log("fetch nfts collection owned by address");
      nft = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }
    if (nft) {
      //console.log("nfts", nft);
      setNFTs(nft.ownedNfts);
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
      {console.log(nfts)}
    </div>
  );
};

export default Home;
