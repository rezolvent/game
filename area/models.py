# -*- coding: utf-8 -*-

from django.db import models

from django.contrib.auth.models import User

# Create your models here.


class Gamer(models.Model):

    class Meta:
        verbose_name = u"игрок"
        verbose_name_plural = u"игроки"

    def __unicode__(self):
        return u'{0} - {1}'.format(
            self.name,
            self.games_count)

    name = models.CharField(
        max_length=60,
        default=u'новый игрок',
        verbose_name=u'имя игрока'
    )
    games_count = models.IntegerField(
        verbose_name=u'количество игр'
        )
    best_score = models.IntegerField(
        verbose_name=u'лучший результат')
    user = models.OneToOneField(
        User,
        default=1,
        null=True,
        blank=True,
        related_name='user_profile',
        verbose_name=u'профиль позователя'
    )

    def inc_count(self):
        self.games_count = self.games_count + 1



# class Statistic(models.Model):

#     class Meta:
#         verbose_name = u"Результат игры"
#         verbose_name_plural = u"Реультаты игр"

#     def __unicode__(self):
#         return u'Кол-во игроков - ', len(self.gamers)

#     gamers = models.ForeignKey(
#         Gamer,
#         related_name='statistic',
#         verbose_name=u'игроки')
