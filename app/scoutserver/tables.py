import django_tables2 as tables
from .models import ScoutedMatch, ScoredObject

class MatchTable(tables.Table):
    class Meta:
        model = ScoutedMatch
        template_name = 'django_tables2/bootstrap.html'

class ScoreTable(tables.Table):
    class Meta:
        model = ScoredObject
        template_name = 'django_tables2/bootstrap.html'