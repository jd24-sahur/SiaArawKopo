import { useEffect, useState } from "react";
import api from "./api";
import Navbar from "./Navbar";

function AddInventory() {
  const [medicines, setMedicines] = useState([]);

  const [form, setForm] = useState({
    medicineId: "",
    newBrand: "",
    newGeneric: "",
    batch: "",
    quantity: "",
    expiry: "",
    location: ""
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await api.get("/medicines");
      setMedicines(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let medicineId = form.medicineId;

      // 🔥 CREATE NEW MEDICINE IF NONE SELECTED
      if (!medicineId) {
        const newMed = await api.post("/medicines", {
          data: {
            BrandName: form.newBrand,
            GenericName: form.newGeneric
          }
        });

        medicineId = newMed.data.data.id;
      }

      // 🔥 CREATE STOCK
      await api.post("/stock-inventories", {
        data: {
          BatchNumber: form.batch,
          QuantityOnHand: Number(form.quantity),
          ExpiryDate: form.expiry,
          StorageLocation: form.location,
          medicine: medicineId
        }
      });

      alert("✅ Inventory Added!");

      setForm({
        medicineId: "",
        newBrand: "",
        newGeneric: "",
        batch: "",
        quantity: "",
        expiry: "",
        location: ""
      });

    } catch (err) {
      console.error(err.response?.data || err);
      alert("❌ Error saving inventory");
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Add Inventory</h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "400px",
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
            color: "white"
          }}
        >

          {/* SELECT EXISTING MEDICINE */}
          <select
            name="medicineId"
            value={form.medicineId}
            onChange={handleChange}
            style={{ padding: "10px" }}
          >
            <option value="">-- Select Medicine --</option>
            {medicines.map((m) => (
              <option key={m.id} value={m.id}>
                {m.BrandName || m.attributes?.BrandName}
              </option>
            ))}
          </select>

          <p style={{ textAlign: "center" }}>OR create new</p>

          <input
            name="newBrand"
            placeholder="Brand Name"
            value={form.newBrand}
            onChange={handleChange}
          />

          <input
            name="newGeneric"
            placeholder="Generic Name"
            value={form.newGeneric}
            onChange={handleChange}
          />

          <hr />

          {/* STOCK FIELDS */}
          <input
            name="batch"
            placeholder="Batch Number"
            value={form.batch}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Storage Location"
            value={form.location}
            onChange={handleChange}
          />

          <button
            type="submit"
            style={{
              padding: "10px",
              background: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
          >
            Save Inventory
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddInventory;