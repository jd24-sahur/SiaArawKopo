import { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/local/register", form);

      alert("✅ Account created!");

      navigate("/"); // 👉 balik login

    } catch (err) {
      console.error(err.response?.data || err);
      alert("❌ Error creating account");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a",
      color: "white"
    }}>
      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "30px",
          borderRadius: "10px",
          background: "#1e293b",
          width: "300px"
        }}
      >
        <h2 style={{ textAlign: "center" }}>Create Account</h2>

        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

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
          Register
        </button>

        <p
          onClick={() => navigate("/")}
          style={{ textAlign: "center", cursor: "pointer", fontSize: "12px" }}
        >
          Back to Login
        </p>
      </form>
    </div>
  );
}

export default Register;