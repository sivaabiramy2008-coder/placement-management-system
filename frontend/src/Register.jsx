import { useState } from "react";
import "./Register.css";

function Register({ onBackToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    registerNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      firstName,
      lastName,
      email,
      registerNumber,
      password,
      confirmPassword,
    } = formData;

    setError("");
    setSuccess("");

    // Frontend validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !registerNumber ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Send registration data to Django
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            register_number: registerNumber,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.message) {
          setError(data.message);
        } else {
          setError(
            "Registration failed. Please check your details."
          );
        }

        setLoading(false);
        return;
      }

      setSuccess(
        "Registration successful! Your account has been created."
      );

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        registerNumber: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error) {
      setError(
        "Cannot connect to the server. Please make sure Django is running."
      );
    }

    setLoading(false);
  };

  return (
    <div className="register-page">

      <div className="register-background">
        <div className="register-circle circle-a"></div>
        <div className="register-circle circle-b"></div>
        <div className="register-glow glow-a"></div>
        <div className="register-grid"></div>
      </div>

      <div className="register-container">

        {/* LEFT SIDE */}

        <section className="register-intro">

          <div className="register-brand">

            <div className="register-logo">
              P
            </div>

            <div>
              <h1>Placement Portal</h1>
              <p>Campus Recruitment Management</p>
            </div>

          </div>

          <div className="register-message">

            <span className="register-badge">
              STUDENT REGISTRATION
            </span>

            <h2>
              Start your
              <br />
              <span>placement journey.</span>
            </h2>

            <p>
              Create your student account to discover
              opportunities, apply for jobs and track
              your placement progress.
            </p>

            <div className="register-points">

              <div>
                <span>01</span>

                <div>
                  <strong>Create your profile</strong>
                  <p>
                    Add your academic and personal details.
                  </p>
                </div>
              </div>

              <div>
                <span>02</span>

                <div>
                  <strong>Explore opportunities</strong>
                  <p>
                    Find companies matching your eligibility.
                  </p>
                </div>
              </div>

              <div>
                <span>03</span>

                <div>
                  <strong>Track applications</strong>
                  <p>
                    Stay updated throughout recruitment.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* REGISTER CARD */}

        <section className="register-section">

          <div className="register-card">

            <div className="register-header">

              <button
                type="button"
                className="back-button"
                onClick={onBackToLogin}
              >
                ← Back to Login
              </button>

              <h2>Create student account</h2>

              <p>
                Enter your details to get started
              </p>

            </div>


            <form onSubmit={handleSubmit}>

              {/* FIRST + LAST NAME */}

              <div className="register-row">

                <div className="register-field">

                  <label>
                    First Name *
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />

                </div>


                <div className="register-field">

                  <label>
                    Last Name *
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />

                </div>

              </div>


              {/* EMAIL */}

              <div className="register-field">

                <label>
                  Email Address *
                </label>

                <div className="register-input">

                  <span>✉</span>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />

                </div>

              </div>


              {/* REGISTER NUMBER */}

              <div className="register-field">

                <label>
                  Register Number *
                </label>

                <div className="register-input">

                  <span>▣</span>

                  <input
                    type="text"
                    name="registerNumber"
                    value={formData.registerNumber}
                    onChange={handleChange}
                    placeholder="Enter register number"
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="register-row">

                <div className="register-field">

                  <label>
                    Password *
                  </label>

                  <div className="register-input">

                    <span>🔒</span>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      ◉
                    </button>

                  </div>

                </div>


                {/* CONFIRM PASSWORD */}

                <div className="register-field">

                  <label>
                    Confirm Password *
                  </label>

                  <div className="register-input">

                    <span>🔒</span>

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      ◉
                    </button>

                  </div>

                </div>

              </div>


              {/* ERROR */}

              {error && (
                <div className="form-message error-message">
                  ⚠ {error}
                </div>
              )}


              {/* SUCCESS */}

              {success && (
                <div className="form-message success-message">
                  ✓ {success}
                </div>
              )}


              {/* TERMS */}

              <label className="terms">

                <input
                  type="checkbox"
                  required
                />

                <span>
                  I agree to the

                  <button type="button">
                    Terms & Conditions
                  </button>

                  and

                  <button type="button">
                    Privacy Policy
                  </button>

                </span>

              </label>


              {/* SUBMIT */}

              <button
                type="submit"
                className="register-submit"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}

                {!loading && <span>→</span>}
              </button>

            </form>


            {/* LOGIN */}

            <div className="register-login">

              <span>
                Already have an account?
              </span>

              <button
                type="button"
                onClick={onBackToLogin}
              >
                Login
              </button>

            </div>


            {/* SECURITY */}

            <div className="register-security">

              <span>🔐</span>

              <p>
                Your information is securely protected
                and used only for placement purposes.
              </p>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}

export default Register;