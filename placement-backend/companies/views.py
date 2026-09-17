from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Company
from .serializers import CompanySerializer


@api_view(['GET', 'POST'])
def companies_list(request):

    if request.method == 'GET':
        companies = Company.objects.all().order_by('-created_at')
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        serializer = CompanySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    'message': 'Company created successfully.',
                    'company': serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def company_detail(request, company_id):

    try:
        company = Company.objects.get(id=company_id)
    except Company.DoesNotExist:
        return Response(
            {'message': 'Company not found.'},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        serializer = CompanySerializer(company)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method in ['PUT', 'PATCH']:
        serializer = CompanySerializer(
            company,
            data=request.data,
            partial=(request.method == 'PATCH')
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    'message': 'Company updated successfully.',
                    'company': serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    if request.method == 'DELETE':
        company.delete()

        return Response(
            {'message': 'Company deleted successfully.'},
            status=status.HTTP_200_OK
        )