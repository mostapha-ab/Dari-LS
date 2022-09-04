from django.shortcuts import render
from django.http import HttpResponse
from homeApp.models import HousePost
from homeApp.filters import HouseFilter , Images
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
import json
from operator import itemgetter
from authenticationApp.models import ProfileAccount









#*/> EndPoint API For Filtred House
def house_filter_Api(request):
    page = request.GET.get("page")
    house_items = HousePost.objects.all()
    #--------- Filtring ---------
    price_order = request.GET.get("price")
    myFilter = HouseFilter(request.GET,queryset=house_items)
    house_items = myFilter.qs
    
    if price_order == "asc" or None:
        house_items = house_items.order_by("price")
    elif price_order == "desc":
        house_items = house_items.order_by("-price")
    #--------- End Filtring ---------
    #*/ Paginator Instance
    # p = Paginator(house_items,2)
    # house_items = p.get_page(page)
    #*/ .object_list (The list of objects on this page Query SET)
    house_items = house_items.object_list
    data = list(house_items.values())
    return JsonResponse(data,safe=False)











#*/> EndPoint API For Most Viewd House
def mostViewdHouseApi(request):
    user = request.user.is_authenticated
    if user:
        print("user authenticated")
        user_authenticated =  request.user.username 
    else:
        print("user need to log in")
        user_authenticated =  False

    house_items = HousePost.objects.all().order_by("-viewd")[:8]
    res = []
    for item in house_items:

        all_images = Images.objects.filter(post=item)
        img_list = []
        for img in all_images:
            img_list.append(img.image.url)

        pers_saved = []
        for pers in item.saved.all():
            pers_saved.append(pers.username)

        n_dict = {
                "is_auth" : user_authenticated,
                "id" : item.id,
                "images":img_list,
                "saved":pers_saved,
                "city":str(item.city) + " , " + str(item.addresse),
                "title":str(item.titleAd),
                "price":str(item.price),
                "tsurface":str(item.total_surface),
                "bedroom":str(item.bedRoom),
                "toilettes":str(item.toilettes)
        }
        res.append(n_dict)
    return JsonResponse(res,safe=False)







#*/> EndPoint API For Most Liked House
def mostLikedHouseApi(request):
    user = request.user.is_authenticated
    if user:
        print("user authenticated")
        user_authenticated =  request.user.username 
    else:
        print("user need to log in")
        user_authenticated =  False

    all_houses = list(HousePost.objects.all())
    finalQuerySet = []
    res = []

    nList = []
    for house in all_houses:
        nList.append({"id":house.id,"saved":house.saved.count()})

    nList = sorted(nList, key=itemgetter('saved')) 
    nList.reverse()
    
    limited_Houses = nList[:8]
        
    for item in limited_Houses:
        house = HousePost.objects.get(id=item['id'])
        finalQuerySet.append(house)

    for item in finalQuerySet:

        all_images = Images.objects.filter(post=item)
        img_list = []
        for img in all_images:
            img_list.append(img.image.url)

        pers_saved = []
        for pers in item.saved.all():
            pers_saved.append(pers.username)

        n_dict = {
                "is_auth" : user_authenticated,
                "id" : item.id,
                "images":img_list,
                "saved":pers_saved,
                "city":str(item.city) + " , " + str(item.addresse),
                "title":str(item.titleAd),
                "price":str(item.price),
                "tsurface":str(item.total_surface),
                "bedroom":str(item.bedRoom),
                "toilettes":str(item.toilettes)
        }
        res.append(n_dict)
    return JsonResponse(res,safe=False)








#*/> EndPoint API For Add Post To Saved List
@login_required(login_url='loginPage')
def addSavedPost(request,pk):
    user = request.user
    print(user)
    house_item = HousePost.objects.get(id=pk)
    saved_people = house_item.saved.all()

    if user not in saved_people:
        house_item.saved.add(user)
        process = "user added"
    else:
        house_item.saved.remove(user)
        process = "user removed"
    return HttpResponse(process)








#*/> EndPoint API For Users Data
@login_required(login_url='loginPage')
def allUsers(request):
    user = request.user
    all_users = User.objects.all().exclude(username=user.username)
    res = []
    for usr in all_users:
        n_dict = {
                "username" : usr.username,
        } 
        res.append(n_dict)
    return JsonResponse(res,safe=False)







#*/> EndPoint API For User Info
@login_required(login_url='loginPage')
def personalInfoApi(request):
    user = request.user

    res = []
    n_dict = {
        "username" : user.username,
        "city" : user.profileaccount.city,
        "email" : user.profileaccount.email,
        "phoneNumber" : user.profileaccount.phoneNumber,
        "image" : user.profileaccount.avatar,
    } 
    res.append(n_dict)
    return JsonResponse(res,safe=False)