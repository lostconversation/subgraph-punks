import React, { useEffect, useState } from "react";
import fakeData from "./fake-subgraph.json"; // Import the fake data

const PunksGallery = () => {
  const [punks, setPunks] = useState([]);

  const fetchPunks = async () => {
    // Fetch from local JSON instead of the API
    setPunks(fakeData.punks);
  };

  useEffect(() => {
    fetchPunks();
  }, []);

  return (
    <div>
      <h1>CryptoPunks Gallery</h1>
      <div className="gallery">
        {punks.map((punk) => (
          <div key={punk.id} className="punk">
            <img
              src={`https://cryptopunks.org/images/cryptopunk${punk.id}.png`} // Placeholder image URL
              alt={`CryptoPunk ${punk.id}`}
              style={{ width: "100px", height: "100px" }}
            />
            <p>Price: {punk.price} ETH</p>
            <p>Owner: {punk.owner.id}</p>
            <p>Minted By: {punk.mintedBy.id}</p>
            <p>Bought At: {punk.boughtAt.amount} ETH</p>
            <p>
              Timestamp: {new Date(punk.boughtAt.timestamp).toLocaleString()}
            </p>
            <p>Current ETH Price: {punk.currentEthPrice} ETH</p>
            <p>Current USD Price: ${punk.currentUsdPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PunksGallery;
