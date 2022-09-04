from django.urls import path
from .views import editProfileInfo , editPassword



urlpatterns = [
    path('settings/profile/', editProfileInfo , name="editProfileInfo"),
    path('settings/password/', editPassword , name="editPassword"),
]