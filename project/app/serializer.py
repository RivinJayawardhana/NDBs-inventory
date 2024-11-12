from django.forms import ValidationError
from rest_framework import serializers
from .models import item
from .models import User
from .models import Admin
from .models import Documents
from .models import Trash
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed


class itemSerializer(serializers.ModelSerializer):
    class Meta:
        model=item
        fields= '__all__'


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields= '__all__'        


class adminSerializer(serializers.ModelSerializer):
    class Meta:
        model=Admin
        fields= '__all__'                


class DocumentsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Documents
        fields= '__all__'                

class TrashSerializer(serializers.ModelSerializer):
    class Meta:
        model=Trash
        fields= '__all__'   