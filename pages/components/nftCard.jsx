export const NFTCard = ({ nft }) => {
  return (
    <div key={nft.id.tokenId} className="flex flex-col">
      <div className="rounded-md">
        <img
          src={nft.media[0].gateway}
          className="object-cover h-128 w-full rounded-t-md"
        />
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">
        <div className="">
          <h1 className="text-xl text-gray-800">{nft.title}</h1>
          <p className="text-gray-600">
            id:{nft.id.tokenId.substr(nft.id.tokenId.length - 4)}
          </p>
          <p className="text-gray-600">{`${nft.contract.address.substr(
            0,
            5
          )}...${nft.contract.address.substr(
            nft.contract.address.length - 4
          )}`}</p>
        </div>
        <div className="flex-grow mt-2">
          <p>{nft.description?.substr(0, 150)}</p>
        </div>
        <div className="flex justify-center mb-1">
          <a
            target={"_blank"}
            href={`https://etherscan.io/token/${nft.contract.address}`}
            className="py-2 px-4 bg-blue-500 w-1/2 text-center rounded-m text-white cursor-pointer"
          >
            View on Etherscan
          </a>
        </div>
      </div>
    </div>
  );
};
