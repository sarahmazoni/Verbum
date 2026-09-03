from django.shortcuts import render


def homePage(request):
    return render(request, "login.html")


def register_page(request):
    return render(request, "register.html")