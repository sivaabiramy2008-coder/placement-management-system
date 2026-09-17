from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Application
from .serializers import ApplicationSerializer


@api_view(["GET", "POST"])
def applications_list(request):

    if request.method == "GET":

        applications = (
            Application.objects
            .select_related(
                "student",
                "job",
                "job__company"
            )
            .all()
            .order_by("-applied_at")
        )

        serializer = ApplicationSerializer(
            applications,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    serializer = ApplicationSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()

        return Response(
            {
                "message":
                    "Application created successfully.",
                "application":
                    serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET", "PUT", "PATCH", "DELETE"])
def application_detail(
    request,
    application_id
):

    try:
        application = Application.objects.get(
            id=application_id
        )

    except Application.DoesNotExist:

        return Response(
            {
                "message":
                    "Application not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":

        serializer = ApplicationSerializer(
            application
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    if request.method in ["PUT", "PATCH"]:

        serializer = ApplicationSerializer(
            application,
            data=request.data,
            partial=request.method == "PATCH"
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message":
                        "Application updated successfully.",
                    "application":
                        serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    application.delete()

    return Response(
        {
            "message":
                "Application deleted successfully."
        },
        status=status.HTTP_200_OK
    )