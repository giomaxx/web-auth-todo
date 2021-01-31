from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

class CustomUserManager(BaseUserManager):
   
    def create_user(self, email, username, password, **extra_fields):
        
        # Validation checks
        if not email:
            raise ValueError(_("You must provide an email address"))
        if not password:
            raise ValueError(_("You must provide a password"))
        if not username:
            raise ValueError(_("You must set a username"))
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username,
                          **extra_fields)
        user.set_password(password) # change password to hash
        user.save()
        
        return user

    def create_superuser(self, email, username, password, **extra_fields):
       
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        # Testing
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        if extra_fields.get('is_active') is not True:
            raise ValueError(_('Superuser must have is_active=True.'))
        
        return self.create_user(email, username, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

   

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()    

    def __str__(self):
        return self.username