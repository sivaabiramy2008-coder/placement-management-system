import { useEffect, useState } from "react";
import "./Selected.css";

const API_URL =
  "http://127.0.0.1:8000/api/applications/";

function Selected({ onNavigate }) {
  const student =
    JSON.parse(localStorage.getItem("student")) || {};

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const selectedApplications = applications.filter(
    (application) =>
      application.status === "Selected" &&
      (!student.id || application.student === student.id)
  );

  const handleBackToDashboard = () => {
    if (typeof onNavigate === "function") {
      onNavigate("dashboard");
    }
  };

  return (
    <div className="selected-page">
      <div className="selected-container">

        {/* Header */}
        <div className="selected-header">

          <div>
            <p>PLACEMENT MANAGEMENT</p>
            <h1>Selected</h1>
            <span>
              Your final placement selections
            </span>
          </div>

          <div className="selected-header-actions">

            <div className="selected-count">
              {selectedApplications.length}
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
          <div className="selected-empty">
            Loading selections...
          </div>

        ) : selectedApplications.length === 0 ? (

          /* Empty State */
          <div className="selected-empty">

            <div className="selected-icon">
              ★
            </div>

            <h2>No selections yet</h2>

            <p>
              Applications marked as Selected will
              appear here.
            </p>

          </div>

        ) : (

          /* Selected Applications */
          <div className="selected-grid">

            {selectedApplications.map(
              (application) => (

                <div
                  className="selected-card"
                  key={application.id}
                >

                  <div className="selected-card-top">

                    <div className="selected-company-logo">
                      {application.company_name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <span className="selected-badge">
                      Selected
                    </span>

                  </div>

                  <h2>
                    {application.job_title}
                  </h2>

                  <h3>
                    {application.company_name}
                  </h3>

                  <p>
                    Candidate:{" "}
                    {application.student_name}
                  </p>

                  <p>
                    Email:{" "}
                    {application.student_email}
                  </p>

                  <p>
                    Selected on:{" "}
                    {new Date(
                      application.applied_at
                    ).toLocaleDateString()}
                  </p>

                  {application.remarks && (
                    <div className="selected-remarks">
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

export default Selected;