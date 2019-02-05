from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import MyUser, Team, MatchStartStatus,PreloadStatus, GameTime, CargoFrom, HatchFrom, ScoreLocation, CargoScored, HatchScored, ScoutedMatch, Tournament, MatchEndStatus, MatchStartStatus, ScheduledMatch


class TournamentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tournament
        fields = ("__all__")

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MyUser
        fields = ('url', 'email', 'team')

class TeamSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Team
        fields = ('url', 'name', 'number', 'in_event')

class MatchStartStatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MatchStartStatus
        fields = ('pk', 'url', 'status')

class PreloadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PreloadStatus
        fields = ('pk', 'url', 'status')


class GameTimeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GameTime
        fields = ('url', 'time')


class CargoFromSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CargoFrom
        fields = ('url', 'location')


class HatchFromSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HatchFrom
        fields = ('url', 'location')

class ScoreLocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScoreLocation
        fields = ('url', 'location')

class CargoScoredSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CargoScored
        fields = ('url', 'when', 'got_from', 'scored_where', 'match')

class HatchScoredSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = HatchScored
        fields = ('url',  'when', 'got_from', 'scored_where', 'match')

class ScheduledMatchSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScheduledMatch
        fields = ('__all__')

class ScoutedMatchSerializer(serializers.HyperlinkedModelSerializer):
    tournament = TournamentSerializer(many = False, read_only = True)
    class Meta:
        model = ScoutedMatch
        fields = ('__all__')

class MatchEndStatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MatchEndStatus
        fields = ('__all__')        
