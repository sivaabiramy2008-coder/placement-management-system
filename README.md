# Placement Management System

A full-stack web-based Placement Management System developed to manage students, companies, job opportunities, applications, shortlisted candidates, selected candidates, and placement-related reports.

## 🌐 Live Demo

### Frontend
https://placement-management-system-phi-six.vercel.app/

### Backend API
https://placement-management-system-t19p.onrender.com/

### Source Code
https://github.com/sivaabiramy2008-coder/placement-management-system

---

## 📌 Project Overview

The Placement Management System is designed to simplify and manage the complete placement process through a centralized web application.

The system provides separate modules for managing:

- Students
- Companies
- Job Opportunities
- Applications
- Shortlisted Candidates
- Selected Candidates
- Reports
- User Settings

The application follows a full-stack architecture with a React frontend, Django REST API backend, and PostgreSQL database.

---

## 🎯 Objectives

- Manage student placement information efficiently.
- Maintain company and job opportunity details.
- Allow students to register and login.
- Manage job applications.
- Track shortlisted and selected students.
- Provide placement-related reports.
- Perform CRUD operations through REST APIs.
- Provide a responsive and user-friendly interface.
- Deploy the application using cloud platforms.

---

## 🚀 Features

### Student Management
- Student registration
- Student login
- View student details
- Add student
- Update student
- Delete student

### Company Management
- Add companies
- View companies
- Update company information
- Delete companies

### Job Management
- Add job opportunities
- View available jobs
- Update job details
- Delete jobs
- Search and filter jobs

### Application Management
- Apply for jobs
- View applications
- Track application status
- Update application information
- Delete applications

### Shortlisting
- Manage shortlisted candidates
- Track shortlisted students

### Selection
- Manage selected candidates
- Track placement selection status

### Reports
- View placement-related information
- Generate placement reports

### Authentication
- Student registration
- Student login
- Password validation
- Secure password hashing

---

## 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend
- Python
- Django
- Django REST Framework

### Database
- PostgreSQL
- Neon PostgreSQL

### Deployment
- Vercel – Frontend
- Render – Backend
- Neon – Database

### Version Control
- Git
- GitHub

---

## 🏗️ System Architecture

```text
                 ┌─────────────────────┐
                 │      User           │
                 │   Student/Admin     │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   React Frontend    │
                 │       Vite          │
                 │      Vercel         │
                 └──────────┬──────────┘
                            │
                       REST API
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Django Backend    │
                 │ Django REST API     │
                 │       Render        │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ PostgreSQL Database │
                 │       Neon          │
                 └─────────────────────┘
