import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { NFTCard } from "./components/nftCard";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const fetchNFTs = async () => {
    // Replace with your Alchemy API key:
    const API_KEY = "Ra-uS4dfMmxQ6LbKM_ihgyygkGHkWmim";
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${API_KEY}/getNFTs/`;
    let nfts;
    if (!collection.length) {
      // Setup request options:
      var requestOptions = {
        method: "GET",
      };

      // Replace with the wallet address you want to query:
      const fetchURL = `${baseURL}?owner=${wallet}`;

      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      console.log("fetch nfts collection owned by address");
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }
    if (nfts) {
      console.log("nfts", nfts);
      setNFTs(nfts.ownedNfts);
    }
    //0xFB20aDd8C2437cc3995E9CbC5800989C68b978Aa
    //0x495f947276749Ce646f68AC8c248420045cb7b5e
  };
  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };
      const API_KEY = "Ra-uS4dfMmxQ6LbKM_ihgyygkGHkWmim";
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${API_KEY}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}&startToken=${50}`;
      let nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log("nft in collection", nfts);
        setNFTs(nfts.nfts);
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input
          disabled={fetchForCollection}
          className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          onChange={(e) => setWalletAddress(e.target.value)}
          value={wallet}
          type={"text"}
          placeholder="add your wallet address"
        ></input>
        <input
          className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          type={"text"}
          onChange={(e) => setCollectionAddress(e.target.value)}
          value={collection}
          placeholder="add the collection address"
        ></input>
        <label className="text-gray-600">
          <input
            className="mr-2"
            onChange={(e) => setFetchForCollection(e.target.checked)}
            type={"checkbox"}
          ></input>
          Fetch for collection
        </label>
        <button
          className={
            "disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
          }
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection();
            } else fetchNFTs();
          }}
        >
          Let's go
        </button>
      </div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
        {NFTs.length &&
          NFTs.map((nft) => {
            return <NFTCard nft={nft} />;
          })}
      </div>
    </div>
  );
};

export default Home;
