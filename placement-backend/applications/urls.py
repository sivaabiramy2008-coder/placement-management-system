from django.urls import path

from .views import (
    applications_list,
    application_detail
)


urlpatterns = [
    path(
        "applications/",
        applications_list,
        name="applications-list"
    ),

    path(
        "applications/<int:application_id>/",
        application_detail,
        name="application-detail"
    ),
]