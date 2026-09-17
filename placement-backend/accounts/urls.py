from django.urls import path

from .views import (
    register_student,
    login_student,
    students_list,
    student_detail
)


urlpatterns = [

    # Authentication
    path(
        'register/',
        register_student,
        name='register'
    ),

    path(
        'login/',
        login_student,
        name='login'
    ),

    # Students CRUD
    path(
        'students/',
        students_list,
        name='students-list'
    ),

    path(
        'students/<int:student_id>/',
        student_detail,
        name='student-detail'
    ),
]