# -*- coding: utf-8 -*-

from django.contrib import admin
from area import models


class GamerAdmin(admin.ModelAdmin):
    pass

admin.site.register(models.Gamer, GamerAdmin)
