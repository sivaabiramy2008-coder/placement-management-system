from rest_framework import serializers
from .models import Student
from django.contrib.auth.hashers import make_password


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student

        fields = [
            'id',
            'first_name',
            'last_name',
            'email',
            'register_number',
            'password',
            'created_at'
        ]

        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):

        student = Student.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            register_number=validated_data.get(
                'register_number'
            ),
            password=make_password(
                validated_data['password']
            )
        )

        return student

    def update(self, instance, validated_data):

        password = validated_data.pop(
            'password',
            None
        )

        instance.first_name = validated_data.get(
            'first_name',
            instance.first_name
        )

        instance.last_name = validated_data.get(
            'last_name',
            instance.last_name
        )

        instance.email = validated_data.get(
            'email',
            instance.email
        )

        instance.register_number = validated_data.get(
            'register_number',
            instance.register_number
        )

        if password:
            instance.password = make_password(password)

        instance.save()

        return instance