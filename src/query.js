export const PUNKS_QUERY_1 = `
{
  sales(first: 99, orderBy: amount) {
    nft {
      numberOfSales
      numberOfTransfers
      currentBid {
        nft {
          id
        }
        amount
      }
      owner {
        numberOfPunksOwned
        id
      }
    }
  }
}
`;

export default PUNKS_QUERY_1;
