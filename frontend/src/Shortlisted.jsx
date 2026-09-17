import { useEffect, useState } from "react";
import "./Shortlisted.css";

const APPLICATIONS_API =
  "https://placement-management-system-t19p.onrender.com/api/applications/";

function Shortlisted({ onNavigate }) {

  const student =
    JSON.parse(
      localStorage.getItem("student")
    ) || {};

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchApplications =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            APPLICATIONS_API
          );

        const data =
          await response.json();

        setApplications(data);

      } catch (error) {

        console.error(
          "Error fetching applications:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {
    fetchApplications();
  }, []);

  const shortlisted =
    applications.filter(
      (application) =>
        application.status ===
          "Shortlisted" &&
        (!student.id ||
          application.student === student.id)
    );

  const handleBackToDashboard = () => {
    if (typeof onNavigate === "function") {
      onNavigate("dashboard");
    }
  };

  return (
    <div className="shortlisted-page">

      <div className="shortlisted-container">

        {/* Header */}
        <div className="shortlisted-header">

          <div>
            <p>
              PLACEMENT MANAGEMENT
            </p>

            <h1>
              Shortlisted
            </h1>

            <span>
              Your shortlisted placement opportunities
            </span>
          </div>

          <div className="shortlisted-header-actions">

            <div className="shortlisted-count">
              {shortlisted.length}
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

        {/* Loading */}
        {loading ? (

          <div className="shortlisted-empty">
            Loading shortlisted applications...
          </div>

        ) : shortlisted.length === 0 ? (

          /* Empty State */
          <div className="shortlisted-empty">

            <div className="shortlisted-icon">
              ✓
            </div>

            <h2>
              No shortlisted applications
            </h2>

            <p>
              Applications that reach the
              Shortlisted stage will appear here.
            </p>

          </div>

        ) : (

          /* Shortlisted Applications */
          <div className="shortlisted-grid">

            {shortlisted.map(
              (application) => (

                <div
                  className="shortlisted-card"
                  key={application.id}
                >

                  <div className="shortlisted-card-top">

                    <div className="shortlisted-company-logo">
                      {application.company_name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <span className="shortlisted-badge">
                      Shortlisted
                    </span>

                  </div>

                  <h2>
                    {application.job_title}
                  </h2>

                  <h3>
                    {application.company_name}
                  </h3>

                  <p>
                    Candidate:
                    {" "}
                    {application.student_name}
                  </p>

                  <p>
                    Applied:
                    {" "}
                    {new Date(
                      application.applied_at
                    ).toLocaleDateString()}
                  </p>

                  {application.remarks && (
                    <div className="shortlisted-remarks">
                      {application.remarks}
                    </div>
                  )}

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default Shortlisted;
