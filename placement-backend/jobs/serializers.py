from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(
        source="company.name",
        read_only=True
    )

    class Meta:
        model = Job
        fields = [
            "id",
            "company",
            "company_name",
            "title",
            "job_type",
            "location",
            "package_lpa",
            "openings",
            "application_deadline",
            "description",
            "created_at",
        ]