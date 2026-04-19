import { useEffect, useState } from "react";
import api from "./api";
import Navbar from "./Navbar";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  const [form, setForm] = useState({
    SupplierName: "",
    ContactPerson: "",
    PhoneNumber: "",
    EmailAddress: "",
    LicenseNumber: "",
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await api.get("/suppliers");
      console.log("SUPPLIERS:", res.data);
      setSuppliers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getValue = (obj, field) => {
    return obj.attributes ? obj.attributes[field] : obj[field];
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.SupplierName) {
      alert("Supplier name required");
      return;
    }

    try {
      await api.post("/suppliers", {
        data: form,
      });

      alert("✅ Supplier added!");
      fetchSuppliers();

      setForm({
        SupplierName: "",
        ContactPerson: "",
        PhoneNumber: "",
        EmailAddress: "",
        LicenseNumber: "",
      });

    } catch (err) {
      console.error("ERROR:", err.response?.data || err);
      alert("❌ Error adding supplier");
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>Suppliers</h2>

        {/* FORM */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              width: "600px",
              background: "#1e293b",
              padding: "20px",
              borderRadius: "10px",
              color: "white"
            }}
          >
            <input name="SupplierName" placeholder="Supplier Name" value={form.SupplierName} onChange={handleChange} required />
            <input name="ContactPerson" placeholder="Contact Person" value={form.ContactPerson} onChange={handleChange} required />

            <input name="PhoneNumber" placeholder="Phone Number" value={form.PhoneNumber} onChange={handleChange} required />
            <input name="EmailAddress" placeholder="Email Address" value={form.EmailAddress} onChange={handleChange} required />

            <input name="LicenseNumber" placeholder="License Number" value={form.LicenseNumber} onChange={handleChange} required />

            <button
              type="submit"
              style={{
                gridColumn: "span 2",
                padding: "10px",
                background: "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: "5px"
              }}
            >
              Add Supplier
            </button>
          </form>
        </div>

        {/* LIST */}
        <div>
          {suppliers.length === 0 ? (
            <p style={{ textAlign: "center" }}>No suppliers yet</p>
          ) : (
            suppliers.map((sup) => (
              <div
                key={sup.id}
                style={{
                  padding: "15px",
                  marginBottom: "10px",
                  background: "#1e293b",
                  color: "white",
                  borderRadius: "10px"
                }}
              >
                <h3>{getValue(sup, "SupplierName")}</h3>
                <p><b>Contact:</b> {getValue(sup, "ContactPerson")}</p>
                <p><b>Phone:</b> {getValue(sup, "PhoneNumber")}</p>
                <p><b>Email:</b> {getValue(sup, "EmailAddress")}</p>
                <p><b>License:</b> {getValue(sup, "LicenseNumber")}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Suppliers;