import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName === "" && password === "") {
      setError("Please fill all the field. ");
    }
    const data = {
      userName,
      password,
    };
    console.log(data);
    try {
      setloading(true);
      const response=await axios.post("http://localhost:7000/api/v1/users/login", data, {
        withCredentials: true,
      });
      window.location.href="http://localhost:5174/"
      setUserName("");

      setPassword("");

    } catch (err) {
      console.log(err);
      setError("something went wrong. Please try again");
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center ">
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "480px", width: "100%" }}
      >
        <h3 className="text-center mb-1">Login Now</h3>
        {error && (
          <div className="alert alert-danger py-2 text-center" role="alert">
            {error}
          </div>
        )}
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* ------------- Username */}
            <div className="mb-3">
              <label htmlFor="lgn-usr" className="form-control-label">
                Username
              </label>

              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i class="fa-solid fa-at"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="lgn-usr"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* =================Password */}
            <div className="mb-4">
              <label htmlFor="lgn-usr" className="form-control-label">
                Password
              </label>

              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i class="fa-solid fa-at"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="lgn-usr"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* ----------------button */}
            <div className="d-grid mb-3">
              <button className="btn btn-primary py-2 " disabled={loading}>
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Login Now....
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <p className="text-center mb-0 ">
              Don't have accoun?{" "}
              <Link to={"/signup"} className="fw-semibold">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
