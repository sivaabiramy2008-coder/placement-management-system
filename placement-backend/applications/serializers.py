from rest_framework import serializers
from .models import Application


class ApplicationSerializer(
    serializers.ModelSerializer
):

    student_name = serializers.SerializerMethodField()
    student_email = serializers.SerializerMethodField()
    job_title = serializers.CharField(
        source="job.title",
        read_only=True
    )
    company_name = serializers.CharField(
        source="job.company.name",
        read_only=True
    )

    class Meta:
        model = Application

        fields = [
            "id",
            "student",
            "student_name",
            "student_email",
            "job",
            "job_title",
            "company_name",
            "status",
            "applied_at",
            "remarks",
        ]

    def get_student_name(self, obj):
        return (
            f"{obj.student.first_name} "
            f"{obj.student.last_name}"
        ).strip()

    def get_student_email(self, obj):
        return obj.student.email