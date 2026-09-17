from django.db import models
from companies.models import Company


class Job(models.Model):
    JOB_TYPES = [
        ("Full Time", "Full Time"),
        ("Internship", "Internship"),
        ("Part Time", "Part Time"),
        ("Contract", "Contract"),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    title = models.CharField(max_length=200)

    job_type = models.CharField(
        max_length=50,
        choices=JOB_TYPES,
        default="Full Time"
    )

    location = models.CharField(max_length=150)

    package_lpa = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True
    )

    openings = models.PositiveIntegerField(default=1)

    application_deadline = models.DateField()

    description = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.title} - {self.company.name}"