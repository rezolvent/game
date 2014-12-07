# -*- coding: utf-8 -*-

from django.conf.urls import patterns, include, url
from django.contrib.auth.views import login, logout
from django.views.generic import RedirectView
from area.views import RedirectToGame

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^blog/', include('blog.urls')),
    url(r'^game/', include('area.urls'), name='game'),
    url(r'^$', RedirectToGame.as_view(), name='main'),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^accounts/logout/$', 'django.contrib.auth.views.logout', {'next_page': 'main'}),

    url(r'^accounts/login/$', 'django.contrib.auth.views.login'),
    # url(r'^accounts/', include('django.contrib.auth.urls')),
)
