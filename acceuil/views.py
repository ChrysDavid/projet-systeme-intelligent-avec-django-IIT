from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib import messages


# Create your views here.
def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def camera(request):
    return render(request, 'camera.html')

def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                auth_login(request, user)
                messages.success(request, f'Bienvenue {username}!')
                return redirect('home')  # Redirige vers la page d'accueil après connexion
            else:
                messages.error(request, 'Nom d\'utilisateur ou mot de passe incorrect')
        else:
            messages.error(request, 'Erreur dans le formulaire de connexion')
    else:
        form = AuthenticationForm()

    return render(request, 'login.html', {'form': form})

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Account created successfully!')
            return redirect('login')  # Redirige vers la page de connexion après l'inscription
    else:
        form = UserCreationForm()
    
    return render(request, 'signup.html', {'form': form})


def logout(request):
    auth_logout(request)
    messages.success(request, 'Vous êtes déconnecté.')
    return redirect('home')


