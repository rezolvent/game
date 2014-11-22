# -*- coding: utf-8 -*-

from django.db import models

# Create your models here.


class Gamer(models.Model):

    class Meta:
        verbose_name = u"Игрок"
        verbose_name_plural = u"Игроки"

    def __unicode__(self):
        pass

    name = models.CharField(
        max_length=60,
        default=u'новый игрок',
        verbose_name=u'Имя игрока'
    )
    games_count = models.IntegerField(
        verbose_name=u'количество игр'
        )
    best_score = models.IntegerField(
        verbose_name=u'лучший результат')


class Statistic(models.Model):

    class Meta:
        verbose_name = u"Результат игры"
        verbose_name_plural = u"Реультаты игр"

    def __unicode__(self):
        pass

    gamers = models.ForeignKey(
        Gamer,
        related_name='statistic',
        verbose_name=u'игроки')
