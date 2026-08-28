from django.urls import path
from . import views

urlpatterns = [
	path('register/', views.register, name='register'),
	path('login/', views.login_view, name='login'),
	path('painel/', views.painel, name='painel'),
	path('setup2fa/', views.setup_2fa, name='setup_2fa'),
	path('verify-2fa/', views.verify_2fa, name='verify_2fa'),
	path('logout/', views.logout_view, name='logout'),

]