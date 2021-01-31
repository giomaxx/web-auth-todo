from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin

class UserAdminConfig(UserAdmin):
    ordering = ('date_joined',)
    list_display = ('username', 'email',
                    'is_active', 'is_staff', 'is_superuser')
    search_fields = ('email', 'username')
    list_filter = ('is_active', 'is_staff', 'is_superuser',)
    fieldsets = ( # Choose and order display fields
        (None, {'fields': ('username', 'email', 'date_joined', 'last_login')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions',)}),
    )
    add_fieldsets = ( # Customize Add custom user
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email',
            'password1', 'password2', 'is_active', 'is_staff', 'is_superuser')}
         ),
    )

admin.site.register(CustomUser, UserAdminConfig)