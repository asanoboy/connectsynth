from django.http import HttpResponse
import os

def home(request):
  return HttpResponse(os.path.dirname(__file__)) 
