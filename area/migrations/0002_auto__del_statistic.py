# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'Statistic'
        db.delete_table(u'area_statistic')


    def backwards(self, orm):
        # Adding model 'Statistic'
        db.create_table(u'area_statistic', (
            ('gamers', self.gf('django.db.models.fields.related.ForeignKey')(related_name='statistic', to=orm['area.Gamer'])),
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
        ))
        db.send_create_signal(u'area', ['Statistic'])


    models = {
        u'area.gamer': {
            'Meta': {'object_name': 'Gamer'},
            'best_score': ('django.db.models.fields.IntegerField', [], {}),
            'games_count': ('django.db.models.fields.IntegerField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "u'\\u043d\\u043e\\u0432\\u044b\\u0439 \\u0438\\u0433\\u0440\\u043e\\u043a'", 'max_length': '60'})
        }
    }

    complete_apps = ['area']