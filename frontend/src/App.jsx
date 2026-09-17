import { useState } from "react";
import "./App.css";

import Home from "./Home";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Students from "./Students";
import Companies from "./Companies";
import Jobs from "./Jobs";
import Applications from "./Applications";
import Shortlisted from "./Shortlisted";
import Selected from "./Selected";
import Reports from "./Reports";
import Settings from "./Settings";

function App() {
  // =====================================================
  // CURRENT PAGE
  // =====================================================

  const [currentPage, setCurrentPage] = useState("home");

  // =====================================================
  // LOGIN STATES
  // =====================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // =====================================================
  // CHECK LOGIN
  // =====================================================

  const isLoggedIn = () => {
    return localStorage.getItem("student") !== null;
  };

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handleNavigation = (page) => {
    // ---------------------------------------------
    // Dashboard requires login
    // ---------------------------------------------

    if (page === "dashboard") {
      if (isLoggedIn()) {
        setCurrentPage("dashboard");
      } else {
        setError("");
        setCurrentPage("login");
      }

      return;
    }

    // ---------------------------------------------
    // All dashboard pages require login
    // ---------------------------------------------

    const protectedPages = [
      "students",
      "companies",
      "jobs",
      "applications",
      "shortlisted",
      "selected",
      "reports",
      "settings",
    ];

    if (protectedPages.includes(page)) {
      if (isLoggedIn()) {
        setCurrentPage(page);
      } else {
        setError("");
        setCurrentPage("login");
      }

      return;
    }

    // ---------------------------------------------
    // Public pages
    // ---------------------------------------------

    setCurrentPage(page);
  };

  // =====================================================
  // GO BACK TO DASHBOARD
  // =====================================================

  const goToDashboard = () => {
    if (isLoggedIn()) {
      setCurrentPage("dashboard");
    } else {
      setCurrentPage("login");
    }
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://placement-management-system-t19p.onrender.com/api/login/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Invalid email or password."
        );

        setLoading(false);
        return;
      }

      // ---------------------------------------------
      // Save logged-in student
      // ---------------------------------------------

      localStorage.setItem(
        "student",
        JSON.stringify(data.student)
      );

      // ---------------------------------------------
      // Clear login fields
      // ---------------------------------------------

      setEmail("");
      setPassword("");
      setError("");

      // ---------------------------------------------
      // Login success → Dashboard
      // ---------------------------------------------

      setCurrentPage("dashboard");
    } catch (error) {
      setError(
        "Cannot connect to the server. Please make sure Django is running."
      );
    }

    setLoading(false);
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("student");

    setEmail("");
    setPassword("");
    setError("");
    setCurrentPage("home");
  };

  // =====================================================
  // REGISTER → LOGIN
  // =====================================================

  const handleRegisterBack = () => {
    setError("");
    setCurrentPage("login");
  };

  // =====================================================
  // HOME PAGE
  // =====================================================

  if (currentPage === "home") {
    return (
      <Home
        onNavigate={handleNavigation}
      />
    );
  }

  // =====================================================
  // REGISTER PAGE
  // =====================================================

  if (currentPage === "register") {
    return (
      <Register
        onBackToLogin={handleRegisterBack}
      />
    );
  }

  // =====================================================
  // DASHBOARD
  // =====================================================

  if (currentPage === "dashboard") {
    return (
      <Dashboard
        onLogout={handleLogout}
        onNavigate={handleNavigation}
      />
    );
  }

  // =====================================================
  // STUDENTS
  // =====================================================

  if (currentPage === "students") {
    return (
      <Students
        onNavigate={handleNavigation}
      />
    );
  }

  // =====================================================
  // COMPANIES
  // =====================================================

  if (currentPage === "companies") {
    return (
      <Companies
        onNavigate={handleNavigation}
      />
    );
  }

  // =====================================================
  // JOBS
  // =====================================================

  if (currentPage === "jobs") {
    return (
      <Jobs
        onNavigate={handleNavigation}
      />
    );
  }

  // =====================================================
  // APPLICATIONS
  // =====================================================

  if (currentPage === "applications") {
    return (
      <Applications
        onNavigate={handleNavigation}
      />
    );
  }

  // =====================================================
  // SHORTLISTED
  // =====================================================

  if (currentPage === "shortlisted") {
    return (
      <Shortlisted
        onNavigate={handleNavigation}
      />
    );
  }

  // =====================================================
  // SELECTED
  // =====================================================

  if (currentPage === "selected") {
    return (
      <Selected
        onNavigate={handleNavigation}
      />
    );
  }

  // =====================================================
  // REPORTS
  // =====================================================

  if (currentPage === "reports") {
    return (
      <Reports
        onNavigate={handleNavigation}
      />
    );
  }

  // =====================================================
  // SETTINGS
  // =====================================================

  if (currentPage === "settings") {
    return (
      <Settings
        onNavigate={handleNavigation}
      />
    );
  }

  // =====================================================
  // LOGIN PAGE
  // =====================================================

  return (
    <div className="login-page">

      {/* ============================================
          BACKGROUND
      ============================================ */}

      <div className="background-decoration">

        <div className="circle circle-one"></div>

        <div className="circle circle-two"></div>

        <div className="circle circle-three"></div>

        <div className="glow glow-one"></div>

        <div className="glow glow-two"></div>

        <div className="grid-pattern"></div>

      </div>

      {/* ============================================
          LOGIN CONTAINER
      ============================================ */}

      <div className="login-container">

        {/* ==========================================
            LEFT SIDE
        ========================================== */}

        <section className="login-intro">

          <div className="brand">

            <div className="brand-logo">
              P
            </div>

            <div>
              <h1>Placement Portal</h1>

              <p>
                Campus Recruitment Management
              </p>
            </div>

          </div>

          <div className="intro-content">

            <span className="welcome-badge">
              STUDENT PLACEMENT SYSTEM
            </span>

            <h2>
              Connect your
              <br />

              <span>talent</span> with the
              <br />

              right opportunity.
            </h2>

            <p>
              Manage placements, discover opportunities,
              track applications and build your professional
              career — all in one platform.
            </p>

            <div className="feature-list">

              <div className="feature-item">

                <div className="feature-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Smart Placement Tracking
                  </strong>

                  <span>
                    Track every application and placement status.
                  </span>
                </div>

              </div>

              <div className="feature-item">

                <div className="feature-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Company Opportunities
                  </strong>

                  <span>
                    Explore eligible companies and job openings.
                  </span>
                </div>

              </div>

              <div className="feature-item">

                <div className="feature-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Real-Time Updates
                  </strong>

                  <span>
                    Stay informed about interviews and results.
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div className="intro-footer">

            <span>
              © 2026 Placement Management System
            </span>

            <span>
              Secure • Reliable • Student Focused
            </span>

          </div>

        </section>

        {/* ==========================================
            LOGIN SECTION
        ========================================== */}

        <section className="login-section">

          <div className="login-card">

            <div className="mobile-brand">

              <div className="mobile-logo">
                P
              </div>

              <span>
                Placement Portal
              </span>

            </div>

            <div className="login-header">

              <h2>
                Welcome back
              </h2>

              <p>
                Sign in to access your placement dashboard
              </p>

            </div>

            <form onSubmit={handleLogin}>

              {/* ====================================
                  ERROR MESSAGE
              ==================================== */}

              {error && (
                <div
                  style={{
                    background: "#fff1f2",
                    color: "#dc2626",
                    border: "1px solid #fecdd3",
                    borderRadius: "10px",
                    padding: "12px 14px",
                    marginBottom: "18px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {error}
                </div>
              )}

              {/* ====================================
                  EMAIL
              ==================================== */}

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <div className="input-box">

                  <span className="input-icon">
                    ✉
                  </span>

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    required
                  />

                </div>

              </div>

              {/* ====================================
                  PASSWORD
              ==================================== */}

              <div className="form-group">

                <label>
                  Password
                </label>

                <div className="input-box">

                  <span className="input-icon">
                    🔒
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    required
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "◉" : "◉"}
                  </button>

                </div>

              </div>

              {/* ====================================
                  OPTIONS
              ==================================== */}

              <div className="login-options">

                <label className="remember-me">

                  <input
                    type="checkbox"
                  />

                  <span>
                    Remember me
                  </span>

                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    setError(
                      "Password reset will be available soon."
                    )
                  }
                >
                  Forgot password?
                </button>

              </div>

              {/* ====================================
                  LOGIN BUTTON
              ==================================== */}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >

                <span>
                  {loading
                    ? "Signing in..."
                    : "Login"}
                </span>

                {!loading && (
                  <span className="arrow">
                    →
                  </span>
                )}

              </button>

            </form>

            {/* ======================================
                DIVIDER
            ====================================== */}

            <div className="divider">
              <span>OR</span>
            </div>

            {/* ======================================
                REGISTER
            ====================================== */}

            <div className="register-area">

              <p>
                Don't have an account?
              </p>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage("register")
                }
              >
                Create student account
              </button>

            </div>

            {/* ======================================
                SECURITY
            ====================================== */}

            <div className="security-note">

              <span>
                🔐
              </span>

              <p>
                Your account information is securely protected.
              </p>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default App;
