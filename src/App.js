import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, SUBGRAPH_ID } from "./stuff"; // Import the API_KEY and SUBGRAPH_ID
import { PUNKS_QUERY_1 } from "./query"; // Import the query
import PunksGallery from "./PunksGallery"; // Import Gallery Component
import PunksTable from "./PunksTable"; // Import Table Component

const API_URL = `https://gateway-arbitrum.thegraph.com/api/${API_KEY}/subgraphs/id/${SUBGRAPH_ID}`;

const App = () => {
  const [punks, setPunks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("gallery"); // Default view is gallery

  const fetchPunks = async () => {
    try {
      const response = await axios.post(API_URL, {
        query: PUNKS_QUERY_1,
      });

      const { data, errors } = response.data;
      if (errors) {
        console.error("GraphQL errors:", errors);
        setError("Error fetching punks");
        return;
      }

      // Remove duplicates based on NFT ID
      const uniquePunks = [];
      const punkIds = new Set();

      data.sales.forEach((punk) => {
        if (punk && punk.nft && punk.nft.currentBid && punk.nft.owner) {
          const punkId = punk.nft.currentBid.nft.id;
          if (!punkIds.has(punkId)) {
            punkIds.add(punkId);
            uniquePunks.push(punk);
          }
        }
      });

      // Filter out punks sold for less than 1 ETH
      const filteredPunks = uniquePunks.filter((punk) => {
        const amountInEth = parseFloat(punk.nft.currentBid.amount) / 1e18;
        return amountInEth >= 1; // Only keep punks sold for 1 ETH or more
      });

      setPunks(filteredPunks); // Set state with filtered unique punks
    } catch (error) {
      console.error("Error fetching punks:", error);
      setError("Error fetching punks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPunks();
  }, []);

  const handleViewChange = (e) => {
    setView(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Cryptopunks</h1>
      <div style={{ marginBottom: 40 }}>
        <label>
          <input
            type="radio"
            value="gallery"
            checked={view === "gallery"}
            onChange={handleViewChange}
          />
          Gallery
        </label>
        <label>
          <input
            type="radio"
            value="table"
            checked={view === "table"}
            onChange={handleViewChange}
          />
          Table
        </label>
      </div>
      {view === "gallery" ? (
        <PunksGallery punks={punks} /> // Pass filtered punks to Gallery
      ) : (
        <PunksTable punks={punks} />
      )}
    </div>
  );
};

export default App;
