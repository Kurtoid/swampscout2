from django.shortcuts import render, render_to_response
from rest_framework import viewsets
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from rest_framework import generics, permissions
from .serializers import UserSerializer, TeamSerializer, ScoutedMatchSerializer, GameTimeSerializer, HatchScoredSerializer, ScoreLocationSerializer, CargoScoredSerializer, MatchEndStatusSerializer, MatchStartStatusSerializer, TournamentSerializer, PreloadSerializer, ScheduledMatchSerializer, CardsSerializer, FromLocationSerializer
from .models import Team, MyUser, ScoutedMatch, GameTime, CargoScored, HatchScored, FromLocation, MatchStartStatus, MatchEndStatus, ScoreLocation, Tournament, PreloadStatus, ScheduledMatch, Cards
# Create your views here.
import requests

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

class PreloadViewSet(viewsets.ModelViewSet):
    queryset = PreloadStatus.objects.all()
    serializer_class = PreloadSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class GameTimeViewSet(viewsets.ModelViewSet):
    queryset = GameTime.objects.all()
    serializer_class = GameTimeSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class FromLocationViewSet(viewsets.ModelViewSet):
    queryset = FromLocation.objects.all()
    serializer_class = FromLocationSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    
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
    
def matches(request):
    return render(request, 'scoutserver/matches.html', {'matches': ScoutedMatch.objects.all()})

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

class ScheduledMatchViewSet(viewsets.ModelViewSet):
    queryset = ScheduledMatch.objects.all()
    serializer_class = ScheduledMatchSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    
class CardsViewSet(viewsets.ModelViewSet):
    queryset = Cards.objects.all()
    serializer_class = CardsSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )


class AddTournament(View):
    def get(self, request, event_code=None):
        key = 'ptxL3AMaCfhTGWVX7nbTYp0wfBqYFIu2HkjSr7hu2zxqWfk3B0uCAdALaVohrrxi'

        url = 'https://www.thebluealliance.com/api/v3/event/' + event_code + "/simple"
        headers = {'X-TBA-Auth-Key': key}
        result = requests.get(url, headers=headers)
        event, _ = Tournament.objects.get_or_create(event_code=event_code)
        # print(result.json())
        event.name = result.json()['name']
        event.save()
        url = 'https://www.thebluealliance.com/api/v3/event/' + event_code + '/teams'
        result = requests.get(url, headers=headers)
        result = result.json()
        for entry in result:
            # print(entry['team_number'])
            t, _ = Team.objects.get_or_create(number=entry['team_number'], name=entry['nickname'])
            print(t)
            t.in_event = event
            t.save()

        url = 'https://www.thebluealliance.com/api/v3/event/' + event_code + '/matches/simple'
        result = requests.get(url, headers=headers)
        result = result.json()
        for entry in result:  # for result
            if(entry['comp_level']=='qm'):
                for alliance in entry['alliances']: # for alliance
                    # print(entry['alliances'][alliance]) # for team
                    for team in entry['alliances'][alliance]['team_keys']: 
                        t = Team.objects.get(number=team[3:])
                        sm, _ = ScheduledMatch.objects.get_or_create(event=event, team=t, match_number=entry['match_number'], alliance=alliance)
        return HttpResponse('hi')

class ScheduledMatchList(generics.ListAPIView):
    serializer_class = ScheduledMatchSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        event = self.kwargs['event_code']
        number = self.kwargs['number']
        return ScheduledMatch.objects.filter(match_number=number, event=event)