from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Job
from .serializers import JobSerializer


@api_view(["GET", "POST"])
def jobs_list(request):

    if request.method == "GET":
        jobs = Job.objects.select_related(
            "company"
        ).all().order_by("-created_at")

        serializer = JobSerializer(
            jobs,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    serializer = JobSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()

        return Response(
            {
                "message": "Job created successfully.",
                "job": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET", "PUT", "PATCH", "DELETE"])
def job_detail(request, job_id):

    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return Response(
            {"message": "Job not found."},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":

        serializer = JobSerializer(job)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    if request.method in ["PUT", "PATCH"]:

        serializer = JobSerializer(
            job,
            data=request.data,
            partial=request.method == "PATCH"
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    "message": "Job updated successfully.",
                    "job": serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    job.delete()

    return Response(
        {"message": "Job deleted successfully."},
        status=status.HTTP_200_OK
    )