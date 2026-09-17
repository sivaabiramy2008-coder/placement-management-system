import { useEffect, useState } from "react";
import "./Jobs.css";

const JOBS_API =
  "http://127.0.0.1:8000/api/jobs/";

const COMPANIES_API =
  "http://127.0.0.1:8000/api/companies/";

function Jobs({ onNavigate }) {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [formData, setFormData] = useState({
    company: "",
    title: "",
    job_type: "Full Time",
    location: "",
    package_lpa: "",
    openings: 1,
    application_deadline: "",
    description: "",
  });

  useEffect(() => {
    fetchJobs();
    fetchCompanies();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch(JOBS_API);
      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }

      setJobs(data);
      setError("");
    } catch {
      setError("Unable to load jobs.");
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch(COMPANIES_API);
      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }

      setCompanies(data);
    } catch {
      setError("Unable to load companies.");
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      company: "",
      title: "",
      job_type: "Full Time",
      location: "",
      package_lpa: "",
      openings: 1,
      application_deadline: "",
      description: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const url = editingId
        ? `${JOBS_API}${editingId}/`
        : JOBS_API;

      const method = editingId
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error();
      }

      setMessage(
        editingId
          ? "Job updated successfully."
          : "Job added successfully."
      );

      resetForm();
      fetchJobs();
    } catch {
      setError("Unable to save job.");
    }
  };

  const handleEdit = (job) => {
    setEditingId(job.id);

    setFormData({
      company: job.company,
      title: job.title,
      job_type: job.job_type,
      location: job.location,
      package_lpa: job.package_lpa || "",
      openings: job.openings,
      application_deadline:
        job.application_deadline,
      description: job.description || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this job?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${JOBS_API}${id}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      setMessage(
        "Job deleted successfully."
      );

      fetchJobs();
    } catch {
      setError(
        "Unable to delete job."
      );
    }
  };

  /* BACK TO DASHBOARD */
  const handleBackToDashboard = () => {
    if (typeof onNavigate === "function") {
      onNavigate("dashboard");
    }
  };

  return (
    <div className="jobs-page">

      <div className="jobs-container">

        {/* HEADER */}

        <div className="jobs-header">

          <div>
            <p>
              PLACEMENT MANAGEMENT
            </p>

            <h1>Jobs</h1>

            <span>
              Manage campus job opportunities
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
              onClick={fetchJobs}
            >
              ↻ Refresh
            </button>

          </div>

        </div>

        {/* SUCCESS MESSAGE */}

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* JOB FORM */}

        <div className="job-form-card">

          <h2>
            {editingId
              ? "Edit Job"
              : "Add Job"}
          </h2>

          <form
            onSubmit={handleSubmit}
          >

            <div className="job-form-grid">

              {/* COMPANY */}

              <div>
                <label>
                  Company *
                </label>

                <select
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Company
                  </option>

                  {companies.map(
                    (company) => (
                      <option
                        key={company.id}
                        value={company.id}
                      >
                        {company.name}
                      </option>
                    )
                  )}

                </select>
              </div>

              {/* JOB TITLE */}

              <div>
                <label>
                  Job Title *
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Software Engineer"
                  required
                />
              </div>

              {/* JOB TYPE */}

              <div>
                <label>
                  Job Type *
                </label>

                <select
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                >

                  <option>
                    Full Time
                  </option>

                  <option>
                    Internship
                  </option>

                  <option>
                    Part Time
                  </option>

                  <option>
                    Contract
                  </option>

                </select>
              </div>

              {/* LOCATION */}

              <div>
                <label>
                  Location *
                </label>

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Chennai"
                  required
                />
              </div>

              {/* PACKAGE */}

              <div>
                <label>
                  Package (LPA)
                </label>

                <input
                  type="number"
                  step="0.01"
                  name="package_lpa"
                  value={formData.package_lpa}
                  onChange={handleChange}
                  placeholder="7.5"
                />
              </div>

              {/* OPENINGS */}

              <div>
                <label>
                  Openings *
                </label>

                <input
                  type="number"
                  min="1"
                  name="openings"
                  value={formData.openings}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* DEADLINE */}

              <div>
                <label>
                  Application Deadline *
                </label>

                <input
                  type="date"
                  name="application_deadline"
                  value={
                    formData.application_deadline
                  }
                  onChange={handleChange}
                  required
                />
              </div>

              {/* DESCRIPTION */}

              <div className="full-width">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Job description..."
                />

              </div>

            </div>

            {/* FORM BUTTONS */}

            <div className="job-form-actions">

              <button
                type="submit"
              >
                {editingId
                  ? "Update Job"
                  : "Add Job"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="cancel-job"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        {/* JOB TABLE */}

        <div className="jobs-table-card">

          <div className="jobs-list-title">

            <h2>
              Job Opportunities
            </h2>

            <span>
              {jobs.length} jobs
            </span>

          </div>

          <div className="jobs-table-wrapper">

            <table className="jobs-table">

              <thead>

                <tr>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Package</th>
                  <th>Openings</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {jobs.map((job) => (

                  <tr key={job.id}>

                    <td>
                      <strong>
                        {job.company_name}
                      </strong>
                    </td>

                    <td>
                      {job.title}
                    </td>

                    <td>
                      {job.job_type}
                    </td>

                    <td>
                      {job.location}
                    </td>

                    <td>
                      {job.package_lpa
                        ? `${job.package_lpa} LPA`
                        : "—"}
                    </td>

                    <td>
                      {job.openings}
                    </td>

                    <td>
                      {job.application_deadline}
                    </td>

                    <td>

                      <div className="job-actions">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(job)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(job.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {jobs.length === 0 && (
              <div className="no-jobs">
                No jobs available.
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Jobs;