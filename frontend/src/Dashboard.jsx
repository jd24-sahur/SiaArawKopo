import { useEffect, useState } from "react";
import api from "./api";
import Navbar from "./Navbar";

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await api.get("/stock-inventories?populate=*"); // 🔥 IMPORTANT
      console.log("STOCK DATA:", res.data);
      setStocks(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 UNIVERSAL GETTER
  const getValue = (obj, field) => {
    return obj.attributes ? obj.attributes[field] : obj[field];
  };

const getMedicineName = (stock) => {
  const med = stock.medicine;

  if (!med) return "No Medicine";

  return med.BrandName || "No Name";
};
  // 🔍 SEARCH + SORT
  const filtered = stocks
    .filter((stock) =>
      (getMedicineName(stock) || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "az") {
        return (getMedicineName(a) || "").localeCompare(getMedicineName(b) || "");
      } else {
        return new Date(getValue(b, "createdAt")) - new Date(getValue(a, "createdAt"));
      }
    });

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Stock Inventory</h2>

        {/* 🔍 SEARCH + SORT */}
        <div style={{ marginBottom: "20px" }}>
          <input
            placeholder="Search medicine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "5px",
              width: "200px"
            }}
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px" }}
          >
            <option value="latest">Latest</option>
            <option value="az">A-Z</option>
          </select>
        </div>

        {/* 📦 STOCK LIST */}
        <div>
          {filtered.length === 0 ? (
            <p>No stock found</p>
          ) : (
            filtered.map((stock) => (
              <div
                key={stock.id}
                style={{
                  padding: "15px",
                  marginBottom: "10px",
                  background: "#1e293b",
                  color: "white",
                  borderRadius: "10px"
                }}
              >
                <h3>{getMedicineName(stock)}</h3>
                <p><b>Batch:</b> {stock.BatchNumber}</p>
<p><b>Expiry:</b> {stock.ExpiryDate}</p>
<p><b>Quantity:</b> {stock.QuantityOnHand}</p>
<p><b>Last Restock:</b> {stock.LastRestockDate}</p>
<p><b>Location:</b> {stock.StorageLocation}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;