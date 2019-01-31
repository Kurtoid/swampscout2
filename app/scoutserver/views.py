from django.shortcuts import render, render_to_response
from rest_framework import viewsets
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from rest_framework import generics, permissions
from .serializers import UserSerializer, TeamSerializer, ScoutedMatchSerializer, GameTimeSerializer, CargoFromSerializer, HatchFromSerializer, HatchScoredSerializer, ScoreLocationSerializer, CargoScoredSerializer, MatchEndStatusSerializer, MatchStartStatusSerializer, TournamentSerializer
from .models import Team, MyUser, ScoutedMatch, GameTime, CargoFrom, CargoScored, HatchScored, HatchFrom, MatchStartStatus, MatchEndStatus, ScoreLocation, Tournament
# Create your views here.


class UserViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.all().order_by('team__number')
    serializer_class = UserSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('number')
    serializer_class = TeamSerializer

class MatchViewSet(viewsets.ModelViewSet):
    queryset = ScoutedMatch.objects.all()
    serializer_class = ScoutedMatchSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class MatchStartStatusViewSet(viewsets.ModelViewSet):
    queryset = MatchStartStatus.objects.all()
    serializer_class = MatchStartStatusSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class GameTimeViewSet(viewsets.ModelViewSet):
    queryset = GameTime.objects.all()
    serializer_class = GameTimeSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class CargoFromViewSet(viewsets.ModelViewSet):
    queryset = CargoFrom.objects.all()
    serializer_class = CargoFromSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class HatchFromViewSet(viewsets.ModelViewSet):
    queryset = HatchFrom.objects.all()
    serializer_class = HatchFromSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class ScoreLocationViewSet(viewsets.ModelViewSet):
    queryset = ScoreLocation.objects.all()
    serializer_class = ScoreLocationSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class CargoScoredViewSet(viewsets.ModelViewSet):
    queryset = CargoScored.objects.all()
    serializer_class = CargoScoredSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class HatchScoredViewSet(viewsets.ModelViewSet):
    queryset = HatchScored.objects.all()
    serializer_class = HatchScoredSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class ScoutedMatchViewSet(viewsets.ModelViewSet):
    queryset = ScoutedMatch.objects.all()
    serializer_class = ScoutedMatchSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class MatchEndStatusViewSet(viewsets.ModelViewSet):
    queryset = MatchEndStatus.objects.all()
    serializer_class = MatchEndStatusSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class Index(View):
    def get(self, request):
        return render(request, 'scoutserver/index.html')