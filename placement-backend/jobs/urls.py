from django.urls import path

from .views import jobs_list, job_detail


urlpatterns = [
    path(
        "jobs/",
        jobs_list,
        name="jobs-list"
    ),
    path(
        "jobs/<int:job_id>/",
        job_detail,
        name="job-detail"
    ),
]