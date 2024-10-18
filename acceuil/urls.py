from django.urls import path
from . import views  # Assurez-vous d'importer vos vues

urlpatterns = [
    path('', views.index, name='home'),  # Page d'accueil (home)
    path('about/', views.about, name='about'),  # Page "About"
    path('camera/', views.camera, name='camera'),  # Page "Camera"
    path('login/', views.login, name='login'),  # Page de connexion
    path('signup/', views.signup, name='signup'), 
    path('logout/', views.logout, name='logout'),
]
