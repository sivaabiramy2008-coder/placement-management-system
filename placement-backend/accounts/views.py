from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password

from .models import Student
from .serializers import StudentSerializer


# =====================================================
# REGISTER STUDENT
# =====================================================

@api_view(['POST'])
def register_student(request):

    email = request.data.get('email')
    register_number = request.data.get('register_number')

    if Student.objects.filter(email=email).exists():
        return Response(
            {
                'message': 'Email already registered.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if register_number and Student.objects.filter(
        register_number=register_number
    ).exists():

        return Response(
            {
                'message': 'Register number already registered.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = StudentSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                'message': 'Registration successful.',
                'student': serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# =====================================================
# LOGIN STUDENT
# =====================================================

@api_view(['POST'])
def login_student(request):

    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:

        return Response(
            {
                'message':
                'Email and password are required.'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    try:

        student = Student.objects.get(
            email=email
        )

    except Student.DoesNotExist:

        return Response(
            {
                'message':
                'Invalid email or password.'
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    if not check_password(
        password,
        student.password
    ):

        return Response(
            {
                'message':
                'Invalid email or password.'
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    return Response(
        {
            'message':
            'Login successful.',

            'student': {

                'id': student.id,

                'first_name':
                student.first_name,

                'last_name':
                student.last_name,

                'email':
                student.email,

                'register_number':
                student.register_number
            }
        },

        status=status.HTTP_200_OK
    )


# =====================================================
# STUDENTS CRUD
# =====================================================

@api_view(['GET', 'POST'])
def students_list(request):

    # -----------------------------
    # GET ALL STUDENTS
    # -----------------------------

    if request.method == 'GET':

        students = Student.objects.all().order_by(
            '-created_at'
        )

        serializer = StudentSerializer(
            students,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


    # -----------------------------
    # CREATE STUDENT
    # -----------------------------

    if request.method == 'POST':

        email = request.data.get('email')
        register_number = request.data.get(
            'register_number'
        )

        if Student.objects.filter(
            email=email
        ).exists():

            return Response(
                {
                    'message':
                    'Email already registered.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if register_number and Student.objects.filter(
            register_number=register_number
        ).exists():

            return Response(
                {
                    'message':
                    'Register number already registered.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = StudentSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    'message':
                    'Student created successfully.',

                    'student':
                    serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# =====================================================
# SINGLE STUDENT CRUD
# =====================================================

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def student_detail(request, student_id):

    try:

        student = Student.objects.get(
            id=student_id
        )

    except Student.DoesNotExist:

        return Response(
            {
                'message':
                'Student not found.'
            },
            status=status.HTTP_404_NOT_FOUND
        )


    # -----------------------------
    # GET ONE STUDENT
    # -----------------------------

    if request.method == 'GET':

        serializer = StudentSerializer(
            student
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


    # -----------------------------
    # UPDATE STUDENT
    # -----------------------------

    if request.method in ['PUT', 'PATCH']:

        email = request.data.get(
            'email'
        )

        if email:

            email_exists = Student.objects.filter(
                email=email
            ).exclude(
                id=student.id
            ).exists()

            if email_exists:

                return Response(
                    {
                        'message':
                        'Email already registered.'
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )


        serializer = StudentSerializer(
            student,
            data=request.data,
            partial=(request.method == 'PATCH')
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    'message':
                    'Student updated successfully.',

                    'student':
                    serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


    # -----------------------------
    # DELETE STUDENT
    # -----------------------------

    if request.method == 'DELETE':

        student.delete()

        return Response(
            {
                'message':
                'Student deleted successfully.'
            },
            status=status.HTTP_200_OK
        )