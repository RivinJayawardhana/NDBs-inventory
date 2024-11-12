from django.shortcuts import render,redirect
from .models import item, User,Admin,Documents
from .serializer import itemSerializer,userSerializer,adminSerializer,DocumentsSerializer,TrashSerializer
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
import mysql.connector
from rest_framework.decorators import action





 #Create your views here.
#mydb = mysql.connector.connect(
 # host="localhost",
 ## user="root",
  #password="1234"
#)

#mycursor = mydb.cursor()

#mycursor.execute("use inventory")













def index(request):
   data=item.objects.all()
   context={"data":data}
   return render(request,"index.html",context)
#
  

class Itemview(viewsets.ModelViewSet):
     queryset = item.objects.all()
     serializer_class = itemSerializer

class Documentsview(viewsets.ModelViewSet):
     queryset = Documents.objects.all()
     serializer_class = DocumentsSerializer

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

class Trashview(viewsets.ModelViewSet):
     queryset = User.objects.all()
     serializer_class = TrashSerializer


  
@api_view(['PATCH'])
def set_user_to_none(request):
    # Extract the user to set to 'none' from the request body
    user_to_set_none = request.data.get('set_user_to_none')

    if not user_to_set_none:
        return Response({'error': 'User identifier not provided'}, status=status.HTTP_400_BAD_REQUEST)

    # Update the user field to 'none' for items that match the condition
    items_updated = item.objects.filter(user=user_to_set_none).update(user='none')

    if items_updated == 0:
        return Response({'message': 'No items found for the provided user'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'message': f'{items_updated} items updated'}, status=status.HTTP_200_OK)
    

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
        number=request.POST.get('itemnum')
        brand=request.POST.get('brand')
        User=request.POST.get('user')
        price=request.POST.get('Price')
        print(Name,number,Dept,User)
        #query=Item(name=Name,itemnum=number,dept=Dept,user=User)
        #query.save()
        #sql="insert into user(name,itemnum,user,price,brand) values(%s,%s,%s,%s,%s)"
        #val=(Name,number,User,price,brand)
        #mycursor.execute(sql,val)
        #mydb.commit()
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
