# -*- coding: utf-8 -*-

from django.conf.urls import patterns, include, url
from django.contrib.auth.decorators import login_required

from area import views

urlpatterns = patterns(
    '',
    url(
        r'^$',
        login_required(
            views.GameDataListView.as_view(
                template_name='area/game.html')),
        name='gamedata_list'),

    url(r'^area',
        login_required(views.GameDataDetailView.as_view()),
        name='empty_area'),

    url(r'^area/(?P<pk>\d+)$',
        views.GameDataDetailView.as_view(),
        name='area'),
)
