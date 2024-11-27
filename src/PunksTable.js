import React, { useState } from "react";
import "./App.css";

function PunksTable({ punks }) {
  const [sortConfig, setSortConfig] = useState({
    key: "nft.currentBid.amount",
    direction: "descending", // Start with descending for the amount
  });

  // Helper function to get nested values safely
  const getNestedValue = (obj, key) => {
    return key.split(".").reduce((o, x) => (o == null ? undefined : o[x]), obj);
  };

  const sortedPunks = [...punks].sort((a, b) => {
    const aValue = getNestedValue(a, sortConfig.key);
    const bValue = getNestedValue(b, sortConfig.key);

    // Handle sorting for numeric fields
    if (sortConfig.key === "nft.currentBid.amount") {
      return (
        (parseFloat(aValue || 0) - parseFloat(bValue || 0)) *
        (sortConfig.direction === "ascending" ? 1 : -1)
      );
    }

    // Handle sorting for numeric fields like numberOfSales and numberOfTransfers
    if (
      sortConfig.key === "nft.numberOfSales" ||
      sortConfig.key === "nft.numberOfTransfers" ||
      sortConfig.key === "nft.owner.numberOfPunksOwned"
    ) {
      return (
        (parseInt(aValue) - parseInt(bValue)) *
        (sortConfig.direction === "ascending" ? 1 : -1)
      );
    }

    // Default string comparison for other fields
    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <h1>Table</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          className="punks-table"
          style={{ width: "100%", maxWidth: "1400px" }}
        >
          <thead>
            <tr className="bright">
              <th onClick={() => requestSort("nft.currentBid.nft.id")}>
                Punk ID
              </th>
              <th onClick={() => requestSort("nft.currentBid.amount")}>
                Amount (ETH)
              </th>
              <th onClick={() => requestSort("nft.numberOfSales")}>
                Number of Sales
              </th>
              <th onClick={() => requestSort("nft.numberOfTransfers")}>
                Number of Transfers
              </th>
              <th onClick={() => requestSort("nft.owner.id")}>Owner</th>
              <th onClick={() => requestSort("nft.owner.numberOfPunksOwned")}>
                Owner's Total Punks
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPunks.map((punk, index) =>
              punk.nft && punk.nft.currentBid ? (
                <tr key={punk.nft.currentBid.nft.id || index}>
                  <td>{punk.nft.currentBid.nft.id || "N/A"}</td>
                  <td>
                    {(
                      parseFloat(punk.nft.currentBid.amount || 0) / 1e18
                    ).toFixed(4)}{" "}
                    ETH
                  </td>
                  <td>{parseInt(punk.nft.numberOfSales || 0, 10)}</td>
                  <td>{parseInt(punk.nft.numberOfTransfers || 0, 10)}</td>
                  <td>{punk.nft.owner?.id || "N/A"}</td>
                  <td>
                    {parseInt(punk.nft.owner?.numberOfPunksOwned || 0, 10)}
                  </td>
                </tr>
              ) : (
                <tr key={index}>
                  <td colSpan="6">Data unavailable</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PunksTable;
