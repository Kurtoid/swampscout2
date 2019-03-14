from django.urls import path, include, re_path
from rest_framework import routers, serializers, viewsets

from scoutserver.views import ScoutedMatch

from . import views
from rest_framework.authtoken import views as rfviews
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'matches', views.MatchViewSet)
router.register(r'match-start-status', views.MatchStartStatusViewSet)
router.register(r'game-time', views.GameTimeViewSet)
router.register(r'from-locations', views.FromLocationViewSet)
router.register(r'score-locations', views.ScoreLocationViewSet)
router.register(r'object-score-locations', views.ScoredObjectViewSet)
router.register(r'scouted-match', views.ScoutedMatchViewSet)
router.register(r'match-end-status', views.MatchEndStatusViewSet)
router.register(r'tournament', views.TournamentViewSet)
router.register(r'preload', views.PreloadViewSet)
router.register(r'scheduled-match', views.ScheduledMatchViewSet)
router.register(r'cards', views.CardsViewSet)


urlpatterns = [
    path('api/import-event/<str:event_code>', views.AddTournament.as_view()),
    path('api/get-teams-by-match/<str:event_code>/<int:number>', views.ScheduledMatchList.as_view()),    
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace="rest_framework")),
    path('api-token-auth/', rfviews.obtain_auth_token), 
    path('api/createuser/', views.NewUserView.as_view()), 
    path('pegs/', views.SubmitMatchView.as_view()), 
    path('matches/<str:meaningless>', views.matches),    
    path('scores/<str:meaningless>', views.scores),

    re_path('', views.Index.as_view()),

]