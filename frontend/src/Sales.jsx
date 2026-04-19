import { useEffect, useState } from "react";
import api from "./api";
import Navbar from "./Navbar";

function Sales() {
  const [suppliers, setSuppliers] = useState([]);

  const [form, setForm] = useState({
    OrderDate: "",
    TotalAmount: "",
    PaymentStatus: false,
    ReceivedDate: "",
    supplier: "",
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await api.get("/suppliers");
      setSuppliers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getValue = (obj, field) => {
    return obj.attributes ? obj.attributes[field] : obj[field];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.supplier) {
      alert("❌ Please select a supplier");
      return;
    }

    try {
      await api.post("/purchase-orders", {
        data: {
          OrderDate: form.OrderDate,
          TotalAmount: Number(form.TotalAmount),
          PaymentStatus: form.PaymentStatus,
          ReceivedDate: form.ReceivedDate || null,
          supplier: {
            connect: [Number(form.supplier)],
          },
        },
      });

      alert("✅ Sale recorded!");

      setForm({
        OrderDate: "",
        TotalAmount: "",
        PaymentStatus: false,
        ReceivedDate: "",
        supplier: "",
      });

    } catch (err) {
      console.error("FULL ERROR:", err.response?.data || err);
      alert("❌ Error saving sale");
    }
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>Sales / Purchase Order</h2>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              width: "700px",
              background: "#1e293b",
              padding: "30px",
              borderRadius: "12px",
              color: "white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
            }}
          >
            {/* Order Date */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label>Order Date</label>
              <input
                type="date"
                name="OrderDate"
                value={form.OrderDate}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* Total Amount */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label>Total Amount</label>
              <input
                type="number"
                name="TotalAmount"
                value={form.TotalAmount}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* Payment Status */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label>Payment Status</label>
              <select
                name="PaymentStatus"
                value={form.PaymentStatus}
                onChange={(e) =>
                  setForm({
                    ...form,
                    PaymentStatus: e.target.value === "true",
                  })
                }
                style={inputStyle}
              >
                <option value="false">Unpaid</option>
                <option value="true">Paid</option>
              </select>
            </div>

            {/* Received Date */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <label>Received Date</label>
              <input
                type="date"
                name="ReceivedDate"
                value={form.ReceivedDate}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* Supplier */}
            <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "5px" }}>
              <label>Supplier</label>
              <select
                name="supplier"
                value={form.supplier}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select Supplier</option>
                {suppliers.map((sup) => (
                  <option key={sup.id} value={sup.id}>
                    {getValue(sup, "SupplierName")}
                  </option>
                ))}
              </select>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              style={{
                gridColumn: "span 2",
                padding: "12px",
                background: "linear-gradient(90deg, #7c3aed, #9333ea)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sales;