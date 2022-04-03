from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from authapp.views import UserViewSet
from todo_notes.views import ProjectViewSet, TodoNoteViewSet
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('projects', ProjectViewSet)
router.register('todo_notes', TodoNoteViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('api/', include(router.urls)),
    path('api-jwt-token/', TokenObtainPairView.as_view(), name='jwt_obtain_token'),
    path('api-jwt-token/refresh', TokenRefreshView.as_view(), name='jwt_refresh_token')
]
