from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save , pre_save
from django.dispatch import receiver
from PIL import Image



category_house = (
    ("House", "House"),
    ("Appartement", "Appartement"),
    ("Villa", "Villa"),
    ("Duplex", "Duplex"),
)
cities_choice = (
    ("Casablanca", "Casablanca"),
    ("Rabat", "Rabat"),
    ("Marrakech", "Marrakech"),
    ("Agadir", "Agadir"),
    ("Sale", "Sale"),
    ("Kenitra", "Kenitra"),
    ("Meknes", "Meknes"),
    ("Oujda", "Oujda"),
    ("Temara", "Temara"),
    ("El Jadida", "El Jadida"),
    ("Mohammedia", "Mohammedia"),
    ("Tetouan", "Tetouan"),
    ("Nador", "Nador"),
    ("Safi", "Safi"),
    ("Beni Mellal", "Beni Mellal"),
    ("Khouribga", "Khouribga"),
    ("Bouznika", "Bouznika"),
    ("Settat", "Settat"),
    ("Abadou", "Abadou"),
    ("Abaynou", "Abaynou"),
    ("Agadir", "Agadir"),
    ("Agadir Melloul", "Oujda"),
    ("Tanger", "Tanger"),
)
transaction_choice = (
    ("Vente", "Vente"),
    ("Location (Per Day)", "Location (Per Day)"),
    ("Location (Per Month)", "Location (Per Month)"),
)
status = (
    ("Active", "Active"),
    ("Desactive", "Desactive")
)

class HousePost(models.Model):
    user_owner = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=50,choices=category_house,default="House")
    city = models.CharField(max_length=50,choices=cities_choice,default="Casablanca")
    addresse = models.CharField(max_length=95 , null=False , blank=False)
    titleAd = models.CharField(max_length=80 , null=True , blank=True)
    price = models.IntegerField(blank=False, default=0, null=False)
    description = models.TextField(max_length=600,blank=True, default="No Description !!!", null=True)
    date_created = models.DateTimeField(auto_now=True)
    saved = models.ManyToManyField(User , blank=True , related_name='savePost')
    viewd = models.IntegerField(blank=False, default=0, null=False)
    transaction = models.CharField(max_length=50,choices=transaction_choice,default="Vente")
    status = models.CharField(max_length=50,choices=status,default="Active")
    #*/--- House Infos ---
    rooms = models.IntegerField(blank=True, default=1, null=True)
    etage = models.IntegerField(blank=True, default=1, null=True)
    bedRoom = models.IntegerField(blank=True, default=1, null=True)
    toilettes = models.IntegerField(blank=True, default=1, null=True)
    living_room = models.IntegerField(blank=True, default=1, null=True)
    total_surface = models.IntegerField(blank=False, default=0, null=False)
    #*/--- House Other Details Booleans ---
    elevator = models.BooleanField(blank=True, default=False , null=True)
    balcony = models.BooleanField(blank=True, default=False , null=True)
    Furniture = models.BooleanField(blank=True, default=False , null=True)
    air_conditioner = models.BooleanField(blank=True, default=False , null=True)
    Furnished = models.BooleanField(blank=True, default=False , null=True)
    Heater = models.BooleanField(blank=True, default=False , null=True)
    concierge = models.BooleanField(blank=True, default=False , null=True)
    terrace = models.BooleanField(blank=True, default=False , null=True)
    cuisine_equipee = models.BooleanField(blank=True, default=False , null=True)
    securite = models.BooleanField(blank=True, default=False , null=True)
    Parking = models.BooleanField(blank=True, default=False , null=True)

    def __str__(self):
        return str(self.id)

    def total_likes(self):
        return self.likes.count()

    def generatePostTitle(self):
        title = "{type} with {surface} m2 in {city} {addresse}"
        title = title.format(type = self.category,surface = self.total_surface, city = self.city ,addresse = self.addresse)
        return title



def generateTitle(sender,instance,created,**kwargs):
    if created:
        print("hey")
        post_title = instance.titleAd
        if (post_title == None or post_title == ""):
            new_title = instance.generatePostTitle()
            instance.titleAd = new_title
            instance.save()
post_save.connect(generateTitle,sender=HousePost)









class Images(models.Model):
    post = models.ForeignKey(HousePost, on_delete=models.CASCADE , null=True , blank=True)
    image = models.ImageField(upload_to='images' , null=False , default="no-photo.png")

    def __str__(self):
        image_name = "Image of " + str(self.post.user_owner) + " Post With id " + str(self.post.id)
        return str(image_name)



