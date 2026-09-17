import { useState } from "react";
import "./Dashboard.css";

function Dashboard({ onLogout, onNavigate }) {
  const [student] = useState(() => {
    const savedStudent = localStorage.getItem("student");

    if (savedStudent) {
      return JSON.parse(savedStudent);
    }

    return {
      first_name: "Student",
      last_name: "",
      email: "",
      register_number: "",
    };
  });

  const studentName =
    `${student.first_name || ""} ${student.last_name || ""}`.trim() ||
    "Student";

  const avatarLetter =
    student.first_name?.charAt(0).toUpperCase() || "S";

  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-brand">
          <div className="sidebar-logo">P</div>

          <div>
            <h2>Placement</h2>
            <span>Portal</span>
          </div>
        </div>

        <div className="sidebar-section">
          MAIN MENU
        </div>

        <nav className="sidebar-menu">

          {/* DASHBOARD */}
          <button
            className="menu-item active"
            onClick={() => handleNavigation("dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          {/* STUDENTS */}
          <button
            className="menu-item"
            onClick={() => handleNavigation("students")}
          >
            <span>👨‍🎓</span>
            Students
          </button>

          {/* COMPANIES */}
          <button
            className="menu-item"
            onClick={() => handleNavigation("companies")}
          >
            <span>🏢</span>
            Companies
          </button>

          {/* JOBS */}
          <button
            className="menu-item"
            onClick={() => handleNavigation("jobs")}
          >
            <span>💼</span>
            Jobs
          </button>

          {/* APPLICATIONS */}
          <button
            className="menu-item"
            onClick={() => handleNavigation("applications")}
          >
            <span>📄</span>
            Applications
          </button>

          {/* SHORTLISTED */}
          <button
            className="menu-item"
            onClick={() => handleNavigation("shortlisted")}
          >
            <span>✓</span>
            Shortlisted
          </button>

          {/* SELECTED */}
          <button
            className="menu-item"
            onClick={() => handleNavigation("selected")}
          >
            <span>★</span>
            Selected
          </button>

          <div className="sidebar-section">
            MANAGEMENT
          </div>

          {/* REPORTS */}
          <button
            className="menu-item"
            onClick={() => handleNavigation("reports")}
          >
            <span>📊</span>
            Reports
          </button>

          {/* SETTINGS */}
          <button
            className="menu-item"
            onClick={() => handleNavigation("settings")}
          >
            <span>⚙</span>
            Settings
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="user-mini">

            <div className="user-avatar">
              {avatarLetter}
            </div>

            <div>
              <strong>{studentName}</strong>

              <span>
                {student.register_number || "Student Account"}
              </span>
            </div>

          </div>

          <button
            className="logout-button"
            onClick={onLogout}
          >
            ↪ Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* TOPBAR */}
        <header className="dashboard-header">

          <div>
            <h1>Dashboard</h1>

            <p>
              Welcome back, {student.first_name || "Student"}! Here's your
              placement overview.
            </p>
          </div>

          <div className="header-actions">

            <button className="notification-button">
              🔔
              <span></span>
            </button>

            <div className="profile-box">

              <div className="profile-avatar">
                {avatarLetter}
              </div>

              <div>
                <strong>{studentName}</strong>

                <small>
                  {student.register_number
                    ? `Register No: ${student.register_number}`
                    : "Placement Candidate"}
                </small>
              </div>

            </div>

          </div>

        </header>

        {/* STUDENT INFORMATION */}
        <section
          className="dashboard-card"
          style={{ marginBottom: "24px" }}
        >

          <div className="card-header">

            <div>
              <h3>Student Profile</h3>

              <p>
                Your registered placement account details
              </p>
            </div>

          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "18px",
              paddingTop: "10px",
            }}
          >

            <div>
              <small>Full Name</small>

              <strong
                style={{
                  display: "block",
                  marginTop: "6px",
                }}
              >
                {studentName}
              </strong>
            </div>

            <div>
              <small>Email Address</small>

              <strong
                style={{
                  display: "block",
                  marginTop: "6px",
                }}
              >
                {student.email || "Not available"}
              </strong>
            </div>

            <div>
              <small>Register Number</small>

              <strong
                style={{
                  display: "block",
                  marginTop: "6px",
                }}
              >
                {student.register_number || "Not available"}
              </strong>
            </div>

            <div>
              <small>Account Type</small>

              <strong
                style={{
                  display: "block",
                  marginTop: "6px",
                }}
              >
                Student
              </strong>
            </div>

          </div>

        </section>

        {/* STAT CARDS */}
        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon blue">
              📄
            </div>

            <div>
              <span>Total Applications</span>
              <h2>12</h2>
              <small>+3 this month</small>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon purple">
              ⏳
            </div>

            <div>
              <span>Applications Pending</span>
              <h2>5</h2>
              <small>Awaiting response</small>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon green">
              ✓
            </div>

            <div>
              <span>Shortlisted</span>
              <h2>4</h2>
              <small>Interview opportunities</small>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon orange">
              ★
            </div>

            <div>
              <span>Selected</span>
              <h2>2</h2>
              <small>Congratulations!</small>
            </div>

          </div>

        </section>

        {/* CONTENT GRID */}
        <section className="dashboard-content">

          {/* APPLICATION STATUS */}
          <div className="dashboard-card">

            <div className="card-header">

              <div>
                <h3>Application Status</h3>

                <p>
                  Your current recruitment progress
                </p>
              </div>

              <button
                onClick={() =>
                  handleNavigation("applications")
                }
              >
                View All
              </button>

            </div>

            <div className="application-list">

              <div className="application-row">

                <div className="company-icon">
                  T
                </div>

                <div className="application-info">
                  <strong>Tech Solutions</strong>
                  <span>Software Engineer</span>
                </div>

                <span className="status interview">
                  Interview
                </span>

              </div>

              <div className="application-row">

                <div className="company-icon">
                  I
                </div>

                <div className="application-info">
                  <strong>Innovate Systems</strong>
                  <span>Java Developer</span>
                </div>

                <span className="status shortlisted">
                  Shortlisted
                </span>

              </div>

              <div className="application-row">

                <div className="company-icon">
                  D
                </div>

                <div className="application-info">
                  <strong>Digital Works</strong>
                  <span>Frontend Developer</span>
                </div>

                <span className="status pending">
                  Pending
                </span>

              </div>

              <div className="application-row">

                <div className="company-icon">
                  A
                </div>

                <div className="application-info">
                  <strong>Alpha Technologies</strong>
                  <span>Full Stack Developer</span>
                </div>

                <span className="status selected">
                  Selected
                </span>

              </div>

            </div>

          </div>

          {/* UPCOMING EVENTS */}
          <div className="dashboard-card">

            <div className="card-header">

              <div>
                <h3>Upcoming Events</h3>

                <p>
                  Important placement activities
                </p>
              </div>

            </div>

            <div className="event-list">

              <div className="event-item">

                <div className="event-date">
                  <strong>18</strong>
                  <span>SEP</span>
                </div>

                <div>
                  <strong>
                    Technical Interview
                  </strong>

                  <span>
                    Tech Solutions • 10:30 AM
                  </span>
                </div>

              </div>

              <div className="event-item">

                <div className="event-date">
                  <strong>21</strong>
                  <span>SEP</span>
                </div>

                <div>
                  <strong>
                    Online Assessment
                  </strong>

                  <span>
                    Innovate Systems • 2:00 PM
                  </span>
                </div>

              </div>

              <div className="event-item">

                <div className="event-date">
                  <strong>25</strong>
                  <span>SEP</span>
                </div>

                <div>
                  <strong>
                    HR Interview
                  </strong>

                  <span>
                    Digital Works • 11:00 AM
                  </span>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* QUICK ACTIONS */}
        <section className="quick-section">

          <div className="section-title">

            <h3>
              Quick Actions
            </h3>

            <p>
              Manage your placement activities
            </p>

          </div>

          <div className="quick-grid">

            <button
              onClick={() =>
                handleNavigation("jobs")
              }
            >
              <span>🔎</span>

              <div>
                <strong>Find Jobs</strong>

                <small>
                  Explore opportunities
                </small>
              </div>

            </button>

            <button
              onClick={() =>
                handleNavigation("applications")
              }
            >
              <span>📄</span>

              <div>
                <strong>My Applications</strong>

                <small>
                  Track applications
                </small>
              </div>

            </button>

            <button
              onClick={() =>
                handleNavigation("profile")
              }
            >
              <span>👤</span>

              <div>
                <strong>My Profile</strong>

                <small>
                  Update your details
                </small>
              </div>

            </button>

            <button
              onClick={() =>
                handleNavigation("reports")
              }
            >
              <span>📈</span>

              <div>
                <strong>Placement Reports</strong>

                <small>
                  View your progress
                </small>
              </div>

            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;