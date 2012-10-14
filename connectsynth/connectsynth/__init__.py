from django.http import HttpResponse

def showsdk(request):
    message = "show sdk"
    return HttpResponse(message)