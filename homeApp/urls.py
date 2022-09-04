from django.urls import path
from .views import homePage , searchPage , house_info_page , createPostPage



urlpatterns = [
    path('', homePage , name="homePage"),
    path('search/', searchPage , name="searchPage"),
    path('house/<int:pk>/', house_info_page , name="house_info_page"),
    path('add/post', createPostPage , name="createPostPage")
]