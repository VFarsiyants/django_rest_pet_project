from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from authapp.views import UserViewSet
from todo_notes.views import ProjectViewSet, TodoNoteViewSet
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('projects', ProjectViewSet)
router.register('todo_notes', TodoNoteViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title='ToDo app',
        default_version='1.0',
        description='Documentation to project',
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('api/', include(router.urls)),
    path('api-jwt-token/', TokenObtainPairView.as_view(), name='jwt_obtain_token'),
    path('api-jwt-token/refresh', TokenRefreshView.as_view(),
         name='jwt_refresh_token'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),
]
