# Generated by Django 3.2.6 on 2022-07-21 13:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authenticationApp', '0005_profileaccount_bio'),
    ]

    operations = [
        migrations.CreateModel(
            name='InboxMessages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('subject', models.CharField(choices=[('Bug problem', 'Bug problem'), ('partnership', 'partnership'), ('Just Saying Hi :)', 'Just Saying Hi :)')], default='Bug problem', max_length=50)),
                ('message', models.TextField(max_length=750)),
                ('date_created', models.DateField(auto_now_add=True, null=True)),
            ],
        ),
    ]
