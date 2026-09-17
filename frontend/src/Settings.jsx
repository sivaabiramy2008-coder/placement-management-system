import { useState } from "react";
import "./Settings.css";

function Settings({ onNavigate }) {
  const student =
    JSON.parse(localStorage.getItem("student")) || {};

  const [profile, setProfile] = useState({
    first_name: student.first_name || "",
    last_name: student.last_name || "",
    email: student.email || "",
    register_number: student.register_number || "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    const updatedStudent = {
      ...student,
      ...profile,
    };

    localStorage.setItem(
      "student",
      JSON.stringify(updatedStudent)
    );

    setMessage(
      "Profile settings saved successfully."
    );
  };

  const handleBackToDashboard = () => {
    if (typeof onNavigate === "function") {
      onNavigate("dashboard");
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">

        {/* Header */}
        <div className="settings-header">

          <div className="settings-header-top">
            <div>
              <p>PLACEMENT MANAGEMENT</p>
              <h1>Settings</h1>
              <span>
                Manage your placement portal account
              </span>
            </div>

            <button
              type="button"
              className="back-dashboard-btn"
              onClick={handleBackToDashboard}
            >
              ← Back to Dashboard
            </button>
          </div>

        </div>

        {/* Success Message */}
        {message && (
          <div className="settings-message">
            {message}
          </div>
        )}

        {/* Profile Information */}
        <div className="settings-card">

          <h2>Profile Information</h2>

          <p>
            Update the information displayed in your
            placement dashboard.
          </p>

          <div className="settings-grid">

            <div>
              <label>First Name</label>

              <input
                name="first_name"
                value={profile.first_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Last Name</label>

              <input
                name="last_name"
                value={profile.last_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                value={profile.email}
                disabled
              />
            </div>

            <div>
              <label>Register Number</label>

              <input
                name="register_number"
                value={profile.register_number}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            type="button"
            className="save-settings"
            onClick={handleSave}
          >
            Save Changes
          </button>

        </div>

        {/* Account Information */}
        <div className="settings-card">

          <h2>Account Information</h2>

          <div className="account-row">
            <span>Account Type</span>
            <strong>Student</strong>
          </div>

          <div className="account-row">
            <span>Email Verification</span>

            <strong className="verified">
              Active
            </strong>
          </div>

          <div className="account-row">
            <span>Placement Portal</span>

            <strong>Secure</strong>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Settings;
