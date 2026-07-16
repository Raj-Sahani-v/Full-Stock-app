import  { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

export const Signup = () => {
  const [phone, setPhone] = useState("");
  //const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [term, setTerm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const passwordsMatch =
    conformPassword.length > 0 && password === conformPassword;
  const passwordsMismatch =
    conformPassword.length > 0 && password !== conformPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!phone || !password || !conformPassword) {
      setError("Please fill all the fields.");
      return;
    }

    if (password !== conformPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    if (!term) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    const data = { phone, password, conformPassword, term };

    try {
      setLoading(true);
      await axios.post("http://localhost:7000/api/v1/users/signup", data);
      console.log("Signup successful:", data);

      setPhone("");
      setPassword("");
      setConformPassword("");
      setTerm(false);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "480px", width: "100%", borderRadius: "16px" }}
      >
        <div className="card-body p-4 p-md-5">
          <h3 className="text-center fw-bold mb-1">Create Account</h3>
          <p className="text-center text-muted mb-4">
            Sign up to get started
          </p>

          {error && (
            <div className="alert alert-danger py-2 text-center" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/*--------------------------------- Phone / Email */}
            <div className="mb-3">
              <label htmlFor="signupPhone" className="form-label fw-semibold">
                Phone no. / Email
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="signupPhone"
                  placeholder="Enter phone number or email"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/*---------------------------------- Password */}
            <div className="mb-3">
              <label htmlFor="signupPassword" className="form-label fw-semibold">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="signupPassword"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="input-group-text bg-light"
                  role="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <i
                    className={`fa-solid ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
            </div>

            {/*-------------------- Confirm Password */}
            <div className="mb-3">
              <label htmlFor="signupConfirmPassword" className="form-label fw-semibold">
                Confirm Password
              </label>
              <div className="input-group has-validation">
                <span className="input-group-text bg-light">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    passwordsMatch
                      ? "is-valid"
                      : passwordsMismatch
                      ? "is-invalid"
                      : ""
                  }`}
                  id="signupConfirmPassword"
                  placeholder="Re-enter password"
                  value={conformPassword}
                  onChange={(e) => setConformPassword(e.target.value)}
                  required
                />
                <div className="invalid-feedback">Passwords do not match.</div>
                {passwordsMatch && (
                  <div className="valid-feedback">Passwords match.</div>
                )}
              </div>
            </div>

            {/* ------------------------------Terms */}
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                checked={term}
                onChange={(e) => setTerm(e.target.checked)}
                id="agreeTerms"
                required
              />
              <label className="form-check-label" htmlFor="agreeTerms">
                I agree to the{" "}
                <a href="" className="text-decoration-none">
                  terms and conditions
                </a>
              </label>
            </div>

            {/*-------------------- Submit */}
            <div className="d-grid mb-3">
              <button
                className="btn btn-primary py-2 fw-semibold"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Signing up...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>

            <p className="text-center mb-0">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold text-decoration-none">
                Login Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};