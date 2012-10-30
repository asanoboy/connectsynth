from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.generic import ListView
from common.models import Plugin

from django.db import connection


class InstrumentListView(ListView):
    """queryset = Plugin.objects.filter(is_public=True, 
                                         #type='instrument'
                                         )
    """
    def get_queryset(self):
        plugins = Plugin.objects.filter(is_public=True)
        return plugins
    
    
    template_name = "toppage.html"
    
    """    
    def get_context_data(self, **kwargs):
        context = RequestContext(self.request)
        return context
    """
    
def notfound_handler(request):
    return HttpResponse("Not found")