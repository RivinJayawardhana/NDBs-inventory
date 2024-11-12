from django.db import models


class item(models.Model):
 
    name=models.CharField(max_length=30,blank=False,null=False)
    itemnum=models.CharField(max_length=30,blank=False,null=False)
    brand=models.CharField(max_length=30,blank=False,null=False)
    user=models.CharField(max_length=50,blank=False,null=False,default="none")
    Price=models.IntegerField(default=0)
   
    

    def __str__(self) :
        return self.name


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

class Documents(models.Model):
    name=models.CharField(max_length=30,blank=False,null=False)
    department=models.CharField(max_length=500,blank=False,null=False)
    items=models.CharField(max_length=200,blank=False,null=False,default="none")
    Brand=models.CharField(max_length=20,blank=False,null=False)
    SerialNo=models.CharField(max_length=20,blank=False,null=False)
    Quantity=models.CharField(max_length=20,blank=False,null=False)
    Doctype=models.CharField(max_length=20,blank=False,null=False)
    Remark=models.CharField(max_length=20,blank=False,null=False)
    Date=models.CharField(max_length=20,blank=False,null=False,default="none")
    def __str__(self) :
        return self.name

class Trash(models.Model):
    User=models.CharField(max_length=30,blank=False,null=False)
    IDnumber=models.CharField(max_length=500,blank=False,null=False)
    AssertName=models.CharField(max_length=200,blank=False,null=False,default="none")
    SerialNumber=models.CharField(max_length=20,blank=False,null=False)
    contactnumber=models.CharField(max_length=20,blank=False,null=False,default="none")

    Date=models.CharField(max_length=20,blank=False,null=False,default="none")
    def __str__(self) :
        return self.name