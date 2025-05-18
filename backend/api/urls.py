from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RecordViewSet, UserRegisterView, SQLQueryView

router = DefaultRouter()
router.register(r'records', RecordViewSet, basename='record')

urlpatterns = [
     path('', include(router.urls)),
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('execute/', SQLQueryView.as_view(), name='execute-query'),
]
