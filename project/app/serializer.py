from rest_framework import serializers
from .models import Item
from .models import User
from .models import Admin
from django.contrib.auth.hashers import check_password


class itemSerializer(serializers.ModelSerializer):
    class Meta:
        model=Item
        fields= '__all__'


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields= '__all__'        


class adminSerializer(serializers.ModelSerializer):
    class Meta:
        model=Admin
        fields= '__all__'                


class AdminLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if email and password:
            admin = Admin.objects.filter(email=email).first()

            if admin and check_password(password, admin.password):
                return admin
            else:
                print('Incorrect email or password.')
                raise serializers.ValidationError('Incorrect email or password.')
               
        else:
            print('Must include "email" and "password"')
            raise serializers.ValidationError('Must include "email" and "password".')
            