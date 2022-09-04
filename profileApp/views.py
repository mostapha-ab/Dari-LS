from hashlib import new
from django.shortcuts import render
from django.http import HttpResponse
from authenticationApp.models import ProfileAccount
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate , login , logout









@login_required(login_url="loginPage")
def editProfileInfo(request):
    user = request.user.profileaccount
    if request.method == "POST":
        new_username = request.POST.get("username")
        location = request.POST.get("city")
        new_phoneNumber = request.POST.get("phoneNumber")   

        if ((len(new_username) >= 5 and len(new_username) <= 15)  and (location and len(new_phoneNumber) == 9)):
            user = request.user
            user.username = new_username
            user.save()

            user.profileaccount.phoneNumber = new_phoneNumber
            user.profileaccount.city = location
            user.profileaccount.save()
            return HttpResponse("The User Data Saved Successfully")
        else:    
            return HttpResponse("Data Has not been saved Please Try Again!")
    return render(request,"accountSettings/index.html")







@login_required(login_url="loginPage")
def editPassword(request):
    user = request.user
    print(user.id)
    if request.method == "POST":
        actuall_password = request.POST.get("actuall_password")
        actuall_password_correct = user.check_password(actuall_password)
        new_password = request.POST.get("new_password")
        conf_password = request.POST.get("confirmation_password")

        if (actuall_password_correct and (new_password == conf_password) and (len(new_password) >= 8 and len(new_password) <= 15)):
            user = User.objects.get(id=user.id)
            user.set_password(new_password)
            user.save()
            login(request,user)
            return HttpResponse("Data has been saved successfully")
        else:
            return HttpResponse("Your Actuall Password your Enter is Invalid")
    return render(request,"accountSettings/passwordEdit.html")