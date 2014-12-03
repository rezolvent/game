# -*- coding: utf-8 -*-

from django.conf.urls import patterns, include, url
from django.contrib.auth.views import login, logout
from django.views.generic import RedirectView

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^blog/', include('blog.urls')),
    url(r'^game/', include('area.urls'), name='game'),
    url(r'^$', RedirectView.as_view(
        pattern_name='empty_area')),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^accounts/',
        include('django.contrib.auth.urls')),
)
