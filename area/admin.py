# -*- coding: utf-8 -*-

from django.contrib import admin
from area import models


class StatisticAdmin(admin.ModelAdmin):
    pass

admin.site.register(models.Statistic, StatisticAdmin)
