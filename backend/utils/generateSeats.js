function generateSeats(
    seatConfig = {}
  ) {
    const {
      rows = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
      ],
  
      cols = 10,
  
      tierMap = {},
  
      pricing = {
        vip: 1499,
        premium: 999,
        standard: 499,
      },
    } = seatConfig;
  
    const seats = [];
  
    for (const row of rows) {
      const tier =
        tierMap[row] ||
        "standard";
  
      const price =
        pricing[tier] ??
        pricing.standard;
  
      for (
        let col = 1;
        col <= cols;
        col++
      ) {
        seats.push({
          seatNumber: `${row}${col}`,
  
          row,
  
          col,
  
          tier,
  
          price,
  
          status: "available",
  
          heldBy: null,
  
          heldUntil: null,
        });
      }
    }
  
    return seats;
  }
  
  module.exports =
    generateSeats;