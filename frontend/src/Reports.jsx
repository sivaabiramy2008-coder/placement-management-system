import { useEffect, useState } from "react";
import "./Reports.css";

const APPLICATIONS_API =
  "https://placement-management-system-t19p.onrender.com/api/applications/";

const JOBS_API =
  "https://placement-management-system-t19p.onrender.com/api/jobs/";

const COMPANIES_API =
  "https://placement-management-system-t19p.onrender.com/api/companies/";

const STUDENTS_API =
  "https://placement-management-system-t19p.onrender.com/api/students/";

function Reports({ onNavigate }) {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const [
        applicationsResponse,
        jobsResponse,
        companiesResponse,
        studentsResponse,
      ] = await Promise.all([
        fetch(APPLICATIONS_API),
        fetch(JOBS_API),
        fetch(COMPANIES_API),
        fetch(STUDENTS_API),
      ]);

      if (
        !applicationsResponse.ok ||
        !jobsResponse.ok ||
        !companiesResponse.ok ||
        !studentsResponse.ok
      ) {
        throw new Error("Failed to load reports");
      }

      setApplications(
        await applicationsResponse.json()
      );

      setJobs(
        await jobsResponse.json()
      );

      setCompanies(
        await companiesResponse.json()
      );

      setStudents(
        await studentsResponse.json()
      );
    } catch (error) {
      console.error(error);
    }
  };

  const selected = applications.filter(
    (item) => item.status === "Selected"
  ).length;

  const shortlisted = applications.filter(
    (item) => item.status === "Shortlisted"
  ).length;

  const interviews = applications.filter(
    (item) => item.status === "Interview"
  ).length;

  const rejected = applications.filter(
    (item) => item.status === "Rejected"
  ).length;

  const pending = applications.filter(
    (item) =>
      item.status === "Applied" ||
      item.status === "Under Review"
  ).length;

  const placementRate =
    students.length > 0
      ? Math.min(
          100,
          Math.round(
            (selected / students.length) * 100
          )
        )
      : 0;

  const handleBackToDashboard = () => {
    if (typeof onNavigate === "function") {
      onNavigate("dashboard");
    }
  };

  return (
    <div className="reports-page">

      <div className="reports-container">

        {/* HEADER */}

        <div className="reports-header">

          <div>

            <p>
              PLACEMENT MANAGEMENT
            </p>

            <h1>
              Reports
            </h1>

            <span>
              Placement activity and recruitment overview
            </span>

          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >

            {/* BACK TO DASHBOARD */}

            <button
              type="button"
              className="back-dashboard-btn"
              onClick={handleBackToDashboard}
            >
              ← Back to Dashboard
            </button>

            {/* REFRESH */}

            <button
              type="button"
              onClick={loadReports}
            >
              ↻ Refresh
            </button>

          </div>

        </div>

        {/* REPORT STATS */}

        <div className="report-stats">

          <div className="report-card">
            <span>
              Total Students
            </span>

            <strong>
              {students.length}
            </strong>
          </div>

          <div className="report-card">
            <span>
              Companies
            </span>

            <strong>
              {companies.length}
            </strong>
          </div>

          <div className="report-card">
            <span>
              Open Jobs
            </span>

            <strong>
              {jobs.length}
            </strong>
          </div>

          <div className="report-card">
            <span>
              Applications
            </span>

            <strong>
              {applications.length}
            </strong>
          </div>

          <div className="report-card selected-report">
            <span>
              Selected
            </span>

            <strong>
              {selected}
            </strong>
          </div>

        </div>

        {/* REPORT GRID */}

        <div className="reports-grid">

          {/* APPLICATION SUMMARY */}

          <div className="report-section">

            <h2>
              Application Summary
            </h2>

            <div className="summary-row">
              <span>
                Applied / Under Review
              </span>

              <strong>
                {pending}
              </strong>
            </div>

            <div className="summary-row">
              <span>
                Shortlisted
              </span>

              <strong>
                {shortlisted}
              </strong>
            </div>

            <div className="summary-row">
              <span>
                Interview
              </span>

              <strong>
                {interviews}
              </strong>
            </div>

            <div className="summary-row">
              <span>
                Selected
              </span>

              <strong>
                {selected}
              </strong>
            </div>

            <div className="summary-row">
              <span>
                Rejected
              </span>

              <strong>
                {rejected}
              </strong>
            </div>

          </div>

          {/* PLACEMENT RATE */}

          <div className="report-section">

            <h2>
              Placement Rate
            </h2>

            <div className="placement-rate">

              <div
                className="rate-circle"
                style={{
                  "--rate": `${placementRate}%`,
                }}
              >

                <strong>
                  {placementRate}%
                </strong>

              </div>

              <p>
                Current selection rate based on
                registered students and selected
                applications.
              </p>

            </div>

          </div>

        </div>

        {/* RECENT APPLICATIONS */}

        <div className="report-section recent-section">

          <h2>
            Recent Applications
          </h2>

          <div className="recent-table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>
                    Student
                  </th>

                  <th>
                    Company
                  </th>

                  <th>
                    Job
                  </th>

                  <th>
                    Status
                  </th>
                </tr>

              </thead>

              <tbody>

                {applications
                  .slice(0, 10)
                  .map(
                    (application) => (
                      <tr
                        key={application.id}
                      >

                        <td>
                          {application.student_name}
                        </td>

                        <td>
                          {application.company_name}
                        </td>

                        <td>
                          {application.job_title}
                        </td>

                        <td>

                          <span className="report-status">
                            {application.status}
                          </span>

                        </td>

                      </tr>
                    )
                  )}

              </tbody>

            </table>

            {applications.length === 0 && (
              <div className="no-report-data">
                No application data available.
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;
