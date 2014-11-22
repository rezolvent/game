# -*- coding: utf-8 -*-

from django.conf.urls import patterns, include, url

from area import views

urlpatterns = patterns(
    '',
    url(r'^$', views.GameDataListView.as_view(template_name='area/game.html'), name='gamedata_list'),
    url(r'^(?P<pk>\d+)$', views.GameDataDetailView.as_view(), name='gamedata_detail'),
)
