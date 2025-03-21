"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from app.views import Itemview,userview,UserListView,adminview,Documentsview,Trashview,DocumentView
from django.conf import settings
from django.conf.urls.static import static


route=routers.DefaultRouter()
route.register("item",Itemview,basename="itemview")
route.register("user",userview,basename="userview")
route.register("admin",adminview,basename="adminview")
route.register("userfilter",UserListView,basename="userfilter")
route.register("doc",Documentsview,basename="doc")
route.register("trash",Trashview,basename="trash")





urlpatterns = [
    path('admin/', admin.site.urls),
   path('',include('app.urls')),
    path('api/',include(route.urls)),
 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)