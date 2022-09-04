from django.urls import path
from .views import house_filter_Api , mostViewdHouseApi , mostLikedHouseApi , addSavedPost , allUsers , personalInfoApi



urlpatterns = [
    path('houses/', house_filter_Api , name="house_filter_Api"),
    path('most-viewd-house/', mostViewdHouseApi , name="mostViewdHouseApi"),
    path('most-liked-house/', mostLikedHouseApi , name="mostLikedHouseApi"),
    path('savedposts/add/<int:pk>',addSavedPost, name="addSavedPost"),
    path('allusers',allUsers, name="allUsers"),
    path('personalInfoApi',personalInfoApi, name="personalInfoApi"),
]