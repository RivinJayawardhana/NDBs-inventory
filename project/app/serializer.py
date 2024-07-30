from django.forms import ValidationError
from rest_framework import serializers
from .models import Item
from .models import User
from .models import Admin
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed


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


