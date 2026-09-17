"""
Django settings for config project.
"""

from pathlib import Path
import os

from dotenv import load_dotenv
import dj_database_url


BASE_DIR = Path(__file__).resolve().parent.parent

# Load local .env file
load_dotenv(BASE_DIR / ".env")


# ---------------------------------------------------------
# Security
# ---------------------------------------------------------

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "django-insecure-development-key-change-in-production"
)

DEBUG = os.getenv("DEBUG", "True").lower() == "true"


ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    ".onrender.com",
]


# ---------------------------------------------------------
# Application definition
# ---------------------------------------------------------

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "rest_framework",
    "corsheaders",

    "accounts",
    "companies",
    "jobs",
    "applications",
]


# ---------------------------------------------------------
# Middleware
# ---------------------------------------------------------

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# ---------------------------------------------------------
# URLs
# ---------------------------------------------------------

ROOT_URLCONF = "config.urls"


# ---------------------------------------------------------
# Templates
# ---------------------------------------------------------

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# ---------------------------------------------------------
# WSGI
# ---------------------------------------------------------

WSGI_APPLICATION = "config.wsgi.application"


# ---------------------------------------------------------
# Database
# ---------------------------------------------------------

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            ssl_require=True,
        )
    }
else:
    # Local development database
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }


# ---------------------------------------------------------
# Password validation
# ---------------------------------------------------------

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "UserAttributeSimilarityValidator"
        ),
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "MinimumLengthValidator"
        ),
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "CommonPasswordValidator"
        ),
    },
    {
        "NAME": (
            "django.contrib.auth.password_validation."
            "NumericPasswordValidator"
        ),
    },
]


# ---------------------------------------------------------
# Internationalization
# ---------------------------------------------------------

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True
USE_TZ = True


# ---------------------------------------------------------
# Static files
# ---------------------------------------------------------

STATIC_URL = "static/"


# ---------------------------------------------------------
# Email
# ---------------------------------------------------------

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://placement-management-system-phi-six.vercel.app",
]


# ---------------------------------------------------------
# REST Framework
# ---------------------------------------------------------

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
}


# ---------------------------------------------------------
# Default primary key
# ---------------------------------------------------------

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"