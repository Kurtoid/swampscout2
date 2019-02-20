import django_tables2 as tables
from .models import ScoutedMatch, ScoredObject

class MatchTable(tables.Table):
    class Meta:
        model = ScoutedMatch
        template_name = 'django_tables2/bootstrap.html'
        exclude=('id',)
    team = tables.Column(accessor='team.number', verbose_name='Team')

class ScoreTable(tables.Table):
    team = tables.Column(accessor='match.team.number', verbose_name='Team')
    match_number = tables.Column(accessor='match.number', verbose_name='number')

    class Meta:
        model = ScoredObject
        template_name = 'django_tables2/bootstrap.html'
        exclude=('id',)
