import { useEffect, useMemo, useState } from "react";
import "./Companies.css";

const API_URL = "https://placement-management-system-t19p.onrender.com/api/companies/";

/*
  Common placement companies.
  website is automatically filled when company is selected.
*/
const COMPANY_CATALOG = [
  {
    name: "TCS",
    website: "https://www.tcs.com",
    location: "Chennai",
  },
  {
    name: "Tata Elxsi",
    website: "https://www.tataelxsi.com",
    location: "Bengaluru",
  },
  {
    name: "Tech Mahindra",
    website: "https://www.techmahindra.com",
    location: "Pune",
  },
  {
    name: "TVS Motor Company",
    website: "https://www.tvsmotor.com",
    location: "Chennai",
  },
  {
    name: "Infosys",
    website: "https://www.infosys.com",
    location: "Bengaluru",
  },
  {
    name: "Wipro",
    website: "https://www.wipro.com",
    location: "Bengaluru",
  },
  {
    name: "HCLTech",
    website: "https://www.hcltech.com",
    location: "Noida",
  },
  {
    name: "Cognizant",
    website: "https://www.cognizant.com",
    location: "Chennai",
  },
  {
    name: "Accenture",
    website: "https://www.accenture.com",
    location: "Bengaluru",
  },
  {
    name: "Capgemini",
    website: "https://www.capgemini.com",
    location: "Chennai",
  },
  {
    name: "IBM",
    website: "https://www.ibm.com",
    location: "Bengaluru",
  },
  {
    name: "Amazon",
    website: "https://www.amazon.jobs",
    location: "Bengaluru",
  },
  {
    name: "Microsoft",
    website: "https://www.microsoft.com",
    location: "Hyderabad",
  },
  {
    name: "Google",
    website: "https://www.google.com",
    location: "Bengaluru",
  },
  {
    name: "Oracle",
    website: "https://www.oracle.com",
    location: "Bengaluru",
  },
  {
    name: "Zoho",
    website: "https://www.zoho.com",
    location: "Chennai",
  },
  {
    name: "Freshworks",
    website: "https://www.freshworks.com",
    location: "Chennai",
  },
  {
    name: "Mphasis",
    website: "https://www.mphasis.com",
    location: "Pune",
  },
  {
    name: "LTIMindtree",
    website: "https://www.ltimindtree.com",
    location: "Bengaluru",
  },
  {
    name: "Deloitte",
    website: "https://www.deloitte.com",
    location: "Bengaluru",
  },
];

