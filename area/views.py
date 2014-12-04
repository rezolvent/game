# -*- coding: utf-8 -*-

from django.shortcuts import render
from django.views.generic import DetailView, ListView
from django.views.generic import View
from area import models
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
# Create your views here.


class GameDataDetailView(DetailView):
    model = models.Gamer

    def get_context_data(self, **kwargs):
        context = super(GameDataDetailView, self).get_context_data(**kwargs)
        context['records'] = models.Gamer.objects.order_by('-best_score')[:10]
        return context

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests, instantiating a form instance with the passed
        POST variables and then checked for validity.
        """
        if request.is_ajax:
            score = request.POST['data']
            gamer = models.Gamer.objects.get(user=request.user)
            if score > gamer.best_score:
                gamer.best_score = score
                gamer.inc_count()
                gamer.save()
        return HttpResponse('OK')


class RedirectToGame(View):

    @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        # import pudb; pu.db
        gamer = models.Gamer.objects.get_or_create(
            user=request.user,
            defaults=dict(
                name=request.user.username,
                games_count=0,
                best_score=0,
                user=request.user
            )
        )[0]
        gamer.save()
        return HttpResponseRedirect(
            reverse(
                'area',
                kwargs={'pk': gamer.id}))
