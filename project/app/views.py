from django.shortcuts import render,redirect
from .models import Item, User,Admin
from .serializer import itemSerializer,userSerializer,adminSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.filters import SearchFilter
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from rest_framework import status,permissions
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny
from rest_framework.generics import GenericAPIView
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login




# Create your views here.

def index(request):
   data=Item.objects.all()
   context={"data":data}
   return render(request,"index.html",context)
#
  

class Itemview(viewsets.ModelViewSet):
     queryset = Item.objects.all()
     serializer_class = itemSerializer

class adminview(viewsets.ModelViewSet):
     queryset = Admin.objects.all()
     serializer_class = adminSerializer

class userview(viewsets.ModelViewSet):
     queryset = User.objects.all()
     serializer_class = userSerializer

class UserListView(viewsets.ModelViewSet):
    serializer_class = userSerializer
    queryset = User.objects.all()
    filter_backends = [SearchFilter]
    search_fields = ['dept']

  
       
    

def login(request):
     if request.method == 'POST':
          form=AuthenticationForm(request,data=request.POST)
          if form.is_valid():
               user=form.get_user()
               login(request,user)
               return Response(status=status.HTTP_200_OK)

def updateDatata(request,id):
     if request.method=="POST":
        Name=request.POST['name']
        number=request.POST['Itemnumber']
        Dept=request.POST['department']
        User=request.POST['user']
        edit=Item.objects.get(id=id)
        edit.name=Name
        edit.itemnum=number
        edit.dept=Dept
        edit.user=User
        edit.save()
      
        return redirect("/")

     d=Item.objects.get(id=id)
     context={"d":d}
     return render(request,"edit.html",context)
     

def insertData(request):
   
    if request.method=="POST":
        Name=request.POST.get('name')
        number=request.POST.get('Itemnumber')
        Dept=request.POST.get('department')
        User=request.POST.get('user')
        print(Name,number,Dept,User)
        query=Item(name=Name,itemnum=number,dept=Dept,user=User)
        query.save()
        return redirect("/")

    return render(request,"index.html")

def deleteData(request,id):
    d=Item.objects.get(id=id)
    d.delete()
    return redirect("/")

def search(request):
    number=request.POST.get('number')
    try:
            d = Item.objects.get(itemnum=number)
            context = {"d": d}
            return render(request, "searchitems.html", context)
    except Item.DoesNotExist:
            error_message = "Item with number '{}' does not exist.".format(number)
            return render(request, "searchitems.html", {"error_message": error_message})
