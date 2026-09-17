import { useEffect, useState } from "react";
import "./Students.css";

const API_URL = "http://127.0.0.1:8000/api/students/";

function Students({ onNavigate }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    register_number: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // GET STUDENTS
  // ==========================================

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to load students");
      }

      setStudents(data);
    } catch (err) {
      setError("Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  const openAddForm = () => {
    setEditingStudent(null);

    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      register_number: "",
      password: "",
    });

    setMessage("");
    setError("");
    setShowForm(true);
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  const openEditForm = (student) => {
    setEditingStudent(student);

    setFormData({
      first_name: student.first_name || "",
      last_name: student.last_name || "",
      email: student.email || "",
      register_number: student.register_number || "",
      password: "",
    });

    setMessage("");
    setError("");
    setShowForm(true);
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      let response;

      if (editingStudent) {
        // UPDATE
        response = await fetch(
          `${API_URL}${editingStudent.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      } else {
        // CREATE
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      setMessage(
        editingStudent
          ? "Student updated successfully."
          : "Student added successfully."
      );

      setShowForm(false);

      fetchStudents();
    } catch (err) {
      setError(err.message);
    }
  };

  // ==========================================
  // DELETE STUDENT
  // ==========================================

  const deleteStudent = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}${id}/`,
        {
          method: "DELETE",
        }
      );

      let data = {};

      if (response.status !== 204) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to delete student."
        );
      }

      setMessage(
        "Student deleted successfully."
      );

      fetchStudents();
    } catch (err) {
      setError(err.message);
    }
  };

  // ==========================================
  // BACK TO DASHBOARD
  // ==========================================

  const handleBackToDashboard = () => {
    if (typeof onNavigate === "function") {
      onNavigate("dashboard");
    }
  };

  return (
    <div className="students-page">

      {/* HEADER */}

      <div className="students-header">

        <div>
          <h1>Students</h1>

          <p>
            Manage registered students and their
            placement information.
          </p>
        </div>

        <div className="students-header-actions">

          <button
            type="button"
            className="back-dashboard-btn"
            onClick={handleBackToDashboard}
          >
            ← Back to Dashboard
          </button>

          <button
            type="button"
            className="add-student-btn"
            onClick={openAddForm}
          >
            + Add Student
          </button>

        </div>

      </div>

      {/* MESSAGES */}

      {message && (
        <div className="success-message">
          ✓ {message}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* FORM */}

      {showForm && (
        <div className="student-form-card">

          <div className="form-header">

            <div>
              <h2>
                {editingStudent
                  ? "Edit Student"
                  : "Add New Student"}
              </h2>

              <p>
                Enter the student information below.
              </p>
            </div>

            <button
              type="button"
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">

                <label>
                  First Name
                </label>

                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Last Name
                </label>

                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Register Number
                </label>

                <input
                  type="text"
                  name="register_number"
                  value={formData.register_number}
                  onChange={handleChange}
                  placeholder="Enter register number"
                />

              </div>

              <div className="form-group full-width">

                <label>
                  {editingStudent
                    ? "New Password (optional)"
                    : "Password"}
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={
                    editingStudent
                      ? "Leave blank to keep current password"
                      : "Enter password"
                  }
                  required={!editingStudent}
                />

              </div>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
              >
                {editingStudent
                  ? "Update Student"
                  : "Add Student"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* STUDENT TABLE */}

      <div className="students-card">

        <div className="table-header">

          <div>

            <h2>
              Student List
            </h2>

            <span>
              {students.length} student
              {students.length !== 1 ? "s" : ""}
            </span>

          </div>

          <button
            type="button"
            className="refresh-btn"
            onClick={fetchStudents}
          >
            ↻ Refresh
          </button>

        </div>

        {loading ? (

          <div className="loading-state">
            Loading students...
          </div>

        ) : students.length === 0 ? (

          <div className="empty-state">
            No students found.
          </div>

        ) : (

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Register Number</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {students.map((student) => (

                  <tr key={student.id}>

                    <td>
                      #{student.id}
                    </td>

                    <td>

                      <div className="student-info">

                        <div className="student-avatar">

                          {student.first_name
                            ?.charAt(0)
                            .toUpperCase()}

                        </div>

                        <div>

                          <strong>
                            {student.first_name}{" "}
                            {student.last_name}
                          </strong>

                        </div>

                      </div>

                    </td>

                    <td>
                      {student.email}
                    </td>

                    <td>
                      {student.register_number ||
                        "Not provided"}
                    </td>

                    <td>
                      {new Date(
                        student.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() =>
                            openEditForm(student)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            deleteStudent(student.id)
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

          </div>

        )}

      </div>

    </div>
  );
}

export default Students;