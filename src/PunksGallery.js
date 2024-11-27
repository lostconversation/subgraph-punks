import React, { useState } from "react"; // Removed useEffect and axios imports
// Removed PUNKS_QUERY_1 and API_URL imports as they're not used

const PunksGallery = ({ punks }) => {
  // Receive punks as props
  const [sortDirection, setSortDirection] = useState("descending"); // Default to descending for most expensive first

  // Sort punks when they are received
  const sortedPunks = [...punks].sort((a, b) => {
    const amountA = parseFloat(a.nft.currentBid?.amount || 0);
    const amountB = parseFloat(b.nft.currentBid?.amount || 0);
    return sortDirection === "ascending"
      ? amountA - amountB
      : amountB - amountA; // Most expensive first
  });

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="descending"
            checked={sortDirection === "descending"}
            onChange={() => setSortDirection("descending")}
          />
          💰💰💰
        </label>
        <label>
          <input
            type="radio"
            value="ascending"
            checked={sortDirection === "ascending"}
            onChange={() => setSortDirection("ascending")}
          />
          💰
        </label>
        <div style={{ marginBottom: 40 }}></div>
      </div>
      <div className="gallery">
        {sortedPunks.map(
          (punk) =>
            punk.nft && punk.nft.currentBid ? ( // Check if punk.nft and punk.nft.currentBid exist
              <div key={punk.nft.currentBid.nft.id} className="punk">
                <img
                  src={`https://cryptopunks.app/public/images/cryptopunks/punk${punk.nft.currentBid.nft.id}.png`}
                  alt={`Cryptopunk ${punk.nft.currentBid.nft.id}`}
                />
                <p>
                  <span className="big">{punk.nft.currentBid.nft.id}</span>{" "}
                </p>
                <p className="bright big">
                  {parseFloat(punk.nft.currentBid.amount) / 1e18} ETH
                </p>
                <p>
                  Sold <span className="bright">{punk.nft.numberOfSales}</span>{" "}
                  times
                </p>
                <p>
                  owned by:{" "}
                  <span className="bright smol">{punk.nft.owner.id}</span>
                </p>
                <p>
                  They own{" "}
                  <span className="bright">
                    {punk.nft.owner.numberOfPunksOwned}
                  </span>{" "}
                  punks
                </p>
              </div>
            ) : null // Skip rendering if data is incomplete
        )}
      </div>
    </div>
  );
};

export default PunksGallery;
