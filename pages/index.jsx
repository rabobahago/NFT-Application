import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [nfts, setNFTs] = useState([]);
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
    //0x648550Eaca1654A1e65B13cf385Ef9Ff505dE909
    //0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D
  };
  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };
      const API_KEY = "Ra-uS4dfMmxQ6LbKM_ihgyygkGHkWmim";
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${API_KEY}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      let nft = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nft) {
        console.log("nft in collection", nft);
        setNFTs(nfts.nfts);
      }
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
          <input
            onChange={(e) => setFetchForCollection(e.target.checked)}
            type={"checkbox"}
          ></input>
          Fetch for collection
        </label>
        <button
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection();
            } else fetchNFTs();
          }}
        >
          Let's go
        </button>
      </div>
    </div>
  );
};

export default Home;
