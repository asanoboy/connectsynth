from django.http import HttpResponse
import os

def home(request):
  return HttpResponse(os.path.direname(__file__)) 
