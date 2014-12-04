# -*- coding: utf-8 -*-

from django.conf.urls import patterns, include, url
from django.contrib.auth.decorators import login_required

from area import views

urlpatterns = patterns(
    '',
    url(r'^area/(?P<pk>\d+)$',
        login_required(
            views.GameDataDetailView.as_view(
                template_name='area/game.html')),
        name='area'),
)
