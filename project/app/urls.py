
from django.urls import path
from app import views



urlpatterns = [
    path('',views.index,name="index"),
    path('insert',views.insertData,name="insertData"),
    path('update/<id>',views.updateDatata,name="updateDatata"),
    path('delete/<id>',views.deleteData,name="deleteData"),
    path('search',views.search,name="search"),
    

    
]  
