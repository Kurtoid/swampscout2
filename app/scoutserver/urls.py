from django.urls import path, include
from rest_framework import routers, serializers, viewsets

from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'matches', views.MatchViewSet)
router.register(r'match-start-status', views.MatchStartStatusViewSet)
router.register(r'game-time', views.HatchScoredViewSet)
router.register(r'hatch-from-locations', views.GameTimeViewSet)
router.register(r'score-locations', views.ScoreLocationViewSet)
router.register(r'hatch-score-locations', views.GameTimeViewSet)
router.register(r'cargo-score-locations', views.CargoScoredViewSet)
router.register(r'scouted-match', views.ScoutedMatchViewSet)
router.register(r'match-end-status', views.MatchEndStatusViewSet)
router.register(r'tournament', views.TournamentViewSet)


urlpatterns = [
    path('', views.Index.as_view()),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace="rest_framework"))
]
