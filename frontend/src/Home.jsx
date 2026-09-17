import { useState } from "react";
import "./Home.css";

function Home({ onNavigate }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const goTo = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Jobs page-ku search details pass panna
    if (onNavigate) {
      onNavigate("jobs");
    }
  };

  const categories = [
    {
      title: "IT & Software",
      icon: "💻",
      jobs: "120+ Jobs",
      value: "IT & Software",
    },
    {
      title: "Data Analyst",
      icon: "📊",
      jobs: "85+ Jobs",
      value: "Data Analyst",
    },
    {
      title: "Marketing",
      icon: "📣",
      jobs: "60+ Jobs",
      value: "Marketing",
    },
    {
      title: "Finance",
      icon: "💰",
      jobs: "45+ Jobs",
      value: "Finance",
    },
    {
      title: "HR & Admin",
      icon: "👥",
      jobs: "35+ Jobs",
      value: "HR & Admin",
    },
    {
      title: "Engineering",
      icon: "⚙️",
      jobs: "70+ Jobs",
      value: "Engineering",
    },
  ];

  const featuredJobs = [
    {
      company: "TCS",
      logo: "T",
      title: "Software Engineer",
      location: "Chennai",
      type: "Full Time",
      category: "IT & Software",
    },
    {
      company: "Infosys",
      logo: "I",
      title: "Java Developer",
      location: "Bangalore",
      type: "Full Time",
      category: "IT & Software",
    },
    {
      company: "Accenture",
      logo: "A",
      title: "Data Analyst",
      location: "Chennai",
      type: "Full Time",
      category: "Data Analyst",
    },
    {
      company: "Wipro",
      logo: "W",
      title: "Frontend Developer",
      location: "Coimbatore",
      type: "Hybrid",
      category: "IT & Software",
    },
  ];

  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}

      <header className="home-navbar">

        <div className="home-logo-area">
          <div className="home-logo">P</div>

          <div>
            <h2>Placement</h2>
            <span>Portal</span>
          </div>
        </div>

        <nav className="home-nav">

          <button
            className="nav-link active"
            onClick={() => goTo("home")}
          >
            Home
          </button>

          <button
            className="nav-link"
            onClick={() => goTo("dashboard")}
          >
            Dashboard
          </button>

          <button
            className="nav-link"
            onClick={() => {
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            How It Works
          </button>

          <button
            className="nav-link"
            onClick={() => {
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            About
          </button>

        </nav>

        <button
          className="nav-login-button"
          onClick={() => goTo("login")}
        >
          Login →
        </button>

      </header>


      {/* ================= HERO ================= */}

      <section className="hero-section">

        <div className="hero-content">

          <span className="hero-badge">
            STUDENT CAREER PLATFORM
          </span>

          <h1>
            Build Your
            <br />
            <span>Dream Career</span>
          </h1>

          <p>
            Discover the right opportunities, connect with leading
            companies and take the next step toward your professional future.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-button"
              onClick={() => goTo("jobs")}
            >
              Explore Jobs →
            </button>

            <button
              className="secondary-button"
              onClick={() => {
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              How It Works
            </button>

          </div>

          <div className="hero-trust">

            <span>✓ Verified Companies</span>
            <span>✓ Latest Opportunities</span>
            <span>✓ Student Friendly</span>

          </div>

        </div>


        {/* LAPTOP IMAGE */}

        <div className="hero-image-area">

          <div className="image-glow"></div>

          <div className="hero-image-card">

            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85"
              alt="Laptop and career workspace"
            />

            <div className="floating-card floating-job-card">

              <div className="floating-icon">💼</div>

              <div>
                <strong>Latest Jobs</strong>
                <span>New opportunities</span>
              </div>

            </div>

            <div className="floating-card floating-company-card">

              <div className="floating-icon">🏢</div>

              <div>
                <strong>Top Companies</strong>
                <span>TCS • Infosys • Wipro</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SEARCH ================= */}

      <section className="search-section">

        <div className="search-heading">
          <span>FIND YOUR OPPORTUNITY</span>
          <h2>Search Jobs</h2>
          <p>
            Find the right job based on your skills, category and location.
          </p>
        </div>

        <form
          className="job-search-box"
          onSubmit={handleSearch}
        >

          <div className="search-field">

            <span>🔎</span>

            <input
              type="text"
              placeholder="Job title, skill or company"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <div className="search-field">

            <span>▣</span>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="IT & Software">IT & Software</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="HR & Admin">HR & Admin</option>
              <option value="Engineering">Engineering</option>
            </select>

          </div>

          <div className="search-field">

            <span>📍</span>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Remote">Remote</option>
            </select>

          </div>

          <button
            type="submit"
            className="search-button"
          >
            Search Jobs →
          </button>

        </form>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="categories-section">

        <div className="section-heading">

          <div>
            <span>EXPLORE OPPORTUNITIES</span>
            <h2>Browse Jobs by Category</h2>
          </div>

          <button
            onClick={() => goTo("jobs")}
          >
            View All Jobs →
          </button>

        </div>

        <div className="category-grid">

          {categories.map((item) => (

            <button
              className="category-card"
              key={item.title}
              onClick={() => goTo("jobs")}
            >

              <div className="category-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <span>{item.jobs}</span>

              <div className="category-arrow">
                →
              </div>

            </button>

          ))}

        </div>

      </section>


      {/* ================= FEATURED JOBS ================= */}

      <section className="featured-section">

        <div className="section-heading">

          <div>
            <span>TOP OPPORTUNITIES</span>
            <h2>Featured Job Opportunities</h2>
          </div>

          <button
            onClick={() => goTo("jobs")}
          >
            View All Jobs →
          </button>

        </div>

        <div className="featured-grid">

          {featuredJobs.map((job) => (

            <button
              className="featured-job-card"
              key={job.company}
              onClick={() => goTo("jobs")}
            >

              <div className="job-top">

                <div className="company-logo">
                  {job.logo}
                </div>

                <span className="save-job">
                  ♡
                </span>

              </div>

              <div className="job-details">

                <span className="company-name">
                  {job.company}
                </span>

                <h3>{job.title}</h3>

                <p>📍 {job.location}</p>

              </div>

              <div className="job-tags">

                <span>{job.type}</span>
                <span>{job.category}</span>

              </div>

              <div className="apply-link">
                View Job →
              </div>

            </button>

          ))}

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section
        className="how-section"
        id="how-it-works"
      >

        <div className="section-heading centered">

          <div>
            <span>SIMPLE PROCESS</span>
            <h2>How It Works</h2>
            <p>
              Start your placement journey in four simple steps.
            </p>
          </div>

        </div>

        <div className="steps-grid">

          <div className="step-card">

            <div className="step-number">01</div>

            <div className="step-icon">👤</div>

            <h3>Create Account</h3>

            <p>
              Register as a student and create your placement profile.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">02</div>

            <div className="step-icon">🔎</div>

            <h3>Find Opportunities</h3>

            <p>
              Search jobs and companies that match your career goals.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">03</div>

            <div className="step-icon">📄</div>

            <h3>Apply for Jobs</h3>

            <p>
              Submit applications and track your recruitment progress.
            </p>

          </div>

          <div className="step-card">

            <div className="step-number">04</div>

            <div className="step-icon">🎯</div>

            <h3>Get Selected</h3>

            <p>
              Attend interviews and move closer to your dream career.
            </p>

          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        className="about-section"
        id="about"
      >

        <div className="about-content">

          <span>ABOUT PLACEMENT PORTAL</span>

          <h2>
            Connecting Students
            <br />
            With <strong>Better Opportunities</strong>
          </h2>

          <p>
            Placement Portal is designed to simplify campus recruitment
            by bringing students, companies and job opportunities together
            in one easy-to-use platform.
          </p>

          <div className="about-points">

            <div>
              <span>✓</span>
              Verified company opportunities
            </div>

            <div>
              <span>✓</span>
              Easy application tracking
            </div>

            <div>
              <span>✓</span>
              Centralized placement management
            </div>

          </div>

        </div>

        <div className="about-visual">

          <div className="about-stat">
            <strong>500+</strong>
            <span>Job Opportunities</span>
          </div>

          <div className="about-stat">
            <strong>50+</strong>
            <span>Partner Companies</span>
          </div>

          <div className="about-stat">
            <strong>1000+</strong>
            <span>Student Profiles</span>
          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="home-footer">

        <div className="footer-brand">

          <div className="home-logo">P</div>

          <div>
            <strong>Placement Portal</strong>
            <span>Campus Recruitment Management</span>
          </div>

        </div>

        <p>
          © 2026 Placement Management System
        </p>

        <div className="footer-links">

          <button onClick={() => goTo("home")}>
            Home
          </button>

          <button onClick={() => goTo("dashboard")}>
            Dashboard
          </button>

          <button
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            About
          </button>

        </div>

      </footer>

    </div>
  );
}

export default Home;