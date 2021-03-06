from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import MyUser, Team, MatchStartStatus,PreloadStatus, GameTime, FromLocation, ScoreLocation, ScoredObject, ScoutedMatch, Tournament, MatchEndStatus, MatchStartStatus, ScheduledMatch, Cards


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
        fields = ('url', 'time', 'pk')


class FromLocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FromLocation
        fields = ('url', 'location','pk')

class ScoreLocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScoreLocation
        fields = ("pk", 'url', 'location')

class ScoredObjectSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScoredObject
        fields = ('url',  'when', 'got_from', 'scored_where', 'match')

class ScheduledMatchSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()
    number = serializers.SerializerMethodField()
    class Meta:
        model = ScheduledMatch
        fields = ("match_number", "team", "display_name", "alliance", "number")
        depth = 1
    def get_display_name(self, obj):
        return str(obj.team.number) + ": " + str(obj.team.name)
    def get_number(self, obj):
        return str(obj.team.number)

class ScoutedMatchSerializer(serializers.HyperlinkedModelSerializer):
    tournament = TournamentSerializer(many = False, read_only = True)
    class Meta:
        model = ScoutedMatch
        fields = ('__all__')

class MatchEndStatusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MatchEndStatus
        fields = ('status','pk')

class CardsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cards
        fields = ('status','pk')
