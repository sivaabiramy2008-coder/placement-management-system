from django.db import models
from accounts.models import Student
from jobs.models import Job


class Application(models.Model):

    STATUS_CHOICES = [
        ("Applied", "Applied"),
        ("Under Review", "Under Review"),
        ("Shortlisted", "Shortlisted"),
        ("Interview", "Interview"),
        ("Selected", "Selected"),
        ("Rejected", "Rejected"),
    ]

    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="Applied"
    )

    applied_at = models.DateTimeField(
        auto_now_add=True
    )

    remarks = models.TextField(
        blank=True,
        null=True
    )

    class Meta:
        unique_together = (
            "student",
            "job"
        )

    def __str__(self):
        return (
            f"{self.student.first_name} - "
            f"{self.job.title}"
        )