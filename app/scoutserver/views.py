from django.shortcuts import render, render_to_response
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from rest_framework.authtoken.models import Token
from rest_framework import generics, permissions, viewsets
from .serializers import UserSerializer, TeamSerializer, ScoutedMatchSerializer, GameTimeSerializer, ScoredObjectSerializer, ScoreLocationSerializer, MatchEndStatusSerializer, MatchStartStatusSerializer, TournamentSerializer, PreloadSerializer, ScheduledMatchSerializer, CardsSerializer, FromLocationSerializer
from .models import Team, MyUser, ScoutedMatch, GameTime, ScoredObject, FromLocation, MatchStartStatus, MatchEndStatus, ScoreLocation, Tournament, PreloadStatus, ScheduledMatch, Cards
from .tables import ScoreTable, MatchTable
from django.db.models import Q
from django_tables2 import RequestConfig
# Create your views here.
import requests
import json
class UserViewSet(viewsets.ModelViewSet):
    queryset = MyUser.objects.all().order_by('team__number')
    serializer_class = UserSerializer

class NewUserView(View):

     def post(self, request):
        print(request.body)
        try:
            u = MyUser().objects.create_user(self, data['email'], data['password'] )
            data = json.loads(request.body)
            u.username = data['username']            
            u.save()
            
            return JsonResponse({'status': 'good'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'bad'})


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('number')
    serializer_class = TeamSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )


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

class ScoredObjectViewSet(viewsets.ModelViewSet):
    queryset = ScoredObject.objects.all()
    serializer_class = ScoredObjectSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class ScoutedMatchViewSet(viewsets.ModelViewSet):
    queryset = ScoutedMatch.objects.all()
    serializer_class = ScoutedMatchSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    
def matches(request, meaningless):
    table = MatchTable(ScoutedMatch.objects.all())
    RequestConfig(request, paginate={'per_page': 9999}).configure(table)
    return render(request, 'scoutserver/matches.html', {'table': table})

def scores(request, meaningless):
    table = ScoreTable(ScoredObject.objects.all())
    RequestConfig(request, paginate={'per_page': 9999}).configure(table)
    return render(request, 'scoutserver/matches.html', {'table': table})


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
    permission_classes = (permissions.IsAuthenticated,)
    def get_queryset(self):
        """
        This view should return a list of all the purchases for
        the user as determined by the username portion of the URL.
        """
        event = self.kwargs['event_code']
        number = self.kwargs['number']
        
        return ScheduledMatch.objects.filter(match_number=number, event=event)


class SubmitMatchView(View):
    # def get(self, request):
    #     print("get called")

    @csrf_exempt
    def post(self, request):
        print(request.body)
        try:
            match = ScoutedMatch()
            data = json.loads(request.body)
            match.number = data['number']
            match.start_status = MatchStartStatus.objects.get(pk=data['start_status'])
            match.end_status = MatchEndStatus.objects.get(pk=data['end_status'])
            match.team = Team.objects.get(pk=data['team'])
            match.tournament = Tournament.objects.get(pk=data['tournament'])
            match.scouted_by = Token.objects.get(pk=data['scouted_by']).user
            match.preload = PreloadStatus.objects.get(pk=data['preload'])
            match.card = Cards.objects.get(pk=data['cards'])
            match.scouted_by = Token.objects.get(key=data['scouted_by']).user            
            match.auto_move = data['auto_move']
            match.playedD = data['playedD']
            match.save()
            for line in data['scores']:
                print(line)
                score = ScoredObject()
                score.obj_type = line['type']
                score.when = GameTime.objects.get(pk=line['time'])
                score.got_from = FromLocation.objects.get(pk=line['from'])
                score.scored_where = ScoreLocation.objects.get(pk=line['to'])
                score.match = match
                score.save()
            return JsonResponse({'status': 'good'})
        except Exception as e:
            print(e)
            return JsonResponse({'status': 'bad'})
