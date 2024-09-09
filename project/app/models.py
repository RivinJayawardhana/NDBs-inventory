from django.db import models


class Item(models.Model):
    name=models.CharField(max_length=30,blank=False,null=False)
    itemnum=models.CharField(max_length=30,blank=False,null=False)
    brand=models.CharField(max_length=30,blank=False,null=False)
    user=models.CharField(max_length=50,blank=False,null=False,default="none")
    Price=models.IntegerField(default=0)

    def __str__(self) :
        return self.name

#hiii
class User(models.Model):
    name=models.CharField(max_length=30,blank=False,null=False)
    dept=models.CharField(max_length=30,blank=False,null=False)
    email=models.CharField(max_length=30,blank=False,null=False)
   
    def __str__(self) :
        return self.name


class Admin(models.Model):
    name=models.CharField(max_length=30,blank=False,null=False)
    email=models.CharField(max_length=30,blank=False,null=False)
    password=models.CharField(max_length=30,blank=False,null=False)
    def __str__(self) :
        return self.name
