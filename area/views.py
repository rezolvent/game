# -*- coding: utf-8 -*-

from django.shortcuts import render
from django.views.generic import DetailView, ListView
from area import models
# Create your views here.


class GameDataDetailView(DetailView):

    context_object_name = "gamer_score"
    model = models.Statistic

    def get_context_data(self, **kwargs):
        context = super(GameDataDetailView, self).get_context_data(**kwargs)
        return context


class GameDataListView(ListView):

    context_object_name = "scores"
    model = models.Statistic

    def get_context_data(self, **kwargs):
        context = super(GameDataListView, self).get_context_data(**kwargs)
        return context
