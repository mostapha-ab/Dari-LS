from django.urls import path
from .views import loginPage , registerPage , contactPage , logoutPage , ChangePassword , testPage , sendMail
from homeApp.views import homePage




urlpatterns = [
    path('', homePage , name="homePage"),
    path('login/', loginPage , name="loginPage"),
    path('register/', registerPage , name="registerPage"),
    path('logout/', logoutPage , name="logoutPage"),
    path('contact/', contactPage , name="contactPage"),
    path('changepassword/<str:pk>', ChangePassword , name="ChangePassword"),

    path('test/', testPage , name="testPage"),
    path('sendmail', sendMail , name="sendMail")
]