import { useState } from "react";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/local", {
        identifier,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.jwt);

      // ✅ SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: res.data.user?.username,
          email: res.data.user?.email,
        })
      );

      alert("✅ Login success!");

      navigate("/dashboard");

    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err);
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "30px",
          borderRadius: "10px",
          background: "#1e293b",
          width: "300px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "none" }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "none" }}
          required
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        {/* ✅ FIXED CREATE ACCOUNT LINK */}
        <Link
          to="/register"
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#c084fc",
            textDecoration: "none",
          }}
        >
          Create account
        </Link>
      </form>
    </div>
  );
}

export default Login;