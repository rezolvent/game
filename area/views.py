# -*- coding: utf-8 -*-

from django.shortcuts import render
from django.views.generic import DetailView, ListView
from area import models
from django.http import HttpResponse, HttpResponseRedirect
# Create your views here.


class GameDataDetailView(DetailView):
    model = models.Gamer

    def get_context_data(self, **kwargs):
        context = super(GameDataDetailView, self).get_context_data(**kwargs)
        return context

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests, instantiating a form instance with the passed
        POST variables and then checked for validity.
        """
        if request.is_ajax:
            score = request.POST['data']
            gamer = models.Gamer.objects.get_or_create(
                user=request.user,
                defaults=dict(
                    name=request.user.username,
                    games_count=0,
                    best_score=0,
                    user=request.user
                )
            )[0]
            if score > gamer.best_score:
                gamer.best_score = score
                gamer.inc_count()
                gamer.save()
        return HttpResponse('OK')


class GameDataListView(ListView):

    context_object_name = "scores"
    model = models.Gamer

    def get_context_data(self, **kwargs):
        context = super(GameDataListView, self).get_context_data(**kwargs)
        return context
