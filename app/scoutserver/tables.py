import django_tables2 as tables
from .models import ScoutedMatch

class ScoutedMatch(tables.Table):
    class Meta:
        model = ScoutedMatch
        template_name = 'django_tables2/bootstrap.html'