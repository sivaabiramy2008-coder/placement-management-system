import { useEffect, useState } from "react";
import "./Applications.css";

const APPLICATIONS_API =
  "http://127.0.0.1:8000/api/applications/";

const JOBS_API =
  "http://127.0.0.1:8000/api/jobs/";

function Applications({ onNavigate }) {

  const student =
    JSON.parse(
      localStorage.getItem("student")
    ) || {};

  const [applications, setApplications] =
    useState([]);

  const [jobs, setJobs] =
    useState([]);

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      job: "",
      status: "Applied",
      remarks: "",
    });

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  const fetchApplications = async () => {

    try {

      const response =
        await fetch(
          APPLICATIONS_API
        );

      const data =
        await response.json();

      setApplications(data);

    } catch {

      setError(
        "Unable to load applications."
      );

    }
  };

  const fetchJobs = async () => {

    try {

      const response =
        await fetch(
          JOBS_API
        );

      const data =
        await response.json();

      setJobs(data);

    } catch {

      setError(
        "Unable to load jobs."
      );

    }
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    setMessage("");
    setError("");

    if (!student.id) {

      setError(
        "Student information not found. Please login again."
      );

      return;
    }

    try {

      const response =
        await fetch(
          APPLICATIONS_API,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              student: student.id,
              job: formData.job,
              status: formData.status,
              remarks: formData.remarks,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.detail ||
          "Unable to apply."
        );

      }

      setMessage(
        "Application submitted successfully."
      );

      setFormData({
        job: "",
        status: "Applied",
        remarks: "",
      });

      fetchApplications();

    } catch (err) {

      setError(
        err.message ||
        "Unable to submit application."
      );

    }
  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      const response =
        await fetch(
          `${APPLICATIONS_API}${id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              status,
            }),
          }
        );

      if (!response.ok) {
        throw new Error();
      }

      setMessage(
        `Application moved to ${status}.`
      );

      fetchApplications();

    } catch {

      setError(
        "Unable to update application."
      );

    }
  };

  const deleteApplication =
    async (id) => {

      if (
        !window.confirm(
          "Delete this application?"
        )
      ) {
        return;
      }

      try {

        const response =
          await fetch(
            `${APPLICATIONS_API}${id}/`,
            {
              method: "DELETE",
            }
          );

        if (!response.ok) {
          throw new Error();
        }

        fetchApplications();

        setMessage(
          "Application deleted successfully."
        );

      } catch {

        setError(
          "Unable to delete application."
        );

      }
    };

  const filteredApplications =
    applications.filter(
      (application) => {

        const studentMatch =
          !student.id ||
          application.student === student.id;

        const statusMatch =
          statusFilter === "All" ||
          application.status ===
            statusFilter;

        return (
          studentMatch &&
          statusMatch
        );
      }
    );

  const handleBackToDashboard = () => {

    if (typeof onNavigate === "function") {
      onNavigate("dashboard");
    }

  };

  return (
    <div className="applications-page">

      <div className="applications-container">

        {/* Header */}
        <div className="applications-header">

          <div>
            <p>
              PLACEMENT MANAGEMENT
            </p>

            <h1>
              Applications
            </h1>

            <span>
              Track your placement applications
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

        {/* Success Message */}
        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Application Form */}
        <div className="application-form-card">

          <h2>
            Apply for a Job
          </h2>

          <form
            onSubmit={handleSubmit}
          >

            <div className="application-grid">

              <div>

                <label>
                  Job
                </label>

                <select
                  value={formData.job}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      job: event.target.value,
                    })
                  }
                  required
                >

                  <option value="">
                    Select Job
                  </option>

                  {jobs.map((job) => (

                    <option
                      key={job.id}
                      value={job.id}
                    >
                      {job.company_name}
                      {" - "}
                      {job.title}
                    </option>

                  ))}

                </select>

              </div>

              <div>

                <label>
                  Status
                </label>

                <select
                  value={formData.status}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      status:
                        event.target.value,
                    })
                  }
                >

                  <option>
                    Applied
                  </option>

                  <option>
                    Under Review
                  </option>

                  <option>
                    Shortlisted
                  </option>

                  <option>
                    Interview
                  </option>

                  <option>
                    Selected
                  </option>

                  <option>
                    Rejected
                  </option>

                </select>

              </div>

              <div className="full-width">

                <label>
                  Remarks
                </label>

                <textarea
                  rows="3"
                  value={
                    formData.remarks
                  }
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      remarks:
                        event.target.value,
                    })
                  }
                  placeholder="Optional remarks"
                />

              </div>

            </div>

            <button
              className="apply-button"
              type="submit"
            >
              Submit Application
            </button>

          </form>

        </div>

        {/* Applications List */}
        <div className="applications-card">

          <div className="application-toolbar">

            <div>

              <h2>
                My Applications
              </h2>

              <span>
                {filteredApplications.length}
                {" "}
                applications
              </span>

            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >

              <option>
                All
              </option>

              <option>
                Applied
              </option>

              <option>
                Under Review
              </option>

              <option>
                Shortlisted
              </option>

              <option>
                Interview
              </option>

              <option>
                Selected
              </option>

              <option>
                Rejected
              </option>

            </select>

          </div>

          <div className="applications-table-wrapper">

            <table className="applications-table">

              <thead>

                <tr>
                  <th>Company</th>
                  <th>Job</th>
                  <th>Status</th>
                  <th>Applied</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredApplications.map(
                  (application) => (

                    <tr
                      key={application.id}
                    >

                      <td>

                        <strong>
                          {
                            application.company_name
                          }
                        </strong>

                      </td>

                      <td>
                        {
                          application.job_title
                        }
                      </td>

                      <td>

                        <span
                          className={`application-status status-${application.status
                            .toLowerCase()
                            .replaceAll(
                              " ",
                              "-"
                            )}`}
                        >
                          {application.status}
                        </span>

                      </td>

                      <td>

                        {new Date(
                          application.applied_at
                        ).toLocaleDateString()}

                      </td>

                      <td>

                        <select
                          value={
                            application.status
                          }
                          onChange={(event) =>
                            updateStatus(
                              application.id,
                              event.target.value
                            )
                          }
                        >

                          <option>
                            Applied
                          </option>

                          <option>
                            Under Review
                          </option>

                          <option>
                            Shortlisted
                          </option>

                          <option>
                            Interview
                          </option>

                          <option>
                            Selected
                          </option>

                          <option>
                            Rejected
                          </option>

                        </select>

                        <button
                          type="button"
                          className="delete-application"
                          onClick={() =>
                            deleteApplication(
                              application.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

            {filteredApplications.length === 0 && (

              <div className="no-applications">
                No applications found.
              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Applications;