import { useEffect, useState } from "react";
import api from "./api";
import Navbar from "./Navbar";

function Medicines() {
  const [medicines, setMedicines] = useState([]);

  const [form, setForm] = useState({
    MedicineID: "",
    BrandName: "",
    GenericName: "",
    DosageForm: "",
    Manufacturer: "",
    Strength: "",
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

  const getValue = (med, field) => {
    return med.attributes ? med.attributes[field] : med[field];
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/medicines", {
        data: form,
      });

      alert("✅ Medicine added!");
      fetchMedicines();

      setForm({
        MedicineID: "",
        BrandName: "",
        GenericName: "",
        DosageForm: "",
        Manufacturer: "",
        Strength: "",
      });

    } catch (err) {
      console.error(err.response?.data || err);
      alert("❌ Error adding medicine");
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2 style={{ textAlign: "center" }}>Medicines</h2>

        {/* FORM (TOP CENTER) */}
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
            <input name="MedicineID" placeholder="Medicine ID" value={form.MedicineID} onChange={handleChange} />
            <input name="BrandName" placeholder="Brand Name" value={form.BrandName} onChange={handleChange} required />

            <input name="GenericName" placeholder="Generic Name" value={form.GenericName} onChange={handleChange} required />
            <input name="DosageForm" placeholder="Dosage Form" value={form.DosageForm} onChange={handleChange} />

            <input name="Manufacturer" placeholder="Manufacturer" value={form.Manufacturer} onChange={handleChange} />
            <input name="Strength" placeholder="Strength" value={form.Strength} onChange={handleChange} />

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
              Add Medicine
            </button>
          </form>
        </div>

        {/* LIST */}
        <div>
          {medicines.length === 0 ? (
            <p style={{ textAlign: "center" }}>No medicines yet</p>
          ) : (
            medicines.map((med) => (
              <div
                key={med.id}
                style={{
                  padding: "15px",
                  marginBottom: "10px",
                  background: "#1e293b",
                  color: "white",
                  borderRadius: "10px"
                }}
              >
                <h3>{getValue(med, "BrandName")}</h3>
                <p><b>Generic:</b> {getValue(med, "GenericName")}</p>
                <p><b>Form:</b> {getValue(med, "DosageForm")}</p>
                <p><b>Manufacturer:</b> {getValue(med, "Manufacturer")}</p>
                <p><b>Strength:</b> {getValue(med, "Strength")}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Medicines;