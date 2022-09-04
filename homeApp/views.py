from turtle import pos
from django.shortcuts import render , redirect
from django.http import HttpResponse
from .filters import HouseFilter
from .models import HousePost , Images
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .functionality import alreadySavedPost
from django.core.paginator import Paginator
import json
from .forms import CreatePostForm , CreateImageForm







#> Home Page API
def homePage(request):
    return render(request,"index.html")




# @login_required(login_url='loginPage')
def searchPage(request):
    user = request.user.is_authenticated
    if user:
        user_authenticated =  request.user.username 
    else:
        user_authenticated =  False
    house_items = HousePost.objects.all()
    #--------- Filtring ---------
    price_order = request.GET.get("price")
    myFilter = HouseFilter(request.GET,queryset=house_items)
    house_items = myFilter.qs
    
    if price_order == "asc" or price_order == None:
        house_items = house_items.order_by("price")
    elif price_order == "desc":
        house_items = house_items.order_by("-price")
    #--------- End Filtring ---------
    page = request.GET.get("page")
    p = Paginator(house_items,5)
    house_items = p.get_page(page)

    has_next = house_items.has_next()
    has_previous = house_items.has_previous()
    page_number = house_items.number

    house_items = house_items.object_list
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
    
    city_search = request.GET.get("city","")
    cat_search = request.GET.get("category","")
    trans_search = request.GET.get("transaction","")
    price_order = request.GET.get("price","")
    
    pag_dict = {
        "userAuth" : user_authenticated,
        "hasNext" : has_next,
        "hasPrevious" : has_previous,
        "pageNumber" : page_number,
        # Search Parameters
        "location" : city_search,
        "type" : cat_search,
        "transaction" : trans_search,
        "order" : price_order,
    }

    dataJSON = json.dumps(res)
    page_dict_json = json.dumps(pag_dict)
    context = {"data":dataJSON,"pagination_data":page_dict_json}
    return render(request,"searchPage.html",context)



















def house_info_page(request,pk):
    user = request.user.is_authenticated
    if user:
        print("user authenticated")
        user_authenticated =  request.user.username 
    else:
        print("user need to log in")
        user_authenticated =  False
    house_item = HousePost.objects.get(id=pk)

    house_pictures = Images.objects.filter(post=house_item)
    img_house_list = []
    for img in house_pictures:
        img_house_list.append(img.image.url)


    recommandations = HousePost.objects.all().filter(category=house_item.category)[:4]
    res = []
    for item in recommandations:
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

    pers_saved = []
    for pers in house_item.saved.all():
        pers_saved.append(pers.username)
    house_dict = {
        "id" : house_item.id,
        "saved": pers_saved,
        "userAuth" : user_authenticated,
        "category" : house_item.category, 
        # "images":[str(house_item.images.url),str(house_item.images.url)],
        "images":img_house_list,
        
        "owner": {
            "name" : house_item.user_owner.username,
            "profile_pic" : house_item.user_owner.profileaccount.avatar,
            "bio" : house_item.user_owner.profileaccount.bio,
            "phone_number" : house_item.user_owner.profileaccount.phoneNumber
        },
        "description" : house_item.description,
        "tsurface":str(house_item.total_surface),
        "bedroom":str(house_item.bedRoom),
        "toilettes":str(house_item.toilettes),
        # other Info
        "other_details" : {
            "elevator" : [str(house_item.elevator),"elevator"],
            "balcony" : [str(house_item.balcony),"balcony"],
            "furniture" : [str(house_item.Furniture),"furniture"],
            "air_conditioner" : [str(house_item.air_conditioner),"air_conditioner"],
            "furnished" : [str(house_item.Furnished),"furnished"],
            "heater" : [str(house_item.Heater),"heater"],
            "concierge" : [str(house_item.concierge),"concierge"],
            "terrace" : [str(house_item.terrace),"terrace"],
            "cuisine_equipee" : [str(house_item.cuisine_equipee),"cuisine_equipee"],
            "securite" : [str(house_item.securite),"securite"],
            "parking" : [str(house_item.Parking),"parking"],
        },
        # for table
        "type" : house_item.category,
        "floor" : house_item.etage,
        "rooms" : house_item.rooms,
        "salon" : house_item.living_room,
        "city" : house_item.city,
        "adress" : house_item.addresse,

        "saved":pers_saved,
        "title":str(house_item.titleAd),
        "price":str(house_item.price),
    }
    # print(house_dict)
    dataJSON = json.dumps(house_dict)
    recommandationJson = json.dumps(res)
    
    context = {"data":dataJSON,"recommandations":recommandationJson}
    return render(request,"houseINfo.html",context)









@login_required(login_url='loginPage')
def createPostPage(request):
    user = request.user
    myForm = CreatePostForm()

    if request.method == "POST":
        images = request.FILES.getlist('images')
        category = request.POST.get("category")
        city = request.POST.get("city")
        addresse = request.POST.get("addresse")
        titleAd = request.POST.get("titleAd")
        price = request.POST.get("price")
        description = request.POST.get("description")
        transaction = request.POST.get("transaction")
        rooms = request.POST.get("rooms")
        etages = request.POST.get("etage")
        bedRoom = request.POST.get("bedRoom")
        toilettes = request.POST.get("toilettes")
        living_room = request.POST.get("living_room")
        total_surface = request.POST.get("total_surface")
        elevator = request.POST.get("elevator")
        balcony = request.POST.get("balcony")
        air_conditioner = request.POST.get("air_conditioner")
        furnished = request.POST.get("Furnished")
        furniture = request.POST.get("Furniture")
        Heater = request.POST.get("Heater")
        concierge = request.POST.get("concierge")
        terrace = request.POST.get("terrace")
        cuisine_equipee = request.POST.get("cuisine_equipee")
        securite = request.POST.get("securite")
        parking = request.POST.get("Parking")

        post_item = HousePost.objects.create(user_owner=user,description=description,category=category,city=city,addresse=addresse,titleAd=titleAd,price=price,transaction=transaction,rooms=rooms,etage=etages,bedRoom=bedRoom,toilettes=toilettes,living_room=living_room,total_surface=total_surface,elevator=elevator,balcony=balcony,air_conditioner=air_conditioner,Furnished=furnished,Furniture=furniture,Heater=Heater,concierge=concierge,terrace=terrace,cuisine_equipee=cuisine_equipee,securite=securite,Parking=parking)
        post_item.save()
        images_length = len(images)
        if images_length > 0:
            for img in images:
                post_img = Images.objects.create(post=post_item,image=img)
                post_img.save()
        else:
            post_img = Images.objects.create(post=post_item)
        return redirect('house_info_page', pk=post_item.id)


    context = {"form":myForm}
    return render(request,"create_post_page.html",context)   