function Companies({ onNavigate }) {
  const [companies, setCompanies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    description: "",
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to load companies");
      }

      setCompanies(data);
      setError("");
    } catch (err) {
      setError("Unable to load companies. Please check Django.");
    } finally {
      setLoading(false);
    }
  };

  /*
    Merge database companies + company catalog
    so search can show all common companies.
  */
  const allCompanies = useMemo(() => {
    const map = new Map();

    COMPANY_CATALOG.forEach((company) => {
      map.set(company.name.toLowerCase(), {
        ...company,
        fromDatabase: false,
      });
    });

    companies.forEach((company) => {
      map.set(company.name.toLowerCase(), {
        ...company,
        fromDatabase: true,
      });
    });

    return Array.from(map.values());
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      return allCompanies;
    }

    return allCompanies.filter((company) =>
      company.name.toLowerCase().includes(search)
    );
  }, [allCompanies, searchText]);

  const handleCompanySearch = (value) => {
    setSearchText(value);
    setShowSuggestions(true);

    setFormData((previous) => ({
      ...previous,
      name: value,
    }));

    /*
      Automatic website/location for exact company match.
    */
    const matchedCompany = COMPANY_CATALOG.find(
      (company) =>
        company.name.toLowerCase() === value.trim().toLowerCase()
    );

    if (matchedCompany) {
      setFormData((previous) => ({
        ...previous,
        name: matchedCompany.name,
        website: matchedCompany.website,
        location:
          previous.location || matchedCompany.location,
      }));
    }
  };

  const selectCompany = (company) => {
    setSearchText(company.name);

    setFormData((previous) => ({
      ...previous,
      name: company.name,
      website: company.website || previous.website,
      location:
        previous.location || company.location || "",
    }));

    setShowSuggestions(false);
    setMessage("");
    setError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "name") {
      handleCompanySearch(value);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      description: "",
    });

    setSearchText("");
    setEditingId(null);
    setShowSuggestions(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.location
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const url = editingId
        ? `${API_URL}${editingId}/`
        : API_URL;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Save failed");
      }

      setMessage(
        editingId
          ? "Company updated successfully."
          : "Company added successfully."
      );

      resetForm();
      fetchCompanies();
    } catch (err) {
      setError("Unable to save company.");
    }
  };

  const handleEdit = (company) => {
    setEditingId(company.id);

    setSearchText(company.name);

    setFormData({
      name: company.name || "",
      email: company.email || "",
      phone: company.phone || "",
      location: company.location || "",
      website: company.website || "",
      description: company.description || "",
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setMessage("Company deleted successfully.");
      setError("");

      fetchCompanies();
    } catch (err) {
      setError("Unable to delete company.");
    }
  };

  /*
    BACK TO DASHBOARD
  */
  const handleBackToDashboard = () => {
    if (typeof onNavigate === "function") {
      onNavigate("dashboard");
    }
  };

  return (
    <div className="companies-page">
      <div className="companies-container">

        {/* HEADER */}

        <div className="companies-header">

          <div>
            <p className="companies-small-title">
              PLACEMENT MANAGEMENT
            </p>

            <h1>Companies</h1>

            <p className="companies-subtitle">
              Search, manage and explore recruiting companies
            </p>
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

            <button
              type="button"
              className="refresh-btn"
              onClick={fetchCompanies}
            >
              ↻ Refresh
            </button>
          </div>

        </div>

        {/* SEARCH */}

        <div className="company-search-card">

          <div className="search-title">
            <h2>Search Companies</h2>

            <p>
              Type a company name to find matching placement companies
            </p>
          </div>

          <div className="company-search-box">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              value={searchText}
              placeholder="Search company... e.g. T"
              onFocus={() => setShowSuggestions(true)}
              onChange={(event) =>
                handleCompanySearch(event.target.value)
              }
            />

            {searchText && (
              <button
                type="button"
                className="clear-search"
                onClick={() => {
                  setSearchText("");

                  setFormData((previous) => ({
                    ...previous,
                    name: "",
                    website: "",
                  }));

                  setShowSuggestions(false);
                }}
              >
                ×
              </button>
            )}

          </div>

          {showSuggestions && searchText.trim() && (
            <div className="search-results">

              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company, index) => (
                  <button
                    type="button"
                    className="search-result-item"
                    key={`${company.name}-${index}`}
                    onClick={() =>
                      selectCompany(company)
                    }
                  >

                    <div className="result-logo">
                      {company.name.charAt(0)}
                    </div>

                    <div className="result-content">
                      <strong>{company.name}</strong>

                      <span>
                        {company.location ||
                          "Location not available"}
                      </span>
                    </div>

                    <span className="result-arrow">
                      →
                    </span>

                  </button>
                ))
              ) : (
                <div className="no-search-result">
                  No matching companies found.
                </div>
              )}

            </div>
          )}

        </div>

        {/* ALERTS */}

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* FORM */}

        <div className="company-form-card">

          <div className="form-title">
            <h2>
              {editingId
                ? "Edit Company"
                : "Add Company"}
            </h2>

            <p>
              Select a company from search or enter a new company.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* COMPANY */}

              <div className="input-group">

                <label>
                  Company Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Search or enter company name"
                />

                {formData.website && (
                  <div className="auto-url-box">

                    <span>🌐</span>

                    <a
                      href={formData.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {formData.website}
                    </a>

                    <span className="auto-tag">
                      Auto
                    </span>

                  </div>
                )}

              </div>

              {/* EMAIL */}

              <div className="input-group">

                <label>
                  Email <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hr@company.com"
                />

              </div>

              {/* PHONE */}

              <div className="input-group">

                <label>
                  Phone <span>*</span>
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />

              </div>

              {/* LOCATION */}

              <div className="input-group">

                <label>
                  Location <span>*</span>
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Company location"
                />

              </div>

              {/* WEBSITE */}

              <div className="input-group full-width">

                <label>
                  Website
                </label>

                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Website will appear automatically"
                />

              </div>

              {/* DESCRIPTION */}

              <div className="input-group full-width">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter company description"
                  rows="4"
                />

              </div>

            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-btn"
              >
                {editingId
                  ? "Update Company"
                  : "Add Company"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        {/* COMPANY LIST */}

        <div className="companies-list-card">

          <div className="list-header">

            <div>

              <h2>
                Company Directory
              </h2>

              <p>
                {filteredCompanies.length} matching company
                {filteredCompanies.length !== 1
                  ? "ies"
                  : "y"}
              </p>

            </div>

          </div>

          {loading ? (
            <div className="empty-state">

              <div className="loader"></div>

              <p>
                Loading companies...
              </p>

            </div>
          ) : (
            <div className="table-wrapper">

              <table className="companies-table">

                <thead>

                  <tr>
                    <th>ID</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Website</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredCompanies.map(
                    (company, index) => (

                      <tr
                        key={`${company.name}-${index}`}
                      >

                        <td>
                          {company.id
                            ? `#${company.id}`
                            : "—"}
                        </td>

                        <td>

                          <div className="company-name-cell">

                            <div className="company-avatar">
                              {company.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <span>
                              {company.name}
                            </span>

                          </div>

                        </td>

                        <td>
                          {company.email || "—"}
                        </td>

                        <td>
                          {company.phone || "—"}
                        </td>

                        <td>
                          {company.location || "—"}
                        </td>

                        <td>

                          {company.website ? (
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noreferrer"
                              className="website-link"
                            >
                              Visit Website
                            </a>
                          ) : (
                            "—"
                          )}

                        </td>

                        <td>

                          {company.fromDatabase && (
                            <div className="action-buttons">

                              <button
                                type="button"
                                className="edit-btn"
                                onClick={() =>
                                  handleEdit(company)
                                }
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="delete-btn"
                                onClick={() =>
                                  handleDelete(company.id)
                                }
                              >
                                Delete
                              </button>

                            </div>
                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Companies;
