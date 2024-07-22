from rest_framework import serializers
from .models import Item
from .models import User


class itemSerializer(serializers.ModelSerializer):
    class Meta:
        model=Item
        fields= '__all__'


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields= '__all__'